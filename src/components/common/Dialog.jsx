import "./dialog.css";

export function Dialog({ dialogText, confirmAction, cancelAction }) {
  return (
    <div className="dialog__container">
      <div className="dialog__box">
        <p>{dialogText}</p>
        <button className="button__confirm" onClick={confirmAction}>
          Yes
        </button>
        <button className="button__cancel" onClick={cancelAction}>
          No
        </button>
      </div>
    </div>
  );
}
