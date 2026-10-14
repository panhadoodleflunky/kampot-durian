// Usage: node scripts/khmer-breaks.mjs <file>...
//
// Run after editing any Khmer copy (content/copy/*.js, content/sources.js,
// content/photos.js) or the SQL that fills the *_km columns. Inserts U+200B
// (zero-width space) between Khmer words, in place. Khmer has no spaces
// between words; ZWSP is the standard way to mark where a line may break,
// and a browser without a Khmer dictionary (Firefox) otherwise breaks
// mid-word. Only between two word-like segments, with a word joiner
// before ។ ៖ ៗ so no line starts with one; never inside a KEEP word;
// safe to re-run.
import { readFileSync, writeFileSync } from "node:fs";
const ZW = "\u200B";
/* WORD JOINER before ។ ៕ ៖ ៗ: no break there in any browser, so no line
   ever starts with Khmer punctuation (Firefox otherwise allows it). */
const WJ = "\u2060";
const PUNCT = /[\u200B\u2060]*([\u17D4-\u17D7\u17D9\u17DA])/g;
const KHMER_RUN = /[\u1780-\u17FF\u19E0-\u19FF\u200B\u2060]+/g;
/* Whole words the segmenter must not see: the site's own names, which its
   dictionary doesn't know (it cut ដើម|ធុរេន into ដើ|មធុរេន, and ដែល, របស់,
   ព្យួរ beside them), and words it cuts on its own — loanwords and a few
   common ones, found in the 14 October 2026 check. Each is taken out whole
   and the text around it segmented separately; two of them side by side
   (ធុរេនកំពត) stay joined. The repeat mark ៗ is held aside too: next to
   it the segmenter cuts the word before (ពិតៗ became ពិ|តៗ). */
const KEEP = [
  "ធុរេន", "ឪខាក់", "សដុងកិត", "ដុងកិត", "មនថង", "ម៉ូសាំងឃីង", "ទឹកឈូ", "កំពត", "ឆានី", "កញ្ញាវ", "ប្រចៀវ", "ភ្នំពេញ", "ត្បូងឃ្មុំ", "មណ្ឌលគិរី",
  "បង្កើត", "យកមកវិញ", "ហិកតា", "ការពារ", "កម្ម៉ង់", "សំឡេង", "នរណា", "ជើងសារ", "មែក", "ច្រវ៉ាក់", "កំប៉ុស", "ក្រានីត", "មូស្តាត", "ប៉ាក្លូប៊ូត្រាហ្សូល", "ផូស្វូណាត",
];
const NAMES = new RegExp(`(${[...KEEP].sort((a, b) => b.length - a.length).join("|")})`);
const REPEAT = /(ៗ)/;
const seg = new Intl.Segmenter("km", { granularity: "word" });
const segment = (text) =>
  text.split(REPEAT).flatMap((part) =>
    part === "ៗ" ? [{ text: part, word: true }] : [...seg.segment(part)].map((p) => ({ text: p.segment, word: p.isWordLike })),
  );

function breakRun(run) {
  const plain = run.replaceAll(ZW, "").replaceAll(WJ, "");
  const parts = plain.split(NAMES).flatMap((chunk) => (KEEP.includes(chunk) ? [{ text: chunk, word: true, keep: true }] : segment(chunk)));
  let out = "";
  parts.forEach((p, i) => {
    out += p.text;
    const next = parts[i + 1];
    if (next && p.word && next.word && !(p.keep && next.keep)) out += ZW;
  });
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
