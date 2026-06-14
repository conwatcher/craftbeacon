# CraftBeacon — Manual Regression Test Checklist

*Run this checklist after any significant change to dashboard.html, the Val.town relay, or Outseta membership settings. Each test has a clear action, an expected result, and a pass/fail line. Note the date and what change triggered the test run.*

---

## Test Run Log

**Date:**
**Triggered by:** *(what changed)*
**Tested by:**
**Overall result:** Pass / Fail / Partial

---

## Section 1 — Authentication and Login

These tests confirm that the login flow works correctly for every tier and that the dashboard handles tokens properly.

---

**TEST 1.1 — Free tier login**

Action: Open a private/incognito browser window. Go to thecraftbeacon.com. Click the login button. Log in using a free tier account.

Expected result: Dashboard loads. Tier badge reads "Free." No spinning. No redirect back to the homepage.

Pass / Fail:
Notes:

---

**TEST 1.2 — Paid tier login (Writing Lane)**

Action: Open a private/incognito browser window. Log in using a Writing Lane account.

Expected result: Dashboard loads. Tier badge reads "Writing Lane." No spinning.

Pass / Fail:
Notes:

---

**TEST 1.3 — Paid tier login (Premium)**

Action: Open a private/incognito browser window. Log in using the Premium test account (pjcereste@gmail.com).

Expected result: Dashboard loads. Tier badge reads "Premium." No spinning.

Pass / Fail:
Notes:

---

**TEST 1.4 — Page refresh resilience**

Action: Log in successfully with any account. Once the dashboard is loaded, press F5 to refresh the page.

Expected result: Dashboard reloads and the same user remains logged in. Does not redirect to the homepage. Does not spin indefinitely.

Pass / Fail:
Notes:

---

**TEST 1.5 — Logout and back in**

Action: Log in with any account. Use the logout option. Then log back in with the same account.

Expected result: After logging back in, the dashboard loads cleanly with the correct tier badge. No stale session artifacts.

Pass / Fail:
Notes:

---

**TEST 1.6 — Invalid or expired token rejection**

Action: Manually edit the URL to include a fake or malformed token — for example, add `?access_token=thisisnotavalidtoken` to the dashboard URL and load it.

Expected result: Dashboard does not load. User is redirected to the homepage or shown a login prompt. No JavaScript errors that crash the page.

Pass / Fail:
Notes:

---

## Section 2 — Tier Behavior and Gating

These tests confirm that each tier sees only what it should see, and that tier limits are enforced correctly.

---

**TEST 2.1 — Free tier message limit**

Action: Log in as a free tier user. Send messages until the message limit is reached.

Expected result: After the limit is hit, an upgrade prompt or limit notice appears. The input field disables or the send button stops working. The user is not able to continue sending indefinitely.

Pass / Fail:
Notes:

---

**TEST 2.2 — Free tier file upload is hidden**

Action: Log in as a free tier user. Look for a file upload button or attachment option in the dashboard.

Expected result: No file upload option is visible to free tier users.

Pass / Fail:
Notes:

---

**TEST 2.3 — Paid tier file upload is available**

Action: Log in as a Writing Lane or Premium account. Look for the file upload option.

Expected result: File upload button is visible and functional. Accepted formats are .txt and .md only.

Pass / Fail:
Notes:

---

**TEST 2.4 — Tier badge accuracy**

Action: Log in with each of the following account types one at a time and note the badge that appears:
- Free account
- Writing Lane account
- Premium account (pjcereste@gmail.com)

Expected result: Badge matches the account type exactly in each case.

Free badge result:
Writing Lane badge result:
Premium badge result:
Pass / Fail:
Notes:

---

## Section 3 — Relay and Coaching Function

These tests confirm that the AI relay accepts requests, returns responses, and handles errors gracefully.

---

**TEST 3.1 — Free tier message sends and receives**

Action: Log in as a free tier user. Type a short message — something like "I'm working on a fantasy novel and feeling stuck" — and send it.

