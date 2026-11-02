/* Print Setup Guide (print-setup.html).
   Everything runs in the visitor's browser: assets/print-calc.js does the math from the numbers in
   assets/print-config.js, and this file only reads the form and draws the results. No network
   requests, nothing stored or uploaded. Analytics events carry a fixed label, never an entered value. */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function track(name, label) { if (window.cbTrackPrint) window.cbTrackPrint(name, label); }

  function initNav() {
    var nav = document.querySelector('.cb-nav'), btn = $('navHamburger');
    function set(open) {
      nav.classList.toggle('nav-mobile-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }
    btn.addEventListener('click', function () { set(!nav.classList.contains('nav-mobile-open')); });
    document.querySelectorAll('.nav-links a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  }

  initNav();

  var CFG = window.PRINT_CONFIG, CALC = window.PrintCalc;
  var resultsEl = $('results');
  if (!CFG || !CALC) {
    resultsEl.innerHTML = '<p class="form-error show">The calculator didn’t load. Try reloading the page.</p>';
    return;
  }

  var DEC = CFG.display.decimals;
  function fixed(n) { return n.toFixed(DEC); }
  function compact(n) { return String(Number(n.toFixed(DEC))); }

  /* ─── Form setup ─── */

  var trimSel = $('trimSel'), customBox = $('customTrim'), customW = $('customW'), customH = $('customH'),
      pagesInput = $('pagesInput'), paperSel = $('paperSel'), formError = $('formError'),
      platformNote = $('platformNote'), guideSel = $('guideSel'), guideOut = $('guideOut');

  function buildTrimOptions() {
    var html = '', group = '';
    CFG.trimSizes.forEach(function (t, i) {
      if (t.group !== group) {
        if (group) html += '</optgroup>';
        html += '<optgroup label="' + escapeHtml(t.group + ' trim sizes') + '">';
        group = t.group;
      }
      var sel = (t.w === 6 && t.h === 9) ? ' selected' : '';
      html += '<option value="' + i + '"' + sel + '>' + escapeHtml(t.w + ' × ' + t.h + ' in') + '</option>';
    });
    html += '</optgroup><option value="custom">Custom size…</option>';
    trimSel.innerHTML = html;
  }

  function buildPaperOptions() {
    paperSel.innerHTML = Object.keys(CFG.kdp.papers).map(function (k) {
      return '<option value="' + escapeHtml(k) + '">' + escapeHtml(CFG.kdp.papers[k].label) + '</option>';
    }).join('');
  }

  function buildGuideOptions() {
    guideSel.innerHTML = Object.keys(CFG.guides).map(function (k) {
      return '<option value="' + escapeHtml(k) + '">' + escapeHtml(CFG.guides[k].name) + '</option>';
    }).join('');
  }

  function radioValue(name) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }
  function setRadio(name, value) {
    var el = document.querySelector('input[name="' + name + '"][value="' + value + '"]');
    if (el) el.checked = true;
  }

  // IngramSpark is measured for black-and-white paper only, so the Ingram choices turn off for color.
  function syncPlatforms() {
    var colorPaper = !CFG.ingram.paper[paperSel.value];
    ['ingram', 'both'].forEach(function (v) {
      document.querySelector('input[name="platform"][value="' + v + '"]').disabled = colorPaper;
    });
    if (colorPaper && radioValue('platform') !== 'kdp') setRadio('platform', 'kdp');
    platformNote.hidden = !colorPaper;
  }

  /* ─── Read the form ─── */

  function parseDim(text) {
    var t = String(text || '').trim();
    if (!/^\d+(\.\d+)?$/.test(t)) return null;
    var n = Number(t);
    return n > 0 ? n : null;
  }

  function readInputs() {
    var custom = trimSel.value === 'custom', w, h;
    customBox.hidden = !custom;
    if (custom) {
      w = parseDim(customW.value); h = parseDim(customH.value);
      if (w === null || h === null) return { error: 'Enter your custom trim width and height in inches, for example 5.5 and 8.5.' };
    } else {
      var t = CFG.trimSizes[Number(trimSel.value)];
      w = t.w; h = t.h;
    }
    var pt = String(pagesInput.value || '').trim();
    if (!/^\d{1,4}$/.test(pt) || Number(pt) < 1) return { error: 'Enter your page count as a whole number, for example 300.' };
    var plat = radioValue('platform');
    return {
      trimW: w, trimH: h, custom: custom, pages: Number(pt), paper: paperSel.value,
      platforms: plat === 'both' ? ['kdp', 'ingram'] : [plat],
      platformKey: plat, bleed: radioValue('bleed') === 'yes'
    };
  }

  /* ─── Draw the numbers ─── */

  function card(label, value, field, note) {
    var t = fixed(value);
    return '<div class="val-card">' +
      '<div class="val-label">' + escapeHtml(label) + '</div>' +
      '<div class="val-num">' + escapeHtml(t) + ' <span class="unit">in</span></div>' +
      (note ? '<div class="val-note">' + note + '</div>' : '') +
      '<button type="button" class="btn-copy" data-copy="' + escapeHtml(t) + '" data-field="' + escapeHtml(field) + '"' +
      ' aria-label="Copy ' + escapeHtml(label.toLowerCase()) + ', ' + escapeHtml(t) + ' inches">Copy</button>' +
      '</div>';
  }

  function noteList(list) {
    return list.map(function (w) {
      var cls = w.level === 'info' ? 'caution' : 'caution warn';
      return '<div class="' + cls + '">' + escapeHtml(w.text) + '</div>';
    }).join('');
  }

  function ingramColumn(sp, tol) {
    var link = '<a href="' + escapeHtml(CFG.ingram.generatorUrl) + '" target="_blank" rel="noopener">IngramSpark cover template generator</a>';
    var h = '<h4>' + escapeHtml(CFG.ingram.name) + '</h4>';
    if (sp.spine === null) {
      return h + '<p class="col-note">No spine estimate for this page count. Generate your cover template in the ' + link + '.</p>';
    }
    return h +
      '<div class="cards">' +
      card('Spine width', sp.spine, 'spine', escapeHtml(tol.charAt(0).toUpperCase() + tol.slice(1))) +
      card('Full cover width', sp.cover.width, 'cover_width') +
      card('Full cover height', sp.cover.height, 'cover_height') +
      '</div>' +
      '<p class="col-note">Your IngramSpark template is final. Get it from the ' + link + '.</p>';
  }

  function kdpColumn(sp) {
    return '<h4>' + escapeHtml(CFG.kdp.name) + '</h4>' +
      '<div class="cards">' +
      card('Spine width', sp.spine, 'spine') +
      card('Full cover width', sp.cover.width, 'cover_width') +
      card('Full cover height', sp.cover.height, 'cover_height') +
      '</div>';
  }

  function render() {
    syncPlatforms();
    var inp = readInputs();
    if (inp.error) {
      resultsEl.innerHTML = '<p class="status-line">' + escapeHtml(inp.error) + '</p>';
      guideOut.innerHTML = '';
      return;
    }
    var r = CALC.compute(inp);
    var html = noteList(r.warnings);

    if (!r.ok) {
      resultsEl.innerHTML = html;
      guideOut.innerHTML = '<p class="status-line">Fix the page count above to see the steps.</p>';
      return;
    }

    var i = r.interior, m = i.margins, both = inp.platforms.length === 2;
    var extra = [];
    if (inp.custom) extra.push('Custom trim size: confirm the platform offers it before you finalize your files.');
    if (inp.platforms.indexOf('ingram') !== -1 && !inp.custom) extra.push('The trim list is KDP’s. Confirm IngramSpark offers your size.');
    html += extra.map(function (t) { return '<div class="caution">' + escapeHtml(t) + '</div>'; }).join('');

    html += '<h3 class="res-head">Interior page setup' + (inp.bleed ? ' (with bleed)' : '') + '</h3>';
    html += '<p class="col-note">Trim ' + escapeHtml(compact(inp.trimW) + ' × ' + compact(inp.trimH)) + ' in, ' +
      escapeHtml(String(r.usedPages)) + ' pages' +
      (both ? '. These are the larger of the two platforms’ minimums, so one interior file works on both.' : '. Minimum margins.') + '</p>';
    html += '<div class="cards">' +
      card('Page width', i.pageW, 'page_width') + card('Page height', i.pageH, 'page_height') +
      card('Inside margin', m.inside, 'inside') + card('Outside margin', m.outside, 'outside') +
      card('Top margin', m.top, 'top') + card('Bottom margin', m.bottom, 'bottom') +
      '</div>';

    html += '<h3 class="res-head">Spine and full cover</h3>';
    html += '<div class="' + (both ? 'cols2' : 'cols1') + '">';
    if (r.spines.kdp) html += '<div class="col">' + kdpColumn(r.spines.kdp) + '</div>';
    if (r.spines.ingram) html += '<div class="col">' + ingramColumn(r.spines.ingram, CFG.ingram.toleranceNote) + '</div>';
    html += '</div>';

    if (r.spines.ingram) {
      html += '<p class="col-note">IngramSpark requires a barcode on every cover. If you don’t supply one, leave a clear area at least ' +
        escapeHtml(compact(CFG.ingram.barcode.w) + ' × ' + compact(CFG.ingram.barcode.h)) +
        ' in. You can make one with our <a href="codes.html">ISBN barcode maker</a>.</p>';
    }

    resultsEl.innerHTML = html;
    renderGuide(inp, r);

    var key = inp.platformKey;
    if (key !== lastTracked) { lastTracked = key; track('print_calculate', key); }
  }
  var lastTracked = null;

  /* ─── Software guide ─── */

  var lastResult = null;

  function renderGuide(inp, r) {
    lastResult = { inp: inp, r: r };
    var g = CFG.guides[guideSel.value];
    var m = r.interior.margins;
    var c = {
      pageW: compact(r.interior.pageW), pageH: compact(r.interior.pageH),
      top: compact(m.top), bottom: compact(m.bottom), inside: compact(m.inside), outside: compact(m.outside),
      bleedW: compact(CFG.kdp.bleed), bleedH: compact(2 * CFG.kdp.bleed)
    };
    var steps = g.steps(c, inp.bleed);
    var html = '<h3 class="res-head">' + escapeHtml(g.name) + '</h3>' +
      '<p class="col-note">Verified ' + escapeHtml(g.verified) + '. ' + escapeHtml(g.sourceNote) + '</p>';
    if (g.cannotDoNote) html += '<div class="caution warn">' + escapeHtml(g.cannotDoNote) + '</div>';
    html += '<ol class="steps">' + steps.map(function (s) { return '<li>' + escapeHtml(s) + '</li>'; }).join('') + '</ol>';
    guideOut.innerHTML = html;
  }

  /* ─── Copy buttons ─── */

  function copyText(text, btn) {
    var field = btn.getAttribute('data-field'), original = btn.textContent;
    function done(ok) {
      btn.textContent = ok ? 'Copied' : 'Copy failed';
      if (ok) track('print_copy', field);
      else $('copyStatus').textContent = 'Your browser blocked copying. Select the number and copy it by hand: ' + text;
      setTimeout(function () { btn.textContent = original; }, 1800);
    }
    function fallback() {
      var ok = false;
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (e) { ok = false; }
      done(ok);
    }
    $('copyStatus').textContent = '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    } else {
      fallback();
    }
  }

  resultsEl.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.btn-copy') : null;
    if (btn) copyText(btn.getAttribute('data-copy'), btn);
  });

  /* ─── Wiring ─── */

  buildTrimOptions();
  buildPaperOptions();
  buildGuideOptions();

  [trimSel, customW, customH, pagesInput, paperSel].forEach(function (el) {
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });
  document.querySelectorAll('input[name="platform"], input[name="bleed"]').forEach(function (el) {
    el.addEventListener('change', render);
  });
  guideSel.addEventListener('change', function () {
    track('print_guide_view', guideSel.value);
    if (lastResult) renderGuide(lastResult.inp, lastResult.r);
  });
  $('reportLink').addEventListener('click', function () { track('print_step_report_click'); });

  render();
})();
