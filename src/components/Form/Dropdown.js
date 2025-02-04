function Dropdown({ id, label, value, onChange, onBlur, options = [], disabled, placeholder, required, error }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className={required ? 'required' : ''}>
        {label}
      </label>
      <select
        id={id}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={error ? 'error' : ''}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default Dropdown;