"use client";

import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

import { useEffect, useState } from "react";
import SignInPrompt from "./SignInPrompt.js";
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
   Community Notes (`contributions`), never into the family's catalogue. */
export default function ContributeForm() {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
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

    const photoUrl = await uploadPhoto(supabase, auth.user.id, photo, kind).catch((failed) => {
      saveError("photo upload", failed, lang);
      return null;
    });
    if (!photoUrl) return all.photo.uploadFailed;

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
      await supabase.storage.from("photos").remove([storagePath(photoUrl)]);
      return saveError("insert entry", error, lang);
    }

    /* Already saved: a failed refresh must not read as a failed save. */
    await refreshArchive().catch((failed) => console.error("refresh archive:", failed));
    router.push(localize(lang, `${curator ? "/field-notes" : "/contributed"}/${data.slug}`));
  }

  if (user === undefined) return <p className="body-copy">{t.checking}</p>;
  if (user === null) {
    return <SignInPrompt>{t.needAccount}</SignInPrompt>;
  }
  return (
    <>
      <p className="body-copy">
        {isCurator(user) ? t.curator : t.reader}
      </p>
      <EntryForm photoRequired submitLabel={all.entry.add} onSave={save} />
    </>
  );
}
