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

/* The name rule, shared by signup and the account page. Returns a message,
   or "" when the name is fine. `name` is already trimmed. */
export function nameError(name, lang = "en") {
  const t = pick(forms, lang).rules;
  const length = count(name);
  if (length === 0) return t.nameRequired;
  if (length < NAME_MIN || length > NAME_MAX) return t.nameLength(NAME_MIN, NAME_MAX);
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
