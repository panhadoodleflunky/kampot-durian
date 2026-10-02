/* One labelled input in the entry form, with its rule underneath and the
   message for this field beside it when the rule is broken. The message is
   tied to the input with aria-describedby, so a screen reader announces it
   on focus, and aria-invalid marks the field itself. */
export default function FormField({ id, label, hint, error, multiline, ...input }) {
  const Tag = multiline ? "textarea" : "input";
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className="entry-field">
      <label className="search-label" htmlFor={id}>
        {label}
      </label>
      <Tag
        id={id}
        className={`search-input auth-input${multiline ? " entry-textarea" : ""}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${hintId}${error ? ` ${errorId}` : ""}`}
        {...input}
      />
      <p className="entry-field-hint" id={hintId}>
        {hint}
      </p>
      {error ? (
        <p className="entry-field-error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
