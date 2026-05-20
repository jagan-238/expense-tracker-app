import { useNavigate } from 'react-router-dom';

import { useTransactions } from '../context/TransactionContext';

import TransactionRow from '../components/TransactionRow';

import {
  formatBalance
} from '../utils/helpers';

import '../styles/Dashboard.css';

import profileImg from '../assets/profile.jpg';

const BAR_HEIGHTS = [40, 65, 50, 80, 60, 90, 70];

export default function Dashboard() {

  const nav = useNavigate();

  /* CONTEXT DATA */

  const {
    transactions,
    totalIncome,
    totalExpense,
    balance
  } = useTransactions();

  /* RECENT TRANSACTIONS */

  const recent = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 4);

  return (

    <div className="page dashboard">

      {/* HEADER */}

      <div className="dash-header">

        <div className="dash-left">

          <div className="menu-icon">
            ☰
          </div>

          <div className="dash-title">
            Financial Serenity
          </div>

        </div>

        <img
          src={profileImg}
          alt="profile"
          className="dash-avatar"
        />

      </div>

      {/* BALANCE */}

      <div className="balance-card">

        <div className="balance-label">
          TOTAL BALANCE
        </div>

        <div className="balance-amount">
          {formatBalance(balance)}
        </div>

        <div className="balance-sub">
          +2.4% this month
        </div>

      </div>

      {/* INCOME / EXPENSE */}

      <div className="balance-row">

        <div className="balance-stat">

          <div className="bstat-row">

            <div className="bstat-dot income"></div>

            <span className="bstat-type">
              INCOME
            </span>

          </div>

          <div className="bstat-val">
            ${totalIncome.toLocaleString(
              'en-US'
            )}
          </div>

        </div>

        <div className="balance-stat">

          <div className="bstat-row">

            <div className="bstat-dot expense"></div>

            <span className="bstat-type">
              EXPENSES
            </span>

          </div>

          <div className="bstat-val">
            ${totalExpense.toLocaleString(
              'en-US'
            )}
          </div>

        </div>

      </div>

      {/* ANALYTICS */}

      <div
        className="analytics-banner"
        onClick={() => nav('/analytics')}
      >

        <div className="ab-label">
          Spend Analytics
        </div>

        <div className="ab-title">
          You spent 12% less on dining this week.
        </div>

        <div className="ab-bars">

          {BAR_HEIGHTS.map((h, i) => (

            <div
              key={i}
              className={`ab-bar ${
                i === 5
                  ? 'active'
                  : ''
              }`}
              style={{
                height: `${h}%`
              }}
            />

          ))}

        </div>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="recent-section">

        <div className="section-head">

          <span className="section-title">
            Recent Activity
          </span>

          <span
            className="section-link"
            onClick={() =>
              nav('/transactions')
            }
          >
            VIEW ALL
          </span>

        </div>

        {recent.length === 0 ? (

          <div className="empty-state">

            <div className="e-icon">
              💸
            </div>

            <div className="e-title">
              No transactions yet
            </div>

            <div className="e-sub">
              Add your first transaction
            </div>

          </div>

        ) : (

          <div className="recent-list">

            {recent.map((t) => (

              <TransactionRow
                key={t.id}
                txn={t}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}