// Run with: node _tests/print-calc.test.mjs
// No framework. Expected values come from the verified spec sheet
// (PrintSetupGuide-VerifiedSpec-2026-11-02.md, sections 4, 10-13), not from the code under test.
import assert from 'node:assert/strict';
import calc from '../assets/print-calc.js';

let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('ok   - ' + name); }
  catch (e) { console.log('FAIL - ' + name + '\n       ' + e.message); process.exitCode = 1; }
}
const codes = (opts) => calc.warnings(opts).map((w) => w.code);

/* (a) IngramSpark: every measured point reproduces exactly (6 x 9) */
const measured = [
  ['bw_white', 100, 0.207, 12.457], ['bw_white', 200, 0.424, 12.674], ['bw_white', 300, 0.629, 12.879],
  ['bw_white', 400, 0.821, 13.071], ['bw_white', 600, 1.213, 13.463],
  ['bw_cream', 100, 0.240, 12.490], ['bw_cream', 200, 0.458, 12.708], ['bw_cream', 300, 0.674, 12.924],
  ['bw_cream', 400, 0.890, 13.140], ['bw_cream', 600, 1.333, 13.583]
];
for (const [paper, pages, spine, width] of measured) {
  test(`Ingram ${paper} ${pages} pp: spine ${spine}, cover width ${width}`, () => {
    const s = calc.ingramSpine(pages, paper);
    assert.equal(s, spine);
    const c = calc.cover(6, 9, s, 'ingram');
    assert.equal(c.width, width);
    assert.equal(c.height, 9.25);
  });
}
test('Ingram 5.5 x 8.5 White 300 pp: spine 0.629, cover 11.879 x 8.75', () => {
  const s = calc.ingramSpine(300, 'bw_white');
  assert.equal(s, 0.629);
  assert.deepEqual(calc.cover(5.5, 8.5, s, 'ingram'), { width: 11.879, height: 8.75 });
});
test('Ingram spine is null outside 100-600 and for color paper', () => {
  assert.equal(calc.ingramSpine(98, 'bw_white'), null);
  assert.equal(calc.ingramSpine(602, 'bw_white'), null);
  assert.equal(calc.ingramSpine(300, 'standard_color'), null);
  assert.equal(calc.ingramSpine(300, 'premium_color'), null);
});
test('Ingram in-between value is a straight-line estimate (150 pp White = midpoint of 100 and 200)', () => {
  assert.equal(calc.ingramSpine(150, 'bw_white'), calc.round((0.207 + 0.424) / 2));
});
test('Ingram odd page count is counted as the next even number', () => {
  assert.equal(calc.ingramSpine(299, 'bw_white'), calc.ingramSpine(300, 'bw_white'));
});

/* (b) KDP vectors, spec section 4 */
test('KDP 6 x 9, 300 pp, cream: spine 0.750, cover 13.000 x 9.250, inside 0.5, bleed page 6.125 x 9.25', () => {
  const s = calc.kdpSpine(300, 'bw_cream');
  assert.equal(s, 0.75);
  assert.deepEqual(calc.cover(6, 9, s), { width: 13, height: 9.25 });
  const i = calc.interior(6, 9, 300, true, ['kdp']);
  assert.equal(calc.interior(6, 9, 300, false, ['kdp']).margins.inside, 0.5);
  assert.equal(i.pageW, 6.125);
  assert.equal(i.pageH, 9.25);
});
test('KDP 5.5 x 8.5, 224 pp, white: spine 0.504, cover 11.754 x 8.750, inside 0.5', () => {
  const s = calc.kdpSpine(224, 'bw_white');
  assert.equal(s, 0.504);
  assert.deepEqual(calc.cover(5.5, 8.5, s), { width: 11.754, height: 8.75 });
  assert.equal(calc.interior(5.5, 8.5, 224, false, ['kdp']).margins.inside, 0.5);
});
test('KDP 6 x 9, 500 pp, Premium Color: spine 1.174 (1.1735 rounds half up), inside 0.625; 501 pp inside 0.75', () => {
  assert.equal(calc.kdpSpine(500, 'premium_color'), 1.174);
  assert.equal(calc.interior(6, 9, 500, false, ['kdp']).margins.inside, 0.625);
  assert.equal(calc.interior(6, 9, 501, false, ['kdp']).margins.inside, 0.75);
});
test('KDP 301 pages is counted as 302', () => {
  assert.equal(calc.evenPages(301), 302);
  assert.equal(calc.kdpSpine(301, 'bw_cream'), calc.round(302 * 0.0025));
  assert.equal(calc.compute({ trimW: 6, trimH: 9, pages: 301, paper: 'bw_cream', platforms: ['kdp'], bleed: false }).usedPages, 302);
});
test('KDP outside/top/bottom minimum is 0.25 without bleed and 0.375 with bleed', () => {
  const a = calc.interior(6, 9, 200, false, ['kdp']).margins;
  const b = calc.interior(6, 9, 200, true, ['kdp']).margins;
  assert.deepEqual([a.outside, a.top, a.bottom], [0.25, 0.25, 0.25]);
  assert.deepEqual([b.outside, b.top, b.bottom], [0.375, 0.375, 0.375]);
});

