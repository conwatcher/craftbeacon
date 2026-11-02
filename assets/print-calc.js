/* Print Setup Guide calculator (print-setup.html).
   Pure, DOM-free functions: they run in the browser (window.PrintCalc) and in node (require).
   Every number comes from assets/print-config.js; nothing is hard-coded here.
   Deterministic math on values the author enters: it never writes or suggests anything for the book. */
(function (root, factory) {
  var cfg = (typeof module !== 'undefined' && module.exports) ? require('./print-config.js') : root.PRINT_CONFIG;
  var api = factory(cfg);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PrintCalc = api;
})(typeof self !== 'undefined' ? self : this, function (CFG) {
  'use strict';

  /* Round half up to the configured decimals. The tiny epsilon keeps values such as 1.1735
     (which floating point stores just under) rounding up to 1.174. */
  function round(x) {
    var f = Math.pow(10, CFG.display.decimals);
    return Math.floor(x * f + 0.5 + 1e-9) / f;
  }

  function multiple(platform) { return CFG[platform].pageMultiple; }

  // Both platforms need an even page count; KDP rounds up.
  function evenPages(pages, platform) {
    var m = multiple(platform || 'kdp');
    return Math.ceil(pages / m) * m;
  }

  // KDP minimum inside margin for a page count; null outside the published tiers.
  function insideMargin(pages) {
    var tiers = CFG.kdp.insideTiers;
    for (var i = 0; i < tiers.length; i++) {
      if (pages >= tiers[i].from && pages <= tiers[i].to) return tiers[i].margin;
    }
    return null;
  }

  function kdpSpine(pages, paper) {
    var p = CFG.kdp.papers[paper];
    if (!p) return null;
    return round(evenPages(pages, 'kdp') * p.factor);
  }

  // Straight-line interpolation between the measured points; null outside the supported range
  // or for a paper that was not measured.
  function ingramSpine(pages, paper) {
    var key = CFG.ingram.paper[paper];
    if (!key) return null;
    var n = evenPages(pages, 'ingram');
    var pts = CFG.ingram.spineTable[key];
    if (n < pts[0][0] || n > pts[pts.length - 1][0]) return null;
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      if (n >= a[0] && n <= b[0]) return round(a[1] + (b[1] - a[1]) * (n - a[0]) / (b[0] - a[0]));
    }
    return null;
  }

  // Full wraparound cover: bleed + back + spine + front + bleed, and bleed + trim height + bleed.
  function cover(trimW, trimH, spine, platform) {
    var bleed = CFG[platform || 'kdp'].bleed;
    return { width: round(2 * trimW + spine + 2 * bleed), height: round(trimH + 2 * bleed) };
  }

  /* Interior page size and margins. platforms is an array such as ['kdp'], ['ingram'] or both.
     Returns { pageW, pageH, margins, byPlatform }, or null when the KDP inside-margin table does
     not cover the page count. With more than one platform, each margin is the larger of the two. */
  function interior(trimW, trimH, pages, bleed, platforms) {
    var n = evenPages(pages, 'kdp');
    var by = {};
    var b = bleed ? CFG.kdp.bleed : 0;

    if (platforms.indexOf('kdp') !== -1) {
      var inner = insideMargin(n);
      if (inner === null) return null;
      var out = bleed ? CFG.kdp.outsideMinBleed : CFG.kdp.outsideMin;
      by.kdp = { inside: inner, outside: out, top: out, bottom: out };
    }
    if (platforms.indexOf('ingram') !== -1) {
      // IngramSpark's 0.5" safety is measured from trim. A bleed page extends past trim on the
      // outside, top and bottom edges only, so those margins grow by the bleed; the bind side does not.
      var s = CFG.ingram.safety, e = bleed ? CFG.ingram.bleed : 0;
      by.ingram = { inside: s, outside: s + e, top: s + e, bottom: s + e };
    }

    var margins = { inside: 0, outside: 0, top: 0, bottom: 0 };
    Object.keys(by).forEach(function (k) {
      ['inside', 'outside', 'top', 'bottom'].forEach(function (m) {
        margins[m] = Math.max(margins[m], by[k][m]);
      });
    });
    ['inside', 'outside', 'top', 'bottom'].forEach(function (m) { margins[m] = round(margins[m]); });
    Object.keys(by).forEach(function (k) {
      ['inside', 'outside', 'top', 'bottom'].forEach(function (m) { by[k][m] = round(by[k][m]); });
    });

    return { pageW: round(trimW + b), pageH: round(trimH + 2 * b), margins: margins, byPlatform: by };
  }

  /* Things the author should know. Returns [{ level: 'error'|'warn'|'info', code, platform, text }].
     opts: { pages (as entered), paper, platforms, bleed }. Page-count thresholds compare the number
     the author entered. 'error' items block the numbers for that platform. */
  function warnings(opts) {
    var out = [];
    var pages = opts.pages, platforms = opts.platforms, paper = opts.paper;
    var K = CFG.kdp, I = CFG.ingram;
    var hasK = platforms.indexOf('kdp') !== -1, hasI = platforms.indexOf('ingram') !== -1;
    var even = evenPages(pages, 'kdp');

    if (even !== pages) {
      out.push({ level: 'info', code: 'odd-pages', platform: 'both',
        text: 'Both platforms need an even page count. You entered ' + pages + ', so the numbers below use ' + even + '.' });
    }
    if (hasK) {
      var minPages = K.papers[paper] ? K.papers[paper].minPages : 0;
      if (pages < minPages) {
        out.push({ level: 'error', code: 'kdp-min-pages', platform: 'kdp',
          text: 'KDP needs at least ' + minPages + ' pages for this paper and ink. You entered ' + pages + '.' });
      } else if (even > K.maxPages) {
        out.push({ level: 'error', code: 'kdp-max-pages', platform: 'kdp',
          text: 'The margin table here stops at ' + K.maxPages + ' pages. Check KDP’s own limit for your trim size and paper.' });
      }
      if (pages < K.spineTextMinPages) {
        out.push({ level: 'warn', code: 'kdp-spine-text', platform: 'kdp',
          text: 'Under ' + K.spineTextMinPages + ' pages, KDP rejects a cover that has spine text. Leave the spine blank.' });
      }
    }
    if (hasI) {
      if (!I.paper[paper]) {
        out.push({ level: 'error', code: 'ingram-paper', platform: 'ingram',
          text: 'This page has no measured IngramSpark spine for color paper. Use IngramSpark’s cover template generator.' });
      } else if (evenPages(pages, 'ingram') < I.supportedPages.min || evenPages(pages, 'ingram') > I.supportedPages.max) {
        out.push({ level: 'info', code: 'ingram-range', platform: 'ingram',
          text: 'The IngramSpark spine is only estimated for ' + I.supportedPages.min + ' to ' + I.supportedPages.max +
            ' pages. For ' + pages + ' pages, generate your cover template on IngramSpark.' });
      }
      if (pages < I.spineTextMinPages) {
        out.push({ level: 'warn', code: 'ingram-spine-text', platform: 'ingram',
          text: 'Under ' + I.spineTextMinPages + ' pages, IngramSpark does not allow spine text on a perfect-bound book.' });
      }
    }
    if (opts.bleed && hasK) {
      out.push({ level: 'info', code: 'bleed-pdf', platform: 'kdp',
        text: 'With bleed, KDP requires your interior as a PDF. DOC and DOCX are accepted only without bleed.' });
    }
    if (hasK && hasI) {
      out.push({ level: 'info', code: 'spines-differ', platform: 'both',
        text: 'The two spines differ, so a cover made for one platform will not fit the other. You need a separate cover file for each.' });
    }
    return out;
  }

  /* One call for the page: validates, then returns everything to display.
     input: { trimW, trimH, pages, paper, platforms, bleed }
     Returns { ok, warnings, usedPages?, interior?, spines? }. ok is false when a platform's error blocks the numbers. */
  function compute(input) {
    var w = warnings(input);
    var blocked = w.some(function (x) { return x.level === 'error'; });
    if (blocked) return { ok: false, warnings: w };

    var int = interior(input.trimW, input.trimH, input.pages, input.bleed, input.platforms);
    if (!int) return { ok: false, warnings: w };

    var spines = {};
    if (input.platforms.indexOf('kdp') !== -1) {
      var ks = kdpSpine(input.pages, input.paper);
      spines.kdp = { spine: ks, cover: cover(input.trimW, input.trimH, ks, 'kdp') };
    }
    if (input.platforms.indexOf('ingram') !== -1) {
      var is = ingramSpine(input.pages, input.paper);
      spines.ingram = is === null ? { spine: null, cover: null }
                                  : { spine: is, cover: cover(input.trimW, input.trimH, is, 'ingram') };
    }
    return { ok: true, warnings: w, usedPages: evenPages(input.pages, 'kdp'), interior: int, spines: spines };
  }

  return {
    round: round, evenPages: evenPages, insideMargin: insideMargin, kdpSpine: kdpSpine,
    ingramSpine: ingramSpine, cover: cover, interior: interior, warnings: warnings, compute: compute
  };
});
