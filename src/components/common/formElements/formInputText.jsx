import "./formElements.css";

export function FormInputText({ id, name, value, type, onChange, required }) {
  return <input id={id} name={name} type={type ? type : "text"} value={value} onChange={onChange} {...(required ? { required: "required" } : {})} />;
}
