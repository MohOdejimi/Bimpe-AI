import { ENGINE_LABEL } from '../constants.js';

export default function EngineTag() {
  return (
    <div className="engine-tag">
      <span className="engine-dot" />
      {ENGINE_LABEL}
    </div>
  );
}
