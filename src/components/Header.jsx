import { Search, UserRound } from 'lucide-react';
import NavItem from './NavItem.jsx';
import { BRAND_NAME, ROUTES } from '../constants.js';

export default function Header() {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-mark">
          <Search size={25} strokeWidth={2.5} />
          <span className="brand-dot" />
        </div>
        <div className="brand-name">{BRAND_NAME}</div>
        <div className="engine-pill">
          <span className="engine-dot" />
          Active Scout Engine
        </div>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        <NavItem to={ROUTES.setup} label="Scout Setup" />
        <NavItem to={ROUTES.scouting} label="Live Scouting" />
      </nav>

      <button type="button" className="profile-button" aria-label="Profile">
        <UserRound size={18} strokeWidth={2.2} />
      </button>
    </header>
  );
}
