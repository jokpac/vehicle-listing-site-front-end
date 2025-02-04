function TextArea({ id, label, value, onChange, onBlur, required, error }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className={required ? 'required' : ''}>
        {label}
      </label>
      <textarea
        id={id}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={error ? 'error' : ''}
      ></textarea>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default TextArea;