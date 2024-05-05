import "./formElements.css";

export function FormFieldset({ className, labelText, children }) {
  return (
    <fieldset className={className}>
      <span className="radiogroup__label">{labelText}</span>
      <span className="radiogroup__options">{children}</span>
    </fieldset>
  );
}