Expected result: The typing indicator appears. A coaching response streams in within a few seconds. The response is coherent and appropriate for a writing coach. No error message appears.

Pass / Fail:
Notes:

---

**TEST 3.2 — Paid tier message sends and receives**

Action: Log in as a Writing Lane or Premium account. Send the same short message.

Expected result: Same as above — typing indicator, streaming response, no errors.

Pass / Fail:
Notes:

---

**TEST 3.3 — Relay error handling**

Action: Log in as any user. In browser developer tools (press F12, go to the Network tab), block requests to the Val.town relay URL. Then send a message.

Expected result: The dashboard does not crash or go blank. An error message appears in the chat — something like "Something went wrong reaching the coaching service. Please try again in a moment." The input field re-enables after the error.

Pass / Fail:
Notes:

---

**TEST 3.4 — Conversation history carries across turns**

Action: Log in as any paid tier user. Send two or three messages in sequence, referring back to something said earlier — for example, mention a character name in message one, then reference "that character" in message three without naming them again.

Expected result: The coaching response in message three demonstrates awareness of what was said in message one. The relay is correctly passing conversation history with each request.

Pass / Fail:
Notes:

---

**TEST 3.5 — Tier is correctly identified in coaching behavior**

Action: Log in as a free tier user. Ask a question that would require personalized coaching — for example, "Can you analyze the structure of my specific manuscript?"

Expected result: The response provides general guidance appropriate to the free tier, not deep personalized analysis. It may briefly note that more targeted support is available through a paid lane. It does not provide the kind of response a Writing Lane member would receive.

Pass / Fail:
Notes:

---

## Section 4 — Page and Asset Integrity

These tests confirm that all pages load correctly and no visible errors appear to users.

---

**TEST 4.1 — Homepage loads cleanly**

Action: Open thecraftbeacon.com in a fresh browser window (not logged in).

Expected result: Page loads fully. All images appear. Navigation works. No broken layout or missing content.

Pass / Fail:
Notes:

---

**TEST 4.2 — Resources page loads**

Action: Navigate to thecraftbeacon.com/resources.html.

Expected result: Page loads. Content is visible. No broken links on first inspection.

Pass / Fail:
Notes:

---

**TEST 4.3 — Field Guide page loads**

Action: Navigate to thecraftbeacon.com/guide.html.

Expected result: Page loads. All six sections visible. Newsletter signup button visible.

Pass / Fail:
Notes:

---

**TEST 4.4 — No JavaScript errors on dashboard load**

Action: Log in with any account. Once the dashboard loads, open browser developer tools (F12) and click the Console tab. Look for any red error messages.

Expected result: No red errors in the console. Yellow warnings are acceptable. Red errors indicate something broken.

Pass / Fail:
Any errors found:

---

**TEST 4.5 — Mobile layout check**

Action: Open thecraftbeacon.com on a mobile device (iOS Safari preferred — mobile Chrome is a known issue and can be skipped for now). Log in and send one message.

Expected result: Dashboard is readable and functional on the mobile screen. Input field and send button are accessible. Response displays correctly.

Pass / Fail:
Notes:

---

## Section 5 — Known Issues (Do Not Flag as New Failures)

The following are known open issues. If you encounter them during testing, note them but do not count them as new failures.

- **Mobile Chrome login loop** — Users on Chrome for Android may spin indefinitely on login. Known issue, deferred post-launch. Safari and Firefox on mobile work correctly.
- **JWT signature not cryptographically verified** — The relay checks token expiry and email but does not verify Outseta's signing key. Known gap, flagged for future hardening. Not a user-facing issue.

---

## After the Test Run

When all tests are complete, fill in the Test Run Log at the top of this document with the date, what triggered the run, who tested, and the overall result. If any tests failed, note what the failure looked like and what you were doing when it happened. That information is what makes debugging fast in the next session.

---

*CraftBeacon Regression Checklist — maintain alongside CraftBeacon-ReEntryBrief.md in the GitHub repo.*
