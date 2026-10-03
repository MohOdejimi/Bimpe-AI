import { Activity, Rocket, Sparkles } from 'lucide-react';
import EngineTag from '../components/EngineTag.jsx';

export default function ScoutingPage({ form, onBack, onViewOpportunities }) {
  return (
    <section className="scouting-stage">
      <EngineTag />

      <div className="scouting-card">
        <div className="scout-orbit">
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="scout-core">
            <Sparkles size={38} />
          </div>
        </div>

        <div className="scouting-kicker">SCOUT IN PROGRESS</div>
        <h1>Finding opportunities for {form.name || 'your business'}.</h1>
        <p>Oja is scanning public signals and understanding buyer intent.</p>

        <div className="progress-panel">
          <div className="progress-line">
            <span className="progress-dot done" />
            <span>Looking for potential customers…</span>
          </div>
          <div className="progress-line">
            <span className="progress-dot done" />
            <span>Understanding opportunities…</span>
          </div>
          <div className="progress-line active">
            <Activity size={17} />
            <span>Finding people who need what you sell.</span>
          </div>
        </div>

        <div className="found-card">
          <div className="found-number">2</div>
          <div>
            <div className="found-label">OPPORTUNITIES FOUND</div>
            <div className="found-copy">High-intent signals are being prepared for the dashboard.</div>
          </div>
        </div>

        <div className="scouting-actions">
          <button type="button" className="secondary-button" onClick={onBack}>
            Back to Setup
          </button>
          <button type="button" className="start-button" onClick={onViewOpportunities}>
            <Rocket size={20} />
            View Opportunities
          </button>
        </div>
      </div>
    </section>
  );
}
