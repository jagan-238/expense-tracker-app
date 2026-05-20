import { useNavigate, useLocation } from 'react-router-dom';

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

export default function BottomNav() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav">
      <button className={`nav-item ${pathname === '/' ? 'active' : ''}`} onClick={() => nav('/')}>
        <HomeIcon /><span className="nav-label">Home</span>
      </button>
      <button className={`nav-item ${pathname === '/transactions' ? 'active' : ''}`} onClick={() => nav('/transactions')}>
        <ListIcon /><span className="nav-label">Txns</span>
      </button>
      <button className="nav-item nav-add" onClick={() => nav('/add')}>
        <PlusIcon />
      </button>
      <button className={`nav-item ${pathname === '/analytics' ? 'active' : ''}`} onClick={() => nav('/analytics')}>
        <ChartIcon /><span className="nav-label">Stats</span>
      </button>
      <button className={`nav-item ${pathname === '/profile' ? 'active' : ''}`} onClick={() => {}}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <span className="nav-label">Profile</span>
      </button>
    </nav>
  );
}
