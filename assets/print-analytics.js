/* Analytics start-up for print-setup.html — GA4 + Meta Pixel PageView, same IDs as codes.html.
   Kept in an external file so the page's CSP can leave 'unsafe-inline' out of script-src.
   cbTrackPrint() sends only the event name and a small fixed label (platform, guide or field name).
   It never sends a trim size, page count, spine width or any other value the author enters. */
(function () {
  'use strict';

  // Meta Pixel — autoConfig off: no automatic button/form capture
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
  s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('set', 'autoConfig', false, '1659330215146600');
  window.fbq('init', '1659330215146600');
  window.fbq('track', 'PageView');

  // Google tag (gtag.js)
  var g = document.createElement('script');
  g.async = true;
  g.src = 'https://www.googletagmanager.com/gtag/js?id=G-FRZ967M5K9';
  document.head.appendChild(g);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-FRZ967M5K9');

  // Only these four events, each with at most one fixed-vocabulary label.
  var ALLOWED = {
    print_calculate:          'platform',   // kdp | ingram | both
    print_guide_view:         'guide',      // word | libreoffice | googledocs
    print_copy:               'field',      // which number was copied, e.g. spine
    print_step_report_click:  null
  };
  window.cbTrackPrint = function (name, label) {
    if (!Object.prototype.hasOwnProperty.call(ALLOWED, name)) return;
    var params = {};
    if (ALLOWED[name]) params[ALLOWED[name]] = String(label || '').slice(0, 40);
    try { window.gtag('event', name, params); } catch (e) {}
  };
})();
