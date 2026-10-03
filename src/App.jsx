import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SetupPage from './pages/SetupPage.jsx';
import ScoutingPage from './pages/ScoutingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LeadDetailsPage from './pages/LeadDetailsPage.jsx';
import { startScout as startScoutRequest } from './api/scout.js';
import { DEFAULT_FORM, ROUTES } from './constants.js';

export default function App() {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const startScout = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await startScoutRequest(form);
      navigate(ROUTES.scouting);
    } catch (err) {
      setError('Could not start the scout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const backToSetup = () => navigate(ROUTES.setup);

  return (
    <div className="app-shell">
      <Header />

      <main className="page-main">
        <Routes>
          <Route
            path={ROUTES.setup}
            element={
              <SetupPage
                form={form}
                update={update}
                onSubmit={startScout}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path={ROUTES.scouting}
            element={
              <ScoutingPage
                form={form}
                onBack={backToSetup}
                onViewOpportunities={() => navigate(ROUTES.dashboard)}
              />
            }
          />
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.leadDetails} element={<LeadDetailsPage />} />
          <Route path="*" element={<Navigate to={ROUTES.setup} replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
