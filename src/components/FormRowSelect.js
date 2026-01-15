const FormRowSelect = ({ labelText, name, onChange, value, options }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        className="form-input"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        {options.map((type, index) => {
          return (
            <option key={index} value={type}>
              {type}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
