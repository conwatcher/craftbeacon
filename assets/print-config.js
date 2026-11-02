/* Print Setup Guide (print-setup.html) — DATA ONLY, no logic.
   Every number, threshold and step text used by assets/print-calc.js and assets/print.js lives here.
   Sources are the platforms' published specifications and IngramSpark's own Cover Template Generator,
   checked on the dates below. Loads as window.PRINT_CONFIG in the browser and via require() in node.

   Adding a software guide is a data-only edit: add one key to `guides` (name, verified, sourceNote,
   canDo, steps). Nothing else needs to change. */
(function (root, factory) {
  var cfg = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = cfg;
  else root.PRINT_CONFIG = cfg;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  return {
    verified: '2026-11-02',

    display: {
      decimals: 3                   // values are shown to 3 decimals, rounded half up
    },

    /* Trim sizes offered in the picker (inches, width x height). The list is KDP's. */
    trimSizes: [
      { w: 5,    h: 8,    group: 'Regular' },
      { w: 5.06, h: 7.81, group: 'Regular' },
      { w: 5.25, h: 8,    group: 'Regular' },
      { w: 5.5,  h: 8.5,  group: 'Regular' },
      { w: 6,    h: 9,    group: 'Regular' },
      { w: 6.14, h: 9.21, group: 'Large' },
      { w: 6.69, h: 9.61, group: 'Large' },
      { w: 7,    h: 10,   group: 'Large' },
      { w: 7.44, h: 9.69, group: 'Large' },
      { w: 7.5,  h: 9.25, group: 'Large' },
      { w: 8,    h: 10,   group: 'Large' },
      { w: 8.25, h: 6,    group: 'Large' },
      { w: 8.25, h: 8.25, group: 'Large' },
      { w: 8.5,  h: 8.5,  group: 'Large' },
      { w: 8.5,  h: 11,   group: 'Large' },
      { w: 8.27, h: 11.69, group: 'Large' }
    ],

    kdp: {
      name: 'Amazon KDP',
      verified: '2026-11-02',
      source: 'Amazon KDP help: kdp.amazon.com/help?topicId=G201953020 (cover), GVBQ3CMEQW3W2VL6 (trim, bleed, margins), G201857950 (submission guidelines), G202145400 (Word for Windows). The pages carry no "last updated" date; checked Nov 2, 2026.',
      bleed: 0.125,                 // inches; all covers need bleed, interiors only when images touch the edge
      pageMultiple: 2,              // KDP rounds the page count UP to an even number
      maxPages: 828,                // black ink on white paper at common trim sizes; the true limit varies by ink, paper and trim
      spineTextMinPages: 79,        // under this, a cover with spine text is rejected
      papers: {
        bw_white:       { label: 'Black ink, white paper', factor: 0.002252, minPages: 24 },   // inches per page
        bw_cream:       { label: 'Black ink, cream paper', factor: 0.0025,   minPages: 24 },
        standard_color: { label: 'Standard color ink',     factor: 0.002252, minPages: 72 },
        premium_color:  { label: 'Premium color ink',      factor: 0.002347, minPages: 24 }
      },
      // Minimum inside (gutter) margin by page count, inches
      insideTiers: [
        { from: 24,  to: 150, margin: 0.375 },
        { from: 151, to: 300, margin: 0.5 },
        { from: 301, to: 500, margin: 0.625 },
        { from: 501, to: 700, margin: 0.75 },
        { from: 701, to: 828, margin: 0.875 }
      ],
      outsideMin: 0.25,             // minimum outside, top and bottom margin, no bleed
      outsideMinBleed: 0.375        // the same minimum when the interior has bleed
    },

    ingram: {
      name: 'IngramSpark',
      verified: '2026-11-02',
      source: 'IngramSpark File Creation Guide (revision 8.24.26) and ingramspark.com/blog/file-requirements-for-print-books. Spine widths are measured, not published: see spineTable.',
      bleed: 0.125,                 // cover: all four sides; interior: top, bottom and outside edges
      pageMultiple: 2,              // page count must be divisible by 2
      safety: 0.5,                  // recommended distance from trim on ALL sides of the interior
      spineTextMinPages: 48,        // no spine text on perfect-bound books under 48 pages
      barcode: { w: 1.75, h: 1 },   // mandatory on every cover; clear area to leave if you supply none, inches
      generatorUrl: 'https://myaccount.ingramspark.com/Portal/Tools/CoverTemplateGenerator',
      // Only black-and-white papers are measured. Color is NOT offered for IngramSpark.
      paper: { bw_white: 'white', bw_cream: 'creme' },
      supportedPages: { min: 100, max: 600 },
      measured: '2026-11-02',
      measuredSource: 'Measured via the IngramSpark Cover Template Generator, Nov 2, 2026: perfect bound, black and white, 6 x 9 (plus one 5.5 x 8.5 White 300 check). Finish and duplex do not change the spine; trim size does not change the spine.',
      toleranceNote: 'estimate, within about 0.01 inch; your IngramSpark template is final',
      toleranceInches: 0.01,
      // [pages, spine in inches]; spine is read between points by straight-line interpolation
      spineTable: {
        white: [[100, 0.207], [200, 0.424], [300, 0.629], [400, 0.821], [600, 1.213]],
        creme: [[100, 0.240], [200, 0.458], [300, 0.674], [400, 0.890], [600, 1.333]]
      }
    },

    /* Software guides. steps(c, hasBleed) returns an array of step strings.
       c holds the author's numbers as short strings: pageW, pageH, top, bottom, inside, outside,
       bleedW (bleed added to width), bleedH (bleed added to height). */
    guides: {
      word: {
        name: 'Microsoft Word',
        verified: '2026-11-02',
        sourceNote: 'Microsoft Support and Amazon KDP help, written for Word 2016; later versions are similar.',
        canDo: { customSize: true, mirroredMargins: true },
        steps: function (c, hasBleed) {
          var s = [
            'Layout tab > Size > More Paper Sizes. Set Width ' + c.pageW + '" and Height ' + c.pageH + '". In "Apply to" choose Whole document, then OK.' +
              (hasBleed ? ' (Bleed on: the page size is trim plus ' + c.bleedW + '" in width and ' + c.bleedH + '" in height; Word may show 0.13".)' : ''),
            'Layout tab > Margins > Custom Margins.',
            'In "Multiple pages" choose Mirror margins. In "Apply to" choose Whole document.',
            'Enter Top ' + c.top + '", Bottom ' + c.bottom + '", Inside ' + c.inside + '", Outside ' + c.outside + '". Leave Gutter at 0. (The inside margin already holds the binding space.)',
            'Click OK. If your page count changes, recheck the Inside margin, because it depends on page count.'
          ];
          if (hasBleed) s.push('Save as PDF; KDP requires a PDF for interiors with bleed.');
          return s;
        }
      },
      libreoffice: {
        name: 'LibreOffice Writer',
        verified: '2026-11-02',
        sourceNote: 'LibreOffice help and the CraftBeacon operator\'s own install, Nov 2, 2026.',
        canDo: { customSize: true, mirroredMargins: true },
        steps: function (c, hasBleed) {
          var s = [
            'Format > Page Style (this edits "Default Page Style", which sets every page that uses it).',
            'On the Page tab, set Format to User, then Width ' + c.pageW + '" and Height ' + c.pageH + '".',
            'Under Layout Settings set Page layout to Mirrored.',
            'Under Margins the fields now read Inner, Outer, Top and Bottom. Enter Inner ' + c.inside + '", Outer ' + c.outside + '", Top ' + c.top + '", Bottom ' + c.bottom + '". Leave Gutter at 0.00".',
            'Click OK. If your page count changes, recheck the Inner margin.',
            'If chapter-opening pages use a different page style (for example First Page), repeat these settings there or make that style inherit from Default Page Style.'
          ];
          if (hasBleed) s.push('File > Export As > Export as PDF.');
          return s;
        }
      },
      googledocs: {
        name: 'Google Docs',
        verified: '2026-11-02',
        sourceNote: 'Checked on a live Google Docs page setup screen, Nov 2, 2026.',
        canDo: { customSize: false, mirroredMargins: false },
        cannotDoNote: 'Google Docs cannot make a book page size or alternating inside and outside margins. File > Page setup offers only preset paper sizes (Letter, A4, A5, B4, B5 and similar), and its margins are Top, Bottom, Left and Right.',
        steps: function (c, hasBleed) {
          return [
            'Your numbers are above, so you can keep them for the next step. Page size ' + c.pageW + '" x ' + c.pageH + '"; Inside ' + c.inside + '", Outside ' + c.outside + '", Top ' + c.top + '", Bottom ' + c.bottom + '".',
            'Download the document as a Word file: File > Download > Microsoft Word (.docx).',
            'Open the file in Word or in the free LibreOffice Writer, and follow that guide here with the same numbers.'
          ];
        }
      }
    }
  };
});
