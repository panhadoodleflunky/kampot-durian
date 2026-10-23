"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/use-session.js";
import { useLang } from "../lib/use-lang.js";
import { pick, localize } from "../lib/i18n.js";
import { forms } from "../content/copy/forms.js";

/* On My notes, for the reviewer only: how many notes are waiting, and the
   way into the queue. Nothing renders for anyone else, or while nothing is
   waiting. Showing it is manners; the queue itself checks again. */
export default function ReviewerBanner() {
  const [waiting, setWaiting] = useState(0);
  const lang = useLang();
  const t = pick(forms, lang).review;

  useEffect(() => {
    let dropped = false;
    (async () => {
      const client = await supabase();
      const { data: reviewer } = await client.rpc("is_reviewer");
      if (reviewer !== true) return;
      const { count } = await client
        .from("contributions")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending");
      if (!dropped) setWaiting(count ?? 0);
    })();
    return () => {
      dropped = true;
    };
  }, []);

  if (!waiting) return null;
  return (
    <div className="prompt-card review-banner">
      <p className="body-copy">{t.waiting(waiting)}</p>
      <div className="auth-actions">
        <Link className="btn" href={localize(lang, "/review")}>
          {t.open}
        </Link>
      </div>
    </div>
  );
}
