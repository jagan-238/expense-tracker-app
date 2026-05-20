export const CATEGORIES = [
  { id: 'food',      label: 'Food',      emoji: '🍜', color: '#fb923c', bg: '#fff7ed' },
  { id: 'shopping',  label: 'Shopping',  emoji: '🛍️', color: '#a855f7', bg: '#faf5ff' },
  { id: 'travel',    label: 'Travel',    emoji: '✈️', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'bills',     label: 'Bills',     emoji: '🧾', color: '#ef4444', bg: '#fef2f2' },
  { id: 'health',    label: 'Health',    emoji: '💊', color: '#22c55e', bg: '#f0fdf4' },
  { id: 'leisure',   label: 'Leisure',   emoji: '🎮', color: '#ec4899', bg: '#fdf2f8' },
  { id: 'education', label: 'Education', emoji: '📚', color: '#f59e0b', bg: '#fffbeb' },
  { id: 'other',     label: 'Other',     emoji: '📦', color: '#64748b', bg: '#f8fafc' },
];

export function getCat(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[7];
}

/* UPDATED */

export function formatAmount(amount, type) {

  const prefix = type === 'income'
    ? '+'
    : '-';

  return `${prefix}$${Number(amount).toLocaleString(
    'en-US',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  )}`;
}

/* UPDATED */

export function formatBalance(amount) {

  if (amount < 0) {

    return `-$${Math.abs(amount).toLocaleString(
      'en-US',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )}`;
  }

  return `$${amount.toLocaleString(
    'en-US',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  )}`;
}

export function formatDateLabel(dateStr) {

  const d = new Date(dateStr);

  const today = new Date();

  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) {
    return 'Today';
  }

  if (d.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return d.toLocaleDateString(
    'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  );
}

export function groupByDate(transactions) {

  const groups = {};

  [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .forEach(t => {

      const label =
        formatDateLabel(t.date);

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(t);

    });

  return Object.entries(groups);
}

export function getMonthName(month, year) {

  return new Date(year, month)
    .toLocaleDateString(
      'en-US',
      {
        month: 'long',
        year: 'numeric'
      }
    );
}

/* UPDATED */

export function formatShort(amount) {

  if (amount >= 100000) {
    return `$${(amount / 100000).toFixed(1)}L`;
  }

  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }

  return `$${amount}`;
}