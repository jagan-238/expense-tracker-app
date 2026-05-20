import { createContext, useContext, useReducer, useEffect } from 'react';

const Ctx = createContext();

const now = new Date();
const yest = new Date(now); yest.setDate(now.getDate() - 1);
const d2 = new Date(now); d2.setDate(now.getDate() - 2);
const d3 = new Date(now); d3.setDate(now.getDate() - 3);
const d5 = new Date(now); d5.setDate(now.getDate() - 5);

const SEED = [
  { id: '1', type: 'income',  category: 'other',     title: 'Monthly Salary',    amount: 85000, date: now.toISOString(),   note: 'June salary credit' },
  { id: '2', type: 'expense', category: 'food',      title: 'Morning Coffee',     amount: 180,   date: now.toISOString(),   note: 'Starbucks latte' },
  { id: '3', type: 'expense', category: 'travel',    title: 'Uber Ride',          amount: 320,   date: now.toISOString(),   note: 'Office commute' },
  { id: '4', type: 'expense', category: 'food',      title: 'Lunch with team',    amount: 780,   date: yest.toISOString(),  note: '' },
  { id: '5', type: 'expense', category: 'shopping',  title: 'Amazon Order',       amount: 2450,  date: yest.toISOString(),  note: 'Keyboard and mouse' },
  { id: '6', type: 'income',  category: 'other',     title: 'Freelance Project',  amount: 12000, date: yest.toISOString(),  note: 'UI design project' },
  { id: '7', type: 'expense', category: 'bills',     title: 'Electricity Bill',   amount: 1240,  date: d2.toISOString(),    note: '' },
  { id: '8', type: 'expense', category: 'health',    title: 'Pharmacy',           amount: 560,   date: d2.toISOString(),    note: 'Monthly vitamins' },
  { id: '9', type: 'expense', category: 'leisure',   title: 'Netflix Premium',    amount: 649,   date: d3.toISOString(),    note: '' },
  { id:'10', type: 'expense', category: 'education', title: 'Udemy Course',       amount: 399,   date: d5.toISOString(),    note: 'React advanced patterns' },
];

function load() {
  try {
    const s = localStorage.getItem('xpns_v2');
    if (s) return JSON.parse(s);
  } catch {}
  return SEED;
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':    return [{ ...action.p, id: Date.now().toString() }, ...state];
    case 'EDIT':   return state.map(t => t.id === action.p.id ? action.p : t);
    case 'DELETE': return state.filter(t => t.id !== action.p);
    default: return state;
  }
}

export function TransactionProvider({ children }) {
  const [transactions, dispatch] = useReducer(reducer, [], load);

  useEffect(() => {
    localStorage.setItem('xpns_v2', JSON.stringify(transactions));
  }, [transactions]);

  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <Ctx.Provider value={{
      transactions,
      totalIncome, totalExpense, balance,
      add:    (p) => dispatch({ type: 'ADD',    p }),
      edit:   (p) => dispatch({ type: 'EDIT',   p }),
      remove: (p) => dispatch({ type: 'DELETE', p }),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTransactions = () => useContext(Ctx);
