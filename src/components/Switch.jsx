export default function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      className={`switch ${checked ? 'switch-on' : ''}`}
      onClick={() => onChange(!checked)}
      aria-label={label}
      aria-checked={checked}
    >
      <span />
    </button>
  );
}