/* (c) Inside-margin tier boundaries */
test('inside-margin tier boundaries', () => {
  const expect = [[24, 0.375], [150, 0.375], [151, 0.5], [300, 0.5], [301, 0.625], [500, 0.625],
                  [501, 0.75], [700, 0.75], [701, 0.875], [828, 0.875]];
  for (const [pages, margin] of expect) assert.equal(calc.insideMargin(pages), margin, pages + ' pp');
  assert.equal(calc.insideMargin(829), null);
});

/* (d) Spine-text warnings */
test('KDP spine-text warning at 78 but not 79', () => {
  assert.ok(codes({ pages: 78, paper: 'bw_white', platforms: ['kdp'], bleed: false }).includes('kdp-spine-text'));
  assert.ok(!codes({ pages: 79, paper: 'bw_white', platforms: ['kdp'], bleed: false }).includes('kdp-spine-text'));
});
test('Ingram spine-text warning at 47 but not 48', () => {
  assert.ok(codes({ pages: 47, paper: 'bw_white', platforms: ['ingram'], bleed: false }).includes('ingram-spine-text'));
  assert.ok(!codes({ pages: 48, paper: 'bw_white', platforms: ['ingram'], bleed: false }).includes('ingram-spine-text'));
});
test('KDP page limits: 23 blocked, 24 fine; Standard Color needs 72', () => {
  assert.ok(codes({ pages: 23, paper: 'bw_white', platforms: ['kdp'], bleed: false }).includes('kdp-min-pages'));
  assert.ok(!codes({ pages: 24, paper: 'bw_white', platforms: ['kdp'], bleed: false }).includes('kdp-min-pages'));
  assert.ok(codes({ pages: 71, paper: 'standard_color', platforms: ['kdp'], bleed: false }).includes('kdp-min-pages'));
  assert.ok(!codes({ pages: 72, paper: 'standard_color', platforms: ['kdp'], bleed: false }).includes('kdp-min-pages'));
});
test('Ingram outside 100-600 gives no spine, only the generator note (98, 100, 600, 602)', () => {
  const base = { paper: 'bw_white', platforms: ['ingram'], bleed: false, trimW: 6, trimH: 9 };
  for (const pages of [98, 602]) {
    assert.ok(codes({ ...base, pages }).includes('ingram-range'), pages + ' pp warns');
    assert.equal(calc.compute({ ...base, pages }).spines.ingram.spine, null);
  }
  for (const pages of [100, 600]) {
    assert.ok(!codes({ ...base, pages }).includes('ingram-range'), pages + ' pp is in range');
    assert.notEqual(calc.compute({ ...base, pages }).spines.ingram.spine, null);
  }
});
test('Ingram is refused for color paper', () => {
  const r = calc.compute({ trimW: 6, trimH: 9, pages: 200, paper: 'premium_color', platforms: ['ingram'], bleed: false });
  assert.equal(r.ok, false);
  assert.ok(r.warnings.some((w) => w.code === 'ingram-paper'));
});

/* (e) "Both" uses the stricter margins */
test('both platforms: the larger margin wins on every side', () => {
  // 200 pp: KDP inside 0.5, outside 0.25; Ingram 0.5 all round -> 0.5 everywhere
  assert.deepEqual(calc.interior(6, 9, 200, false, ['kdp', 'ingram']).margins,
    { inside: 0.5, outside: 0.5, top: 0.5, bottom: 0.5 });
  // 400 pp: KDP inside 0.625 beats Ingram 0.5; outside stays 0.5 (Ingram)
  assert.deepEqual(calc.interior(6, 9, 400, false, ['kdp', 'ingram']).margins,
    { inside: 0.625, outside: 0.5, top: 0.5, bottom: 0.5 });
  // 600 pp with bleed: KDP inside 0.75; Ingram 0.5 from trim + 0.125 bleed = 0.625 outside/top/bottom beats KDP 0.375
  assert.deepEqual(calc.interior(6, 9, 600, true, ['kdp', 'ingram']).margins,
    { inside: 0.75, outside: 0.625, top: 0.625, bottom: 0.625 });
});
test('Ingram-only interior: 0.5 from trim on every side; bleed page size matches KDP', () => {
  assert.deepEqual(calc.interior(6, 9, 300, false, ['ingram']).margins, { inside: 0.5, outside: 0.5, top: 0.5, bottom: 0.5 });
  const b = calc.interior(6, 9, 300, true, ['ingram']);
  assert.equal(b.pageW, 6.125);
  assert.equal(b.pageH, 9.25);
});
test('both: the two spines differ (headline case, 400 pp white)', () => {
  const r = calc.compute({ trimW: 6, trimH: 9, pages: 400, paper: 'bw_white', platforms: ['kdp', 'ingram'], bleed: false });
  assert.equal(r.spines.kdp.spine, 0.901);
  assert.equal(r.spines.ingram.spine, 0.821);
  assert.ok(r.warnings.some((w) => w.code === 'spines-differ'));
});

console.log('\n' + passed + ' passed' + (process.exitCode ? ', some FAILED' : ', 0 failed'));
