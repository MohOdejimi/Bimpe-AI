import {
  BrainCircuit,
  CheckCircle2,
  CircleDot,
  Gauge,
  Globe2,
  LockKeyhole,
  Phone,
  Rocket,
  Tag,
  Target,
  UserRound,
  Zap,
} from 'lucide-react';
import EngineTag from '../components/EngineTag.jsx';
import Field from '../components/Field.jsx';
import Switch from '../components/Switch.jsx';

export default function SetupPage({ form, update, onSubmit, loading, error }) {
  return (
    <section className="setup-stage">
      <EngineTag />

      <div className="setup-card">
        <div className="hero-logo">
          <div className="hero-logo-ring">
            <CircleDot size={38} strokeWidth={1.7} />
          </div>
        </div>

        <h1 className="hero-title">
          OJA <span>SCOUT</span>
        </h1>
        <p className="hero-subtitle">Find people who are already looking for what you sell.</p>

        <form onSubmit={onSubmit} className="scout-form">
          <Field
            icon={<Tag size={19} />}
            title="What do you sell?"
            helper="Core Offering"
            placeholder="e.g. Websites for restaurants"
            value={form.whatTheySell}
            onChange={(value) => update('whatTheySell', value)}
          />

          <Field
            icon={<Target size={19} />}
            title="Who are you looking for?"
            helper="Target Prospect & Geo"
            placeholder="e.g. Restaurants in Lagos"
            value={form.targetCustomer}
            onChange={(value) => update('targetCustomer', value)}
          />

          <div className="two-column">
            <Field
              icon={<UserRound size={19} />}
              title="Your name"
              placeholder="Your name"
              value={form.name}
              onChange={(value) => update('name', value)}
              compact
            />
            <Field
              icon={<Phone size={19} />}
              title="Your phone number"
              placeholder="+234 800 000 0000"
              value={form.phone}
              onChange={(value) => update('phone', value)}
              compact
              type="tel"
            />
          </div>

          <div className="intent-toggle-card">
            <div className="intent-icon-box">
              <BrainCircuit size={21} />
            </div>
            <div className="intent-copy">
              <div className="intent-title">High Buyer Propensity Only</div>
              <div className="intent-subtitle">Filters high-intent social posts &amp; registry updates</div>
            </div>
            <Switch
              checked={form.highIntentOnly}
              onChange={(value) => update('highIntentOnly', value)}
              label="Toggle high buyer propensity filter"
            />
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="start-button" disabled={loading}>
            <Rocket size={21} strokeWidth={2.2} />
            {loading ? 'STARTING...' : 'START SCOUT'}
          </button>
        </form>

        <div className="divider" />

        <div className="trust-row">
          <span>
            <Zap size={15} /> AI-powered intent detection
          </span>
          <span className="separator">•</span>
          <span>
            <Globe2 size={15} /> Real-time social &amp; web monitoring
          </span>
          <span className="separator">•</span>
          <span className="muted-trust">
            <LockKeyhole size={14} /> Privacy guaranteed
          </span>
        </div>
      </div>

      <div className="metric-row">
        <span>
          <CheckCircle2 size={17} /> 1,840+ verified restaurant signals in Lagos today
        </span>
        <span>
          <Gauge size={17} /> Avg. scout query time: 3.4s
        </span>
      </div>
    </section>
  );
}
