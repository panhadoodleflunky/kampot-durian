/* The photo input. `accept` only filters the file picker — it is a hint, not
   a check — so the real test is checkPhoto in lib/photo-upload.js, run on
   submit. On the edit form the current photo is shown and keeping it is the
   default: leaving the input empty means "no change". */
export default function PhotoField({ error, currentUrl, onChange }) {
  return (
    <div className="entry-field">
      <label className="search-label" htmlFor="entry-photo">
        {currentUrl ? "Replace the photograph (optional)" : "Photograph"}
      </label>
      {currentUrl ? (
        /* A thumbnail the contributor already uploaded, shown only to them on
           the edit page; next/image would add nothing here. */
        // eslint-disable-next-line @next/next/no-img-element
        <img className="entry-photo-current" src={currentUrl} alt="The entry's current photograph" />
      ) : null}
      <input
        id="entry-photo"
        className="entry-photo-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-invalid={error ? true : undefined}
        aria-describedby={`entry-photo-hint${error ? " entry-photo-error" : ""}`}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <p className="entry-field-hint" id="entry-photo-hint">
        Your own photograph. JPEG, PNG or WebP, 5 MB at most.
      </p>
      {error ? (
        <p className="entry-field-error" id="entry-photo-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
