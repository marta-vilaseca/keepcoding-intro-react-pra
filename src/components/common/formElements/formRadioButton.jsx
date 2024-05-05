import "./formElements.css";

export function FormRadioButton({ onChange, id, name, value, checked }) {
  return (
    <>
      <input onChange={onChange} type="radio" id={id} name={name} value={value} checked={checked} />
      <label htmlFor={id}>{id}</label>
    </>
  );
}
