import "./dialog.css";

export function Dialog({ dialogText, confirmAction, confirmActionText, cancelAction, cancelActionText }) {
  return (
    <div className="dialog__container">
      <div className="dialog__box">
        <p>{dialogText}</p>
        <button className="button__confirm" onClick={confirmAction}>
          {confirmActionText}
        </button>
        <button className="button__cancel" onClick={cancelAction}>
          {cancelActionText}
        </button>
      </div>
    </div>
  );
}
