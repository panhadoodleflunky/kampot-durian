/* What a list of notes looks like while it loads: grey bars in the shape of
   the notes to come, so the page has its layout at once instead of one line
   of text. The words are still there for a screen reader. */
export default function LoadingNotes({ label, count = 2 }) {
  return (
    <div role="status">
      <p className="sr-only">{label}</p>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="account-block note-skeleton" aria-hidden="true">
          <span className="skeleton-bar skeleton-title" />
          <span className="skeleton-bar" />
          <span className="skeleton-bar skeleton-short" />
        </div>
      ))}
    </div>
  );
}
