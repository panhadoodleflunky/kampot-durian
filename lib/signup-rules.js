import { pick } from "./i18n.js";
import { forms } from "../content/copy/forms.js";

/* The rules a new account has to meet. The form checks them before anything
   is sent. The display name is checked again by the database: the signup
   trigger copies it into `profiles`, whose check constraint refuses a
   missing or overlong one, and the whole signup fails with it. The account
   page uses the same name and password rules (and the profiles constraint
   catches a rename that skips the form). The password
   minimum is also set in the Supabase dashboard, so a console signup can't
   use a shorter one. */
export const NAME_MIN = 2;
export const NAME_MAX = 50;
export const PASSWORD_MIN = 8;
/* Supabase hashes passwords with bcrypt, which reads at most 72 bytes. */
export const PASSWORD_MAX = 72;

const count = (text) => [...text].length;

/* A real calendar date, written YYYY-MM-DD (what <input type="date">
   gives), between 1900 and today. "2026-02-31" is not a real date. */
function badBirthdate(text) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return true;
  const date = new Date(`${text}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== text) return true;
  return text < "1900-01-01" || date > new Date();
}

/* The tick beside the curator's name is the site's own mark (VerifiedName),
   never part of a name, so no one can type their way to it: a name may not
   hold a tick-like symbol or the words that would claim the role. The
   profiles check constraint `display_name_not_verified` says the same
   (owner, 30 Oct 2026); keep the two lists equal.

   Before the words are looked for, the name is folded the way the
   constraint folds it: NFKC turns full-width and styled letters into plain
   ones ("Ｖerified"), and LOOKALIKE swaps the Cyrillic and Greek letters
   that pass for Latin ones in these three words ("Аdmin"). */
const TICKS = /[\u2713\u2714\u2611\u2705\u221A\u{1F5F8}\u{1F5F9}]/u;
const WORDS = /verified|curator|admin/i;
const LOOKALIKE = { "а": "a", "е": "e", "і": "i", "о": "o", "с": "c", "ԁ": "d", "ν": "v", "ο": "o", "ι": "i", "α": "a" };
const fold = (name) => name.normalize("NFKC").toLowerCase().replace(/[аеіосԁνοια]/g, (c) => LOOKALIKE[c]);
export const isReservedName = (name) => TICKS.test(name) || WORDS.test(fold(name));

/* The name rule, shared by signup and the account page. Returns a message,
   or "" when the name is fine. `name` is already trimmed. */
export function nameError(name, lang = "en") {
  const t = pick(forms, lang).rules;
  const length = count(name);
  if (length === 0) return t.nameRequired;
  if (length < NAME_MIN || length > NAME_MAX) return t.nameLength(NAME_MIN, NAME_MAX);
  if (isReservedName(name)) return t.nameReserved;
  return "";
}

/* The password rules, shared the same way: { password?, confirm? }. */
export function passwordErrors(password, confirm, lang = "en") {
  const t = pick(forms, lang).rules;
  const errors = {};
  if (password.length < PASSWORD_MIN) {
    errors.password = t.passwordShort(PASSWORD_MIN);
  } else if (new TextEncoder().encode(password).length > PASSWORD_MAX) {
    errors.password = t.passwordLong;
  }
  if (confirm !== password) errors.confirm = t.passwordMismatch;
  return errors;
}

/* `fields`: name, email, password, confirm, birthdate, agreed. Returns
   { field: "message" } for each one that fails. */
export function validateSignup(fields, lang = "en") {
  const t = pick(forms, lang).rules;
  const errors = passwordErrors(fields.password, fields.confirm, lang);

  const name = nameError(fields.name, lang);
  if (name) errors.name = name;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = t.email;
  }

  if (fields.birthdate && badBirthdate(fields.birthdate)) {
    errors.birthdate = t.birthdate;
  }

  if (!fields.agreed) errors.agreed = t.agree;
  return errors;
}
