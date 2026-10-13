// Usage: node scripts/khmer-breaks.mjs <file>...
//
// Run after editing any Khmer copy (content/copy/*.js, content/sources.js,
// content/photos.js) or the SQL that fills the *_km columns. Inserts U+200B
// (zero-width space) between Khmer words, in place. Khmer has no spaces
// between words; ZWSP is the standard way to mark where a line may break,
// and a browser without a Khmer dictionary (Firefox) otherwise breaks
// mid-word. Only between two word-like segments, with a word joiner
// before ។ ៖ ៗ so no line starts with one; never inside the site's own
// names (KEEP); safe to re-run.
import { readFileSync, writeFileSync } from "node:fs";
const ZW = "\u200B";
/* WORD JOINER before ។ ៕ ៖ ៗ: no break there in any browser, so no line
   ever starts with Khmer punctuation (Firefox otherwise allows it). */
const WJ = "\u2060";
const PUNCT = /[\u200B\u2060]*([\u17D4-\u17D7\u17D9\u17DA])/g;
const KHMER_RUN = /[\u1780-\u17FF\u19E0-\u19FF\u200B\u2060]+/g;
const KEEP = ["ធុរេន", "ឪខាក់", "សដុងកិត", "ដុងកិត", "មនថង", "ម៉ូសាំងឃីង", "ទឹកឈូ", "កំពត", "ឆានី", "កញ្ញាវ", "ប្រចៀវ", "ភ្នំពេញ", "ត្បូងឃ្មុំ", "មណ្ឌលគិរី"];
const seg = new Intl.Segmenter("km", { granularity: "word" });
const keepPatterns = KEEP.map((w) => [new RegExp([...w].join(`${ZW}?`), "g"), w]);

function breakRun(run) {
  const plain = run.replaceAll(ZW, "").replaceAll(WJ, "");
  const parts = [...seg.segment(plain)];
  let out = "";
  parts.forEach((p, i) => {
    out += p.segment;
    const next = parts[i + 1];
    if (next && p.isWordLike && next.isWordLike) out += ZW;
  });
  for (const [re, word] of keepPatterns) out = out.replace(re, word);
  return out.replace(PUNCT, (m, mark, offset) => (offset === 0 ? mark : WJ + mark));
}

let total = 0;
for (const file of process.argv.slice(2)) {
  const before = readFileSync(file, "utf8");
  const after = before.replace(KHMER_RUN, breakRun);
  const added = (after.match(/\u200B/g) || []).length - (before.match(/\u200B/g) || []).length;
  total += added;
  if (after !== before) writeFileSync(file, after);
  console.log(`${added >= 0 ? "+" : ""}${added}\t${file}`);
}
console.log("total", total);
