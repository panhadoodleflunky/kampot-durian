"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

import SignInPrompt from "./SignInPrompt.js";
import { useRouter } from "next/navigation";
import EntryForm from "./EntryForm.js";
import { createClient } from "../lib/supabase/client.js";
import { entryColumns, formValues } from "../lib/entry-row.js";
import { useEditRow } from "../lib/use-edit-row.js";
import { uploadPhoto, storagePath } from "../lib/photo-upload.js";
import { saveError } from "../lib/save-error.js";
import { refreshArchive } from "../lib/actions.js";

/* The edit page. The row is read straight from the table, not from the
   static page, so the form starts from what is really stored
   (lib/use-edit-row.js).

   The "not yours" message is politeness only. A stranger who skips this
   page and sends an update from the console is refused by the update policy
   (owner only) — and Supabase reports that as success with zero
   rows, which is why save() checks for the row coming back. */
/* `table` is "entries" for a field note or "contributions" for a community
   note; `basePath` is where that shelf's pages live. */
export default function EditEntryForm({ table = "entries", basePath = "/field-notes", slug }) {
  const router = useRouter();
  const lang = useLang();
  const all = pick(forms, lang);
  const t = all.edit;
  const state = useEditRow(table, slug);

  async function save(fields, photo, kind) {
    const { row, userId } = state;
    const supabase = createClient();
    let photoUrl = row.photo_url;
    if (photo) {
      photoUrl = await uploadPhoto(supabase, userId, photo, kind).catch((failed) => {
        saveError("photo upload", failed, lang);
        return null;
      });
      if (!photoUrl) return all.photo.uploadFailed;
    }

    /* A community note goes back to review when it is edited (Sprint 3), so
       the update says "pending" — the edit policy refuses anything else from
       a non-reviewer, a published note included. A reviewer's own note keeps
       its status. If the question fails, the safe answer is "not a
       reviewer". Field notes have no review step. */
    const review = table === "contributions" && (await supabase.rpc("is_reviewer")).data !== true;
    const { data, error } = await supabase
      .from(table)
      .update({ ...entryColumns(fields), photo_url: photoUrl, ...(review ? { status: "pending" } : {}) })
      .eq("id", row.id)
      .select("id");

    const saved = !error && data.length > 0;
    /* With a new photo, one of the two is now unused: the new one if the
       save failed, the old one if it worked. storagePath is null for the
       original photos in public/, which are never removed. */
    if (photo) {
      const unused = storagePath(saved ? row.photo_url : photoUrl, row.owner);
      if (unused) await supabase.storage.from("photos").remove([unused]);
    }

    if (error) return saveError("update entry", error, lang);
    if (!saved) {
      console.error("update entry: no row came back for id", row.id);
      return all.save.notSaved;
    }
    /* Already saved: a failed refresh must not read as a failed save. */
    await refreshArchive().catch((failed) => console.error("refresh archive:", failed));
    /* A note waiting for review has no public page yet; its author sees it
       on My notes. */
    router.push(localize(lang, review ? "/my-entries" : `${basePath}/${slug}`));
  }

  const { status } = state;
  if (status === "loading") return <p className="body-copy">{t.loading}</p>;
  if (status === "failed") return <p className="auth-error">{state.message}</p>;
  if (status === "missing") return <p className="body-copy">{t.missing}</p>;
  if (status === "logged-out") return <SignInPrompt>{t.loggedOut}</SignInPrompt>;
  if (status === "not-yours") return <p className="body-copy">{t.notYours}</p>;

  const { row } = state;
  return <EntryForm initial={formValues(row)} currentPhotoUrl={row.photo_url} submitLabel={all.entry.saveChanges} onSave={save} />;
}
