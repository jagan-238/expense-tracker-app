import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTransactions } from '../context/TransactionContext';

import TransactionRow from '../components/TransactionRow';

import '../styles/Transactions.css';

import profileImg from '../assets/profile.jpg';

const ALL_CATS = [
  { id: 'all', label: 'All', emoji: '●' },
  { id: 'food', label: 'Food', emoji: '🍔' },
  { id: 'transport', label: 'Transport', emoji: '🚕' },
  { id: 'bills', label: 'Bills', emoji: '📄' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'health', label: 'Health', emoji: '💊' }
];

export default function Transactions() {

  const nav = useNavigate();

  /* CONTEXT */

  const { transactions } =
    useTransactions();

  const [search, setSearch] =
    useState('');

  const [filter, setFilter] =
    useState('all');

  /* FILTER */

  const filtered =
    transactions.filter((t) => {

      const matchSearch =
        t.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        t.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      if (filter === 'all') {
        return matchSearch;
      }

      return (
        matchSearch &&
        t.category
          .toLowerCase()
          .includes(filter)
      );

    });

  /* GROUP BY DATE */

  const grouped = {};

  filtered
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .forEach((txn) => {

      const txnDate =
        new Date(txn.date);

      const today =
        new Date();

      const yesterday =
        new Date();

      yesterday.setDate(
        today.getDate() - 1
      );

      let label = txnDate
        .toLocaleDateString(
          'en-US',
          {
            month: 'long',
            day: 'numeric'
          }
        );

      if (
        txnDate.toDateString() ===
        today.toDateString()
      ) {
        label = 'Today';
      }

      else if (
        txnDate.toDateString() ===
        yesterday.toDateString()
      ) {
        label = 'Yesterday';
      }

      if (!grouped[label]) {
        grouped[label] = [];
      }

      grouped[label].push(txn);

    });

  return (

    <div className="page transactions-page">

      {/* HEADER */}

      <div className="txns-top">

        <div className="txns-navbar">

          <div className="txns-left">

            <div className="menu-icon">
              ☰
            </div>

            <div className="txns-brand">
              Financial Serenity
            </div>

          </div>

          <img
            src={profileImg}
            alt="profile"
            className="txns-avatar"
          />

        </div>

        {/* SEARCH */}

        <div className="search-wrap">

          <span className="search-icon">

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />

              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
            </svg>

          </span>

          <input
            className="search-input"
            placeholder="Search transactions"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* FILTERS */}

      <div className="filter-scroll">

        {ALL_CATS.map((c) => (

          <button
            key={c.id}
            className={`filter-chip ${
              filter === c.id
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setFilter(c.id)
            }
          >

            <span>{c.emoji}</span>

            {c.label}

          </button>

        ))}

      </div>

      {/* TRANSACTION LIST */}

      <div className="txns-groups">

        {Object.entries(grouped)
          .length === 0 ? (

          <div className="empty-state">

            <div className="e-icon">
              🔍
            </div>

            <div className="e-title">
              No transactions found
            </div>

            <div className="e-sub">
              Try another search
            </div>

          </div>

        ) : (

          Object.entries(grouped)
            .map(([label, txns]) => (

              <div
                key={label}
                className="date-group"
              >

                <div className="date-group-label">
                  {label}
                </div>

                <div className="date-group-list">

                  {txns.map((t) => (

                    <TransactionRow
                      key={t.id}
                      txn={t}
                      onClick={() =>
                        nav(
                          `/edit/${t.id}`
                        )
                      }
                    />

                  ))}

                </div>

              </div>

            ))

        )}

      </div>

    </div>

  );
}