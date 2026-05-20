import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Analytics from './pages/Analytics';
import './styles/global.css';

function AppInner() {
  const { pathname } = useLocation();
  const hideNav = pathname.startsWith('/add') || pathname.startsWith('/edit');
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/edit/:id" element={<AddTransaction />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TransactionProvider>
        <AppInner />
      </TransactionProvider>
    </BrowserRouter>
  );
}
