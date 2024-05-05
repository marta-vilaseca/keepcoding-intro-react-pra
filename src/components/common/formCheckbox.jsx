export function FormCheckbox({ id, labelText, name, value, checked, onChange }) {
  return (
    <label key={id} htmlFor={id}>
      <input type="checkbox" id={id} name={name} value={value} checked={checked} onChange={onChange} />
      <span>{labelText}</span>
    </label>
  );
}
