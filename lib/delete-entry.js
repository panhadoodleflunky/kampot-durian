import { supabase } from "./use-session.js";
import { storagePath } from "./photo-upload.js";
import { saveError } from "./save-error.js";
import { refreshArchive } from "./actions.js";
import { pick } from "./i18n.js";
import { forms } from "../content/copy/forms.js";

/* Deletes one entry or note, then its photo, then refreshes the static
   pages. Shared by the entry pages (OwnerActions) and My notes (MyNote).
   Resolves with "" when it worked, or the sentence to show when it didn't.

   The delete policies decide who may delete; a refused delete comes back
   as success with no rows, which is why the row must come back. */
export async function deleteEntry({ table, id, owner, photoUrl, lang }) {
  const client = await supabase();
  const { data, error } = await client.from(table).delete().eq("id", id).select("id");
  if (error) return saveError("delete entry", error, lang);
  if (data.length === 0) {
    console.error("delete entry: no row came back for id", id);
    return pick(forms, lang).save.notSaved;
  }
  /* The entry is gone; its photo goes too if it was in the bucket. */
  const path = storagePath(photoUrl, owner);
  if (path) await client.storage.from("photos").remove([path]);
  /* Already deleted: a failed refresh is not worth stopping for; the pages
     rebuild within a minute anyway. */
  await refreshArchive().catch((failed) => console.error("refresh archive:", failed));
  return "";
}
