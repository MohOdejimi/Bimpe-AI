import { NavLink } from 'react-router-dom';

export default function NavItem({ to, label }) {
  return (
    <NavLink to={to} end className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
      {label}
    </NavLink>
  );
}
