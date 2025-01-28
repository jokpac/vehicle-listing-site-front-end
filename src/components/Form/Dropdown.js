function Dropdown({ label, value, onChange, options, disabled, placeholder }) {

  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
