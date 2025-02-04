function TextInput({ id, label, type = 'text', value, onChange, onBlur, required, error, allowDecimals = false }) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (type === 'number' && newValue !== '') {
      // Use different regex based on whether decimals are allowed
      const regex = allowDecimals ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
      
      if (!regex.test(newValue)) {
        // If invalid number, don't update
        return;
      }
      
      // For decimal numbers, don't allow multiple decimal points
      if (allowDecimals && (newValue.match(/\./g) || []).length > 1) {
        return;
      }
    }
    
    // Call the original onChange with the event
    onChange(e);
  };

  return (
    <div className="form-group">
      <label htmlFor={id} className={required ? 'required' : ''}>
        {label}
      </label>
      <input
        id={id}
        type={type === 'number' ? 'text' : type}
        value={value || ''}
        onChange={handleChange}
        onBlur={onBlur}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default TextInput;