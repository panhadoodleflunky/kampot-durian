/* What a page says when Supabase didn't answer — asleep, or a network
   hiccup. One sentence, in one place, so every page that reads the archive
   fails the same way instead of printing "0 entries" as if that were true. */
export default function ArchiveDown() {
  return (
    <p className="body-copy">
      The archive didn&rsquo;t answer just now. Reload in a moment — the
      entries themselves are fine, this page just missed them.
    </p>
  );
}
