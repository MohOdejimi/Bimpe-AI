import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LeadDetailsPage from './pages/LeadDetailsPage';
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  CircleDot,
  Gauge,
  Globe2,
  KeyRound,
  LockKeyhole,
  Rocket,
  Search,
  Sparkles,
  Tag,
  Target,
  UserRound,
  Phone,
  Zap,
} from 'lucide-react';
import './styles.css';

const DEFAULT_FORM = {
  whatTheySell: 'Websites for restaurants',
  targetCustomer: 'Restaurants in Lagos',
  name: 'Chizu',
  phone: '+234 812 345 6789',
  highIntentOnly: true,
};

function App() {
  return (
    <BrowserRouter>
      <SalesScoutApp />
    </BrowserRouter>
  );
}

function SalesScoutApp() {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [scouting, setScouting] = useState(false);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const startScout = (event) => {
    event.preventDefault();
    setScouting(true);
    navigate('/scouting');
  };

  const resetScout = () => {
    setScouting(false);
    navigate('/');
  };

  return (
    <div className="app-shell">
      <Header />

      <main className="page-main">
        <Routes>
          <Route
            path="/"
            element={<SetupPage form={form} update={update} onSubmit={startScout} />}
          />
          <Route
            path="/scouting"
            element={
              <ScoutingPage
                form={form}
                onBack={resetScout}
                onViewOpportunities={() => {
                  setScouting(false);
                  navigate('/dashboard');
                }}
              />
            }
          />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/leads/:id" element={<LeadDetailsPage />} />
          <Route
            path="*"
            element={<SetupPage form={form} update={update} onSubmit={startScout} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  const location = useLocation();
  const active =
    location.pathname === '/scouting'
      ? 'Live Scouting'
      : location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/leads')
        ? 'Pipeline'
        : 'Scout Setup';

  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-mark">
          <Search size={25} strokeWidth={2.5} />
          <span className="brand-dot" />
        </div>
        <div className="brand-name">AI Sales Scout</div>
        <div className="engine-pill">
          <span className="engine-dot" />
          Active Scout Engine
        </div>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        <NavItem to="/" label="Overview" active={active === 'Scout Setup'} />
        <NavItem to="/scouting" label="Live Scouting" active={active === 'Live Scouting'} />
        <NavItem to="/" label="Scout Setup" active={false} />
        <NavItem to="/dashboard" label="Pipeline" active={active === 'Pipeline'} />
      </nav>

      <button className="profile-button" aria-label="Profile">
        <UserRound size={18} strokeWidth={2.2} />
      </button>
    </header>
  );
}

function NavItem({ to, label, active }) {
  return (
    <Link className={`nav-item ${active ? 'nav-item-active' : ''}`} to={to}>
      {label}
    </Link>
  );
}

function SetupPage({ form, update, onSubmit }) {
  return (
    <section className="setup-stage">
      <div className="engine-tag">
        <span className="engine-dot" />
        AUTONOMOUS INTENT ENGINE V4.2
      </div>

      <div className="setup-card">
        <div className="hero-logo">
          <div className="hero-logo-ring">
            <CircleDot size={38} strokeWidth={1.7} />
          </div>
        </div>

        <h1 className="hero-title">
          AI SALES <span>SCOUT</span>
        </h1>
        <p className="hero-subtitle">Find people who are already looking for what you sell.</p>

        <form onSubmit={onSubmit} className="scout-form">
          <Field
            icon={<Tag size={19} />}
            title="What do you sell?"
            helper="Core Offering"
            value={form.whatTheySell}
            onChange={(value) => update('whatTheySell', value)}
          />

          <Field
            icon={<Target size={19} />}
            title="Who are you looking for?"
            helper="Target Prospect & Geo"
            value={form.targetCustomer}
            onChange={(value) => update('targetCustomer', value)}
          />

          <div className="two-column">
            <Field
              icon={<UserRound size={19} />}
              title="Your name"
              value={form.name}
              onChange={(value) => update('name', value)}
              compact
            />
            <Field
              icon={<Phone size={19} />}
              title="Your phone number"
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
            <button
              type="button"
              className={`switch ${form.highIntentOnly ? 'switch-on' : ''}`}
              onClick={() => update('highIntentOnly', !form.highIntentOnly)}
              aria-label="Toggle high buyer propensity filter"
              aria-pressed={form.highIntentOnly}
            >
              <span />
            </button>
          </div>

          <button type="submit" className="start-button">
            <Rocket size={21} strokeWidth={2.2} />
            START SCOUT
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

function Field({ icon, title, helper, value, onChange, compact = false, type = 'text' }) {
  return (
    <label className={`field-wrap ${compact ? 'field-compact' : ''}`}>
      <span className="field-head">
        <span className="field-title-group">
          <span className="field-icon">{icon}</span>
          <span className="field-title">{title}</span>
        </span>
        {helper ? <span className="field-helper">{helper}</span> : null}
      </span>
      <input
        className="field-input"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      />
    </label>
  );
}

function ScoutingPage({ form, onBack, onViewOpportunities }) {
  return (
    <section className="scouting-stage">
      <div className="engine-tag">
        <span className="engine-dot" />
        AUTONOMOUS INTENT ENGINE V4.2
      </div>

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
        <p>Scout is scanning public signals and understanding buyer intent.</p>

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

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>AI Sales Scout</strong> © 2025 Intelligence Systems Inc.
      </div>
      <div className="footer-right">
        <span>Scout Criteria</span>
        <span>Live Stream</span>
        <span className="engine-ready">
          <Zap size={14} /> Engine Ready
        </span>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
