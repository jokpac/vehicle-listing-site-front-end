import React from 'react';

function TextInput({ id, label, type = 'text', value, onChange, required }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default TextInput;