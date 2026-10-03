import { useId } from 'react';

export default function Field({ icon, title, helper, value, onChange, placeholder, compact = false, type = 'text' }) {
  const id = useId();

  return (
    <label htmlFor={id} className={`field-wrap ${compact ? 'field-compact' : ''}`}>
      <span className="field-head">
        <span className="field-title-group">
          <span className="field-icon">{icon}</span>
          <span className="field-title">{title}</span>
        </span>
        {helper ? <span className="field-helper">{helper}</span> : null}
      </span>
      <input
        id={id}
        className="field-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      />
    </label>
  );
}
