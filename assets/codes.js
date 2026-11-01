/* QR & Barcode Maker (codes.html).
   Everything runs in the visitor's browser: bwip-js draws the codes, a canvas draws the PNGs
   and prepares the optional logo. No network requests, nothing stored or uploaded.
   The pure helpers (ISBN checks, add-on digits, URL tidy-up) are exported at the bottom
   so they can be tested from node. */
(function () {
  'use strict';

  /* ─── ISBN helpers (pure) ─── */

  function ean13CheckDigit(d12) {
    var sum = 0;
    for (var i = 0; i < 12; i++) sum += Number(d12.charAt(i)) * (i % 2 ? 3 : 1);
    return (10 - (sum % 10)) % 10;
  }

  function isbn10IsValid(s) {
    var sum = 0;
    for (var i = 0; i < 10; i++) {
      var c = s.charAt(i);
      var v = (c === 'X' || c === 'x') ? 10 : Number(c);
      sum += v * (10 - i);
    }
    return sum % 11 === 0;
  }

  var CHECK_DIGIT_MSG = "The check digit (the last digit) doesn’t match the rest of the number, so there’s probably a typo somewhere. Check it against your ISBN agency record.";

  // Returns { empty:true } | { error } | { isbn13, converted, isbn10 }
  function parseIsbn(raw) {
    var s = String(raw || '').replace(/[\s-]/g, '');
    if (!s) return { empty: true };
    if (!/^\d{9}[\dXx]$|^\d{13}$/.test(s)) {
      if (!/^\d+[Xx]?$/.test(s)) {
        return { error: 'An ISBN uses only digits (plus a final X on some 10-digit ones). Hyphens and spaces are fine.' };
      }
      return { error: 'An ISBN has 13 digits (or 10 for older ones). What you typed has ' + s.length + '.' };
    }
    if (s.length === 10) {
      if (!isbn10IsValid(s)) return { error: CHECK_DIGIT_MSG };
      var body = '978' + s.slice(0, 9);
      return { isbn13: body + ean13CheckDigit(body), converted: true, isbn10: s.toUpperCase() };
    }
    var prefix = s.slice(0, 3);
    if (prefix !== '978' && prefix !== '979') {
      return { error: 'Book ISBN-13s start with 978 or 979. This one starts with ' + prefix + ', so it may not be an ISBN. Check it against your ISBN agency record.' };
    }
    if (s.slice(0, 4) === '9790') {
      return { error: 'Numbers starting 979-0 are for printed music (they’re called ISMNs), not books, so this page can’t make a book barcode from it.' };
    }
    if (ean13CheckDigit(s.slice(0, 12)) !== Number(s.charAt(12))) return { error: CHECK_DIGIT_MSG };
    return { isbn13: s, converted: false };
  }

  // mode: 'none' | 'usd' | 'cad'. Returns { digits } | { error }
  function addonDigits(mode, priceText) {
    if (mode === 'none') return { digits: '90000' };
    var t = String(priceText || '').trim().replace(/^\$/, '');
    if (!/^\d{1,2}(\.\d{1,2})?$/.test(t)) return { error: 'Enter the price like 12.99 (between 0.01 and 99.99).' };
    var cents = Math.round(parseFloat(t) * 100);
    if (cents < 1 || cents > 9999) return { error: 'Enter the price like 12.99 (between 0.01 and 99.99).' };
    return { digits: (mode === 'cad' ? '6' : '5') + ('0000' + cents).slice(-4) };
  }

  // Returns { url, added } | { error } | { empty:true }
  function tidyUrl(raw) {
    var t = String(raw || '').trim();
    if (!t) return { empty: true };
    if (/\s/.test(t)) return { error: 'A web address can’t contain spaces.' };
    var added = false;
    if (!/^https?:\/\//i.test(t)) {
      if (/^[a-z][a-z0-9+.-]*:\/\//i.test(t) || /^(javascript|data|mailto|tel|sms):/i.test(t)) {
        return { error: 'Use a web address that starts with https://' };
      }
      t = 'https://' + t;
      added = true;
    }
    var host = '';
    try { host = new URL(t).hostname; } catch (e) { host = ''; }
    if (!host || host.indexOf('.') === -1) {
      return { error: 'That doesn’t look like a web address yet. Something like thecraftbeacon.com/book would work.' };
    }
    return { url: t, added: added };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { parseIsbn: parseIsbn, addonDigits: addonDigits, tidyUrl: tidyUrl, ean13CheckDigit: ean13CheckDigit };
  }
  if (typeof document === 'undefined') return;

  /* ─── Drawing ─── */

  var QR_QUIET = 8;          // 4 modules; bwip-js draws a QR module as 2 units at scale 1
  var QR_MODULE = 2;
  var MIN_PNG_PX = 1200;
  var LOGO_SHARE = 0.2;      // logo is at most ~20% of the code's width

  function viewBoxSize(svg) {
    var m = /viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/.exec(svg);
    return { w: Number(m[1]), h: Number(m[2]) };
  }

  function drawQr(text, level, logo) {
    var svg = window.bwipjs.toSVG({
      bcid: 'qrcode', text: text, eclevel: level, scale: 1,
      padding: QR_QUIET, backgroundcolor: 'FFFFFF'
    });
    var size = viewBoxSize(svg);
    if (logo) {
      var n = (size.w - 2 * QR_QUIET) / QR_MODULE;
      var logoMods = Math.max(1, Math.floor(n * LOGO_SHARE));
      var box = logoMods + 2;                       // one module of white padding all round
      if ((n - box) % 2) box += 1;                  // keep the white box centred on the grid
      var boxPos = QR_QUIET + ((n - box) / 2) * QR_MODULE;
      var boxPx = box * QR_MODULE;
      var maxPx = logoMods * QR_MODULE;
      var scale = Math.min(maxPx / logo.w, maxPx / logo.h);
      var lw = logo.w * scale, lh = logo.h * scale;
      var lx = boxPos + (boxPx - lw) / 2, ly = boxPos + (boxPx - lh) / 2;
      var extra =
        '<rect x="' + boxPos + '" y="' + boxPos + '" width="' + boxPx + '" height="' + boxPx + '" fill="#FFFFFF" />\n' +
        '<image x="' + lx + '" y="' + ly + '" width="' + lw + '" height="' + lh + '"' +
        ' href="' + logo.dataUrl + '" xlink:href="' + logo.dataUrl + '" />\n';
      svg = svg.replace('<svg ', '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')
               .replace(/<\/svg>\s*$/, extra + '</svg>');
    }
    return { svg: svg, w: size.w, h: size.h };
  }

  function drawBarcode(isbn13, addon) {
    var svg = window.bwipjs.toSVG({
      bcid: 'ean13', text: addon ? isbn13 + ' ' + addon : isbn13, includetext: true,
      scale: 1, paddingwidth: 12, paddingheight: 6, backgroundcolor: 'FFFFFF'
    });
    var size = viewBoxSize(svg);
    return { svg: svg, w: size.w, h: size.h };
  }

  // Integer multiplier so bars and modules land on whole pixels
  function pngFactor(w) { return Math.max(1, Math.ceil(MIN_PNG_PX / w)); }

  function sizedSvg(code, k) {
    return code.svg.replace('<svg ', '<svg width="' + code.w * k + '" height="' + code.h * k + '" shape-rendering="crispEdges" ');
  }

  function svgBlob(code) {
    return new Blob([sizedSvg(code, pngFactor(code.w))], { type: 'image/svg+xml' });
  }

  function pngBlob(code) {
    var k = pngFactor(code.w);
    var url = URL.createObjectURL(new Blob([sizedSvg(code, k)], { type: 'image/svg+xml' }));
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        var c = document.createElement('canvas');
        c.width = code.w * k; c.height = code.h * k;
        var ctx = c.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) { b ? resolve({ blob: b, w: c.width, h: c.height }) : reject(new Error('png')); }, 'image/png');
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('img')); };
      img.src = url;
    });
  }

  function saveBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function track(type) { if (window.cbTrackDownload) window.cbTrackDownload(type); }

  function $(id) { return document.getElementById(id); }

  // One preview + download pair. getCode() returns the current code object or null.
  function wireOutput(prefix, getCode, getName, getType) {
    var preview = $(prefix + 'Preview'), svgBtn = $(prefix + 'Svg'), pngBtn = $(prefix + 'Png'), prevUrl = null;
    return {
      show: function (code) {
        if (prevUrl) { URL.revokeObjectURL(prevUrl); prevUrl = null; }
        if (code) {
          prevUrl = URL.createObjectURL(new Blob([code.svg], { type: 'image/svg+xml' }));
          preview.src = prevUrl;
          preview.hidden = false;
        } else {
          preview.removeAttribute('src');
          preview.hidden = true;
        }
        svgBtn.disabled = pngBtn.disabled = !code;
      },
      init: function () {
        svgBtn.addEventListener('click', function () {
          var code = getCode(); if (!code) return;
          saveBlob(svgBlob(code), getName() + '.svg');
          track(getType());
        });
        pngBtn.addEventListener('click', function () {
          var code = getCode(); if (!code) return;
          pngBlob(code).then(function (r) {
            saveBlob(r.blob, getName() + '.png');
            track(getType());
          }).catch(function () {
            $(prefix + 'Error').textContent = 'Your browser couldn’t make the PNG. The SVG download should still work.';
            $(prefix + 'Error').classList.add('show');
          });
        });
      }
    };
  }

  /* ─── Logo (processed on a canvas, never uploaded) ─── */

  function readLogo(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) return reject(new Error('That file isn’t an image. Try a PNG, JPG or SVG.'));
      if (file.size > 8 * 1024 * 1024) return reject(new Error('That image is over 8 MB. Try a smaller one.'));
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth || 400, h = img.naturalHeight || 400;
        var s = Math.min(1, 400 / Math.max(w, h));
        var c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(w * s)); c.height = Math.max(1, Math.round(h * s));
        var ctx = c.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve({ dataUrl: c.toDataURL('image/png'), w: c.width, h: c.height });
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('We couldn’t read that image. Try a PNG or JPG.')); };
      img.src = url;
    });
  }

  /* ─── Page wiring ─── */

  function showMsg(el, text) {
    el.textContent = text || '';
    el.classList.toggle('show', !!text);
  }

  function initQr() {
    var input = $('qrUrl'), err = $('qrError'), note = $('qrNote'), logoInput = $('qrLogo'),
        logoRemove = $('qrLogoRemove'), logoWarn = $('qrLogoWarn'), level = $('qrLevel'), sizeNote = $('qrSize');
    var logo = null, current = null;
    var out = wireOutput('qr', function () { return current; }, function () { return 'qr-code'; }, function () { return 'qr'; });
    out.init();

    function update() {
      var t = tidyUrl(input.value);
      current = null;
      showMsg(err, t.error || '');
      showMsg(note, t.added ? 'We added https:// at the front so phones open the code as a link.' : '');
      logoWarn.hidden = !logo;
      logoRemove.hidden = !logo;
      var lvl = logo ? 'H' : 'M';
      level.textContent = logo
        ? 'Error correction: H (the strongest, switched on automatically because of the logo)'
        : 'Error correction: M';
      if (t.url) {
        try {
          current = drawQr(t.url, lvl, logo);
        } catch (e) {
          showMsg(err, 'We couldn’t make a code from that address. It may be very long, or contain unusual characters.');
        }
      }
      out.show(current);
      sizeNote.textContent = current ? 'The PNG will be ' + current.w * pngFactor(current.w) + ' × ' + current.h * pngFactor(current.w) + ' pixels.' : '';
    }

    input.addEventListener('input', update);
    logoInput.addEventListener('change', function () {
      var f = logoInput.files && logoInput.files[0];
      if (!f) return;
      readLogo(f).then(function (l) { logo = l; showMsg($('qrLogoError'), ''); update(); })
        .catch(function (e) { logo = null; logoInput.value = ''; showMsg($('qrLogoError'), e.message); update(); });
    });
    logoRemove.addEventListener('click', function () { logo = null; logoInput.value = ''; showMsg($('qrLogoError'), ''); update(); });
    update();
  }

  function initIsbn() {
    var input = $('isbnInput'), err = $('isbnError'), note = $('isbnNote'),
        addonOn = $('addonOn'), addonBox = $('addonBox'), cur = $('addonCurrency'), price = $('addonPrice'),
        addonErr = $('addonError'), addonNote = $('addonDigits');
    var current = null, name = 'isbn', type = 'isbn';
    var out = wireOutput('isbn', function () { return current; }, function () { return name; }, function () { return type; });
    out.init();

    function update() {
      var p = parseIsbn(input.value);
      current = null;
      showMsg(err, p.error || '');
      showMsg(note, p.converted ? 'That’s an ISBN-10. Its ISBN-13 form is ' + p.isbn13 + ', and the barcode below uses that.' : '');

      addonBox.hidden = !addonOn.checked;
      price.disabled = cur.value === 'none';
      var add = null, addMsg = '';
      if (addonOn.checked) {
        var a = addonDigits(cur.value, price.value);
        if (a.error) addMsg = a.error; else add = a.digits;
      }
      showMsg(addonErr, addMsg);
      addonNote.textContent = add ? 'Add-on digits: ' + add + (add === '90000' ? ' (no price encoded)' : '') : '';

      if (p.isbn13 && !(addonOn.checked && !add)) {
        try {
          current = drawBarcode(p.isbn13, add);
          name = 'isbn-' + p.isbn13 + (add ? '-addon-' + add : '');
          type = add ? 'addon' : 'isbn';
        } catch (e) {
          showMsg(err, 'We couldn’t draw a barcode from that number.');
        }
      }
      out.show(current);
    }

    [input, addonOn, cur, price].forEach(function (el) {
      el.addEventListener('input', update);
      el.addEventListener('change', update);
    });
    update();
  }

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
  if (!window.bwipjs) {
    ['qrError', 'isbnError'].forEach(function (id) {
      showMsg($(id), 'The code maker didn’t load. Try reloading the page.');
    });
    return;
  }
  initQr();
  initIsbn();
})();
