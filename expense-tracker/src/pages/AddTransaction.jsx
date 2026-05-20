import { useState, useEffect } from 'react';

import {
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';

import { useTransactions } from '../context/TransactionContext';

import CategoryIcon from '../components/CategoryIcon';

import { CATEGORIES } from '../utils/helpers';

import '../styles/AddTransaction.css';

export default function AddTransaction() {

  const nav = useNavigate();

  const { id } = useParams();

  const [params] = useSearchParams();

  const {
    transactions,
    add,
    edit,
    remove
  } = useTransactions();

  const isEdit = Boolean(id);

  const existing = isEdit
    ? transactions.find((t) => t.id === id)
    : null;

  const [type, setType] =
    useState(
      params.get('type') || 'expense'
    );

  const [amount, setAmount] =
    useState('');

  const [category, setCategory] =
    useState('food');

  const [date, setDate] =
    useState(
      new Date().toISOString().split('T')[0]
    );

  const [note, setNote] =
    useState('');

  const [title, setTitle] =
    useState('');

  useEffect(() => {

    if (existing) {

      setType(existing.type);

      setAmount(String(existing.amount));

      setCategory(existing.category);

      setDate(
        existing.date.split('T')[0]
      );

      setNote(existing.note || '');

      setTitle(existing.title || '');
    }

  }, [existing]);

  const handleSave = () => {

    if (
      !amount ||
      !title.trim() ||
      !note.trim()
    ) return;

    const txn = {

      type,

      amount:
        parseFloat(amount),

      category,

      date:
        new Date(date)
          .toISOString(),

      note,

      title:
        title.trim()
    };

    if (isEdit) {

      edit({
        ...existing,
        ...txn
      });

    } else {

      add(txn);
    }

    nav(-1);
  };

  const handleDelete = () => {

    if (
      window.confirm(
        'Delete this transaction?'
      )
    ) {

      remove(id);

      nav(-1);
    }
  };

  const handleAmountChange = (e) => {

    const value =
      e.target.value.replace(
        /[^0-9.]/g,
        ''
      );

    setAmount(value);
  };

  return (

    <div className="add-page">

      {/* HEADER */}

      <div className="add-header">

        <button
          className="back-btn"
          onClick={() => nav(-1)}
        >

          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>

        </button>

        <div className="add-header-title">

          {isEdit
            ? 'Edit Transaction'
            : 'Add Transaction'}

        </div>

        {isEdit ? (

          <button
            className="del-btn"
            onClick={handleDelete}
          >

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />

              <path d="M19 6l-1 14H6L5 6" />

              <path d="M10 11v6" />

              <path d="M14 11v6" />
            </svg>

          </button>

        ) : (

          <div style={{ width: 38 }} />

        )}

      </div>

      {/* TOGGLE */}

      <div className="type-toggle">

        <button
          className={`type-btn ${
            type === 'expense'
              ? 'active expense'
              : ''
          }`}
          onClick={() =>
            setType('expense')
          }
        >
          💸 EXPENSE
        </button>

        <button
          className={`type-btn ${
            type === 'income'
              ? 'active income'
              : ''
          }`}
          onClick={() =>
            setType('income')
          }
        >
          💰 INCOME
        </button>

      </div>

      {/* AMOUNT */}

      <div className="amount-section">

        <div className="amount-label">
          AMOUNT
        </div>

        <div className="amount-input-wrap">

          <span className="amount-currency">
            $
          </span>

          <input
            className="amount-input"
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
          />

        </div>

      </div>

      <div className="divider"></div>

      {/* CATEGORY */}

      <div className="cat-section">

        <div className="cat-section-label">
          CATEGORY
        </div>

        <div className="cat-grid">

          {CATEGORIES.map((c) => (

            <div
              key={c.id}
              className={`cat-grid-item ${
                category === c.id
                  ? 'selected'
                  : ''
              }`}
              onClick={() =>
                setCategory(c.id)
              }
            >

              <CategoryIcon
                catId={c.id}
                size={42}
              />

              <span className="cat-grid-label">
                {c.label.toUpperCase()}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* FIELDS */}

      <div className="fields-section">

        {/* TITLE */}

        <div className="field-group">

          <label className="field-label">
            TITLE
          </label>

          <input
            className="field-input"
            type="text"
            placeholder="Transaction title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

        </div>

        {/* DATE */}

        <div className="field-group">

          <label className="field-label">
            DATE
          </label>

          <input
            className="field-input"
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

        </div>

        {/* NOTE */}

        <div className="field-group">

          <label className="field-label">
            NOTE
          </label>

          <textarea
            className="field-input"
            placeholder="Add a description..."
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
          />

        </div>

      </div>

      {/* SAVE */}

      <div className="save-wrap">

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={
            !amount ||
            !title.trim() ||
            !note.trim()
          }
        >

          {isEdit
            ? 'Update Transaction'
            : 'Save Transaction'}

        </button>

      </div>

    </div>
  );
}