"use client";

import { useEffect, useState } from "react";
import { createClient } from "./supabase/client.js";
import { saveError } from "./save-error.js";
import { canEdit } from "./roles.js";
import { useLang } from "./use-lang.js";

/* The row the edit page starts from, and whether this reader may edit it:
   { status: "loading" | "failed" | "missing" | "logged-out" | "not-yours" |
   "ready" }, with `row` and `userId` when ready. `table` is "entries" or
   "contributions". The check is manners; the update policy decides. */
export function useEditRow(table, slug) {
  const [state, setState] = useState({ status: "loading" });
  const lang = useLang();

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.auth.getUser(),
      supabase.from(table).select("id, owner, title, khmer_name, body, sources, tags, title_km, body_km, sources_km, tags_km, photo_url").eq("slug", slug).maybeSingle(),
    ]).then(([{ data: auth }, { data: row, error }]) => {
      if (error) return setState({ status: "failed", message: saveError("load entry", error, lang) });
      if (!row) return setState({ status: "missing" });
      if (!auth.user) return setState({ status: "logged-out" });
      if (!canEdit(auth.user, row.owner)) return setState({ status: "not-yours" });
      setState({ status: "ready", row, userId: auth.user.id });
    });
  }, [table, slug, lang]);

  return state;
}
