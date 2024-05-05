import "./formElements.css";

export function FormSelect({ name, value, onChange, options }) {
  return (
    <select name={name} value={value} onChange={onChange}>
      {Object.entries(options).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  );
}
