function FormRow({ type, name, value, onChange, labelText }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        className="form-input"
        name={name}
        onChange={onChange}
      />
    </div>
  );
}

export default FormRow;
