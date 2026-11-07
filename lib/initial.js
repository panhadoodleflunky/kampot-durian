/* The first letter of a name as the reader sees it: a Khmer consonant with
   its subscript and vowel marks is one grapheme, not one code point. */
export function initial(name) {
  const first = new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(name.trim())[Symbol.iterator]().next();
  return first.done ? "" : first.value.segment.toUpperCase();
}
