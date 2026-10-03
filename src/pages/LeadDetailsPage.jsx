import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCheck,
  Copy,
  ExternalLink,
  Loader2,
  MessageSquareText,
} from 'lucide-react';
import { getLeadById, updateLeadStatus } from '../api';
import { IntentBadge } from './DashboardPage';

export default function LeadDetailsPage() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getLeadById(id)
      .then((data) => {
        if (!cancelled) {
          setLead(data);
          setError('');
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load lead');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const copyReply = async () => {
    if (!lead?.suggestedReply) return;
    try {
      await navigator.clipboard.writeText(lead.suggestedReply);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = lead.suggestedReply;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const markContacted = async () => {
    setUpdating(true);
    try {
      const updated = await updateLeadStatus(id, 'contacted');
      setLead(updated);
    } catch (err) {
      setError(err.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <section className="dashboard-stage">
        <div className="state-card">
          <Loader2 size={26} className="spin-icon" />
          <p>Loading opportunity…</p>
        </div>
      </section>
    );
  }

  if (error && !lead) {
    return (
      <section className="dashboard-stage">
        <div className="state-card error">
          <AlertCircle size={26} />
          <p>{error}</p>
          <Link className="back-link" to="/dashboard">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="detail-stage">
      <Link className="back-link" to="/dashboard">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="detail-card">
        <div className="lead-card-top">
          <IntentBadge intent={lead.intent} />
          <span className={`status-pill status-${lead.status || 'new'}`}>{lead.status || 'new'}</span>
        </div>

        <h1>{lead.service || 'Opportunity'}</h1>

        <div className="detail-facts">
          <Fact label="Urgency" value={lead.urgency || '—'} />
          <Fact label="Location" value={lead.location || '—'} />
          <Fact label="Source" value={lead.source || '—'} />
        </div>

        <div className="detail-block">
          <h3>Why Scout found this</h3>
          <p>{lead.reason || 'The post matches what your business sells.'}</p>
        </div>

        <div className="detail-block">
          <h3>Original post</h3>
          <p className="original-text">{lead.originalText || 'No original text available.'}</p>
          {lead.url ? (
            <a className="source-link" href={lead.url} target="_blank" rel="noreferrer">
              View Original Post <ExternalLink size={15} />
            </a>
          ) : null}
        </div>

        <div className="detail-block">
          <h3>Suggested response</h3>
          <div className="reply-box">
            <MessageSquareText size={18} />
            <p>{lead.suggestedReply || 'No suggested reply yet.'}</p>
          </div>
          <button type="button" className="copy-button" onClick={copyReply}>
            <Copy size={16} /> {copied ? 'Copied!' : 'Copy response'}
          </button>
        </div>

        <div className="detail-actions">
          <button
            type="button"
            className="contacted-button"
            disabled={lead.status === 'contacted' || updating}
            onClick={markContacted}
          >
            <CheckCheck size={18} />
            {lead.status === 'contacted' ? 'Marked as contacted' : updating ? 'Saving…' : 'Mark as contacted'}
          </button>
        </div>

        {error ? <p className="inline-error">{error}</p> : null}
      </div>
    </section>
  );
}

function Fact({ label, value }) {
  return (
    <div className="fact">
      <div className="fact-label">{label}</div>
      <div className="fact-value">{value}</div>
    </div>
  );
}
