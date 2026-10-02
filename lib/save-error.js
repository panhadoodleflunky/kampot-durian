/* What the reader is told when a save fails. The real error always goes to
   console.error for whoever is debugging; the screen gets a sentence the
   reader can act on and nothing an attacker can learn from — no table names,
   no constraint names, no Postgres wording. */
export function saveError(where, failed) {
  console.error(`${where}:`, failed);

  if (failed?.name === "AuthRetryableFetchError" || failed instanceof TypeError) {
    return "The archive didn't answer. Check your connection and try again.";
  }
  /* 42501: row-level security said no. Usually an expired session. */
  if (failed?.code === "42501" || failed?.statusCode === "403") {
    return "You aren't allowed to do that. Log out, log in again, and try once more.";
  }
  /* 23514: a check constraint said no — the form's rules, enforced again by
     the database. */
  if (failed?.code === "23514") {
    return "Something in the entry breaks the archive's rules. Check each field's length and try again.";
  }
  return "That didn't save. Try again in a minute.";
}
