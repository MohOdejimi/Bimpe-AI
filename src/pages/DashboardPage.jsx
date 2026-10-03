import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowUpRight, Flame, Inbox, Loader2, Target, Timer } from 'lucide-react';
import { getLeads, timeAgo } from '../api/leads.js';

export default function DashboardPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getLeads()
      .then((data) => {
        if (!cancelled) {
          setLeads(Array.isArray(data) ? data : []);
          setError('');
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load opportunities');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const highCount = leads.filter((lead) => lead.intent === 'high').length;
  const mediumCount = leads.filter((lead) => lead.intent === 'medium').length;

  return (
    <section className="dashboard-stage">
      <div className="engine-tag">
        <span className="engine-dot" />
        SCOUT RESULTS
      </div>

      <div className="dashboard-head">
        <h1>Opportunities found by Scout</h1>
        <p>People who are already looking for what you sell.</p>
      </div>

      <div className="stat-row">
        <StatCard icon={<Inbox size={20} />} label="Total Opportunities" value={leads.length} />
        <StatCard icon={<Flame size={20} />} label="High Intent" value={highCount} accent="high" />
        <StatCard icon={<Target size={20} />} label="Medium Intent" value={mediumCount} accent="medium" />
      </div>

      {loading ? (
        <div className="state-card">
          <Loader2 size={26} className="spin-icon" />
          <p>Loading opportunities…</p>
        </div>
      ) : error ? (
        <div className="state-card error">
          <AlertCircle size={26} />
          <p>{error}</p>
          <span>Make sure the backend is running on port 5000.</span>
        </div>
      ) : leads.length === 0 ? (
        <div className="state-card">
          <Inbox size={26} />
          <p>No opportunities yet.</p>
          <span>Start a scout run to discover leads.</span>
        </div>
      ) : (
        <div className="lead-grid">
          {leads.map((lead) => (
            <article className="lead-card" key={lead._id}>
              <div className="lead-card-top">
                <IntentBadge intent={lead.intent} />
                <span className={`status-pill status-${lead.status || 'new'}`}>{lead.status || 'new'}</span>
              </div>
              <h2>{lead.service || 'Opportunity'}</h2>
              <p className="lead-summary">
                {lead.reason || lead.originalText || 'Scout found a matching public post.'}
              </p>
              <div className="lead-meta">
                <span>{lead.source || 'Web'}</span>
                <span className="meta-dot">•</span>
                <span>
                  <Timer size={14} /> {timeAgo(lead.createdAt)}
                </span>
                {lead.location ? (
                  <>
                    <span className="meta-dot">•</span>
                    <span>{lead.location}</span>
                  </>
                ) : null}
              </div>
              <Link className="view-button" to={`/leads/${lead._id}`}>
                View Opportunity <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function StatCard({ icon, label, value, accent }) {
  return (
    <div className={`stat-card ${accent ? `stat-${accent}` : ''}`}>
      <div className="stat-icon">{icon}</div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

export function IntentBadge({ intent }) {
  const level = (intent || 'medium').toLowerCase();
  return <span className={`intent-badge intent-${level}`}>{level} INTENT</span>;
}
