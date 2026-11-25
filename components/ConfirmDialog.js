"use client";

import { useEffect, useRef } from "react";

/* A second-thought box, inside the page, for an action that can't be taken
   back: it names the thing, says what will happen, and puts Cancel first.
   A native <dialog>: showModal() keeps focus inside it and Escape cancels.
   `children` is anything the action needs asked first (a reason). Plain
   buttons, no <form>: the box can open inside the edit form, and a form
   inside a form would send the outer one too. */
export default function ConfirmDialog({ open, title, body, children, confirmLabel, cancelLabel, busy, onConfirm, onCancel }) {
  const ref = useRef(null);

  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    if (open && !box.open) box.showModal();
    if (!open && box.open) box.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="confirm-dialog"
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onCancel();
      }}
    >
      <h2 className="confirm-title">{title}</h2>
      {body ? <p className="body-copy">{body}</p> : null}
      {children}
      <div className="auth-actions confirm-actions">
        <button className="auth-btn" type="button" onClick={onCancel} disabled={busy} autoFocus>
          {cancelLabel}
        </button>
        <button className="btn confirm-danger" type="button" onClick={onConfirm} disabled={busy}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
