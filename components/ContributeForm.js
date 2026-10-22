"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

import { useEffect, useState } from "react";
import SignInPrompt from "./SignInPrompt.js";
import SentNotice from "./SentNotice.js";
import { useRouter } from "next/navigation";
import EntryForm from "./EntryForm.js";
import { createClient } from "../lib/supabase/client.js";
import { makeSlug } from "../lib/entry-rules.js";
import { entryColumns, nextFigNumber } from "../lib/entry-row.js";
import { uploadPhoto, storagePath } from "../lib/photo-upload.js";
import { saveError } from "../lib/save-error.js";
import { refreshArchive } from "../lib/actions.js";
import { isCurator } from "../lib/roles.js";

/* /contribute. Hiding the form from a logged-out visitor is manners; the
   insert policies are what actually refuse them. The curator's entries go
   into the Field Notes catalogue (`entries`); everyone else's go to
   Community Notes (`contributions`), never into the family's catalogue.
   A community note starts "pending" (the table's default; the form never
   sends a status) and waits for the curator, so its author is told so
   instead of being sent to a page the public can't see yet. */
export default function ContributeForm() {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [sent, setSent] = useState(false);
  const lang = useLang();
  const all = pick(forms, lang);
  const t = all.contribute;

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setUser(data.user ?? null));
  }, []);

  async function save(fields, photo, kind) {
    const supabase = createClient();
    /* Asked again at save time, not trusted from page load: the session can
       have ended in another tab since. The owner is this id — never a value
       from the form. */
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return t.loggedOut;

    /* The photograph is optional; without one the entry simply has none. */
    let photoUrl = null;
    if (photo) {
      photoUrl = await uploadPhoto(supabase, auth.user.id, photo, kind).catch((failed) => {
        saveError("photo upload", failed, lang);
        return null;
      });
      if (!photoUrl) return all.photo.uploadFailed;
    }

    const curator = isCurator(auth.user);
    const row = { ...entryColumns(fields), slug: makeSlug(fields.title), photo_url: photoUrl, owner: auth.user.id };
    /* The curator's own entries join the catalogue: a number, and
       "published" rather than the table's default "in-progress", which
       the site shows as "the material behind this entry is thin". */
    if (curator) Object.assign(row, { fig_number: await nextFigNumber(supabase), status: "published" });

    const { data, error } = await supabase
      .from(curator ? "entries" : "contributions")
      .insert(row)
      .select("slug")
      .single();

    if (error) {
      /* The entry never existed, so its photo shouldn't either. */
      if (photoUrl) await supabase.storage.from("photos").remove([storagePath(photoUrl)]);
      return saveError("insert entry", error, lang);
    }

    /* Nothing public changed: the note is pending. */
    if (!curator) return setSent(true);
    /* Already saved: a failed refresh must not read as a failed save. */
    await refreshArchive().catch((failed) => console.error("refresh archive:", failed));
    router.push(localize(lang, `/field-notes/${data.slug}`));
  }

  if (user === undefined) return <p className="body-copy">{t.checking}</p>;
  if (user === null) {
    return <SignInPrompt>{t.needAccount}</SignInPrompt>;
  }
  if (sent) return <SentNotice onAnother={() => setSent(false)} />;
  return (
    <>
      <p className="body-copy">
        {isCurator(user) ? t.curator : t.reader}
      </p>
      <EntryForm submitLabel={all.entry.add} onSave={save} />
    </>
  );
}
