/* The rules a contributed entry has to meet, in one place. The contribute
   and edit forms both check against this before anything is sent, and the
   check constraints in Postgres (Lab 7 Part 3) carry the same numbers, so a
   request that never touches the form is refused by the database instead.

   Lengths are counted in characters, not UTF-16 units — [...text] splits on
   code points, the way Postgres's char_length does — so a Khmer title is
   measured the same in the browser and in the database. */
export const RULES = {
  title: { label: "Title", required: true, min: 3, max: 120 },
  khmerName: { label: "Khmer name", required: false, min: 0, max: 120 },
  body: { label: "Entry", required: true, min: 50, max: 10000 },
  sources: { label: "Sources", required: true, min: 3, max: 500 },
};

export const MAX_TAGS = 6;
export const MAX_TAG_LENGTH = 30;
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

const count = (text) => [...text].length;

/* Comma-separated in the form, an array in the table. Empty pieces dropped,
   each one trimmed and lower-cased, duplicates removed. */
export function parseTags(text) {
  const tags = text
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
  return [...new Set(tags)];
}

/* `fields` holds trimmed strings. Returns { field: "message" } for every
   field that fails, so each message can sit next to its own input; an empty
   object means the entry can be sent. The photo is checked separately, in
   lib/photo-upload.js, because reading its first bytes is asynchronous. */
export function validateEntry(fields) {
  const errors = {};

  for (const [name, rule] of Object.entries(RULES)) {
    const length = count(fields[name]);
    if (length === 0) {
      if (rule.required) errors[name] = `${rule.label} is required.`;
    } else if (length < rule.min) {
      errors[name] = `${rule.label} needs at least ${rule.min} characters.`;
    } else if (length > rule.max) {
      errors[name] = `${rule.label} can be at most ${rule.max} characters (now ${length}).`;
    }
  }

  const tags = parseTags(fields.tags);
  if (tags.length > MAX_TAGS) {
    errors.tags = `At most ${MAX_TAGS} tags.`;
  } else if (tags.some((tag) => count(tag) > MAX_TAG_LENGTH)) {
    errors.tags = `Each tag can be at most ${MAX_TAG_LENGTH} characters.`;
  }

  return errors;
}

/* The address of a new entry. Latin letters and digits from the title, then
   six random hex characters, because `slug` is unique in the table and two
   contributors can pick the same title. A title in Khmer script has no Latin
   letters at all; it gets "entry-" and the random part. */
export function makeSlug(title) {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
  const suffix = crypto.randomUUID().slice(0, 6);
  return `${base || "entry"}-${suffix}`;
}
