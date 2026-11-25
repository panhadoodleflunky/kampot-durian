import PasswordInput from "./PasswordInput.js";

/* One labelled input in the entry form, with its rule underneath and the
   message for this field beside it when the rule is broken. The message is
   tied to the input with aria-describedby, so a screen reader announces it
   on focus, and aria-invalid marks the field itself.
   `required` puts a "Required" tag beside the label (its words come from
   the form, `requiredTag`) and marks the input aria-required. */
export default function FormField({ id, label, hint, error, multiline, required, requiredTag, ...input }) {
  /* A password box gets the show/hide eye (PasswordInput). */
  const Tag = multiline ? "textarea" : input.type === "password" ? PasswordInput : "input";
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className="entry-field">
      <label className="search-label" htmlFor={id}>
        {label}
        {required ? <span className="field-required">{requiredTag}</span> : null}
      </label>
      <Tag
        id={id}
        className={`search-input auth-input${multiline ? " entry-textarea" : ""}`}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
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
