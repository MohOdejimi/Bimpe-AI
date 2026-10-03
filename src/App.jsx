import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SetupPage from './pages/SetupPage.jsx';
import ScoutingPage from './pages/ScoutingPage.jsx';
import { DEFAULT_FORM, ROUTES } from './constants.js';

export default function App() {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const startScout = (event) => {
    event.preventDefault();
    navigate(ROUTES.scouting);
  };

  const backToSetup = () => navigate(ROUTES.setup);

  return (
    <div className="app-shell">
      <Header />

      <main className="page-main">
        <Routes>
          <Route
            path={ROUTES.setup}
            element={<SetupPage form={form} update={update} onSubmit={startScout} />}
          />
          <Route path={ROUTES.scouting} element={<ScoutingPage form={form} onBack={backToSetup} />} />
          <Route path="*" element={<Navigate to={ROUTES.setup} replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
