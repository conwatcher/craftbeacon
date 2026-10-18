// Meta Pixel Purchase event for new subscribers landing from Stripe.
// Each subscription Payment Link returns to
//   payment-confirmed.html?plan=<tier>&cs={CHECKOUT_SESSION_ID}
// The event fires once per checkout session: the session ID doubles as the
// event ID (for later deduplication with a server-side event) and as a
// browser-side guard, and the query is stripped after reading so a refresh
// or the Back button can't resend it. A visit without ?plan sends nothing.
// External file because this page's CSP allows no inline script.
(function () {
  // Monthly prices, matching the live Stripe subscription prices (Oct 18, 2026).
  var PLANS = {
    writing:    { name: 'Writing Lane',    value: 10 },
    marketing:  { name: 'Marketing Lane',  value: 10 },
    production: { name: 'Production Lane', value: 10 },
    premium:    { name: 'Premium Lane',    value: 29 }
  };

  var params, plan, cs;
  try {
    params = new URLSearchParams(window.location.search);
    plan = PLANS[(params.get('plan') || '').toLowerCase()] ? (params.get('plan') || '').toLowerCase() : null;
    cs = params.get('cs') || '';
    if (params.has('plan') || params.has('cs')) {
      history.replaceState(null, '', window.location.pathname + window.location.hash);
    }
  } catch (e) { return; }
  if (!plan) return;

  var guardKey = 'cb_purchase_sent_' + (cs || plan);
  try { if (window.localStorage.getItem(guardKey)) return; } catch (e) { /* storage blocked: still send */ }

  /* Meta Pixel base code */
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('set', 'autoConfig', false, '1659330215146600');
  fbq('init', '1659330215146600');
  fbq('track', 'PageView');

  var p = PLANS[plan];
  var data = { currency: 'USD', value: p.value, content_type: 'product',
    content_ids: [plan], content_name: p.name };
  if (cs) fbq('track', 'Purchase', data, { eventID: cs });
  else fbq('track', 'Purchase', data);

  try { window.localStorage.setItem(guardKey, String(Date.now())); } catch (e) { /* ignore */ }
})();
