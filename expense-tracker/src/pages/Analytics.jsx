import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

import { useState } from 'react';

import { useTransactions } from '../context/TransactionContext';

import profileImg from '../assets/profile.jpg';

import '../styles/Analytics.css';

const RCOLORS = [
  '#ef4444',
  '#22c55e',
  '#f59e0b',
  '#3b82f6',
  '#ec4899',
  '#eab308',
  '#8b5cf6'
];

export default function Analytics() {

  const { transactions } =
    useTransactions();

  const [monthOffset] =
    useState(0);

  const currentDate =
    new Date();

  currentDate.setMonth(
    currentDate.getMonth() -
    monthOffset
  );

  const currentMonth =
    currentDate.getMonth();

  const currentYear =
    currentDate.getFullYear();

  /* CURRENT MONTH EXPENSES */

  const currentMonthTxns =
    transactions.filter((t) => {

      const d =
        new Date(t.date);

      return (
        t.type === 'expense' &&
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );

    });

  /* TOTAL EXPENSE */

  const totalExpense =
    currentMonthTxns.reduce(
      (sum, t) =>
        sum + Number(t.amount),
      0
    );

  /* CATEGORY TOTALS */

  const categories = {

    food: 'Food & Dining',

    travel: 'Transportation',

    shopping: 'Lifestyle & Misc',

    bills: 'Housing',

    health: 'Health',

    leisure: 'Leisure',

    education: 'Education',

    other: 'Other'
  };

  const catData =
    Object.keys(categories)
      .map((key) => {

        const total =
          currentMonthTxns
            .filter(
              (t) =>
                t.category === key
            )
            .reduce(
              (sum, t) =>
                sum +
                Number(t.amount),
              0
            );

        return {
          id: key,
          label:
            categories[key],
          amount: total
        };

      })
      .filter(
        (c) => c.amount > 0
      );

  /* TOP CATEGORY % */

  const maxCat =
    catData.reduce(
      (max, c) =>
        c.amount > max.amount
          ? c
          : max,
      { amount: 0 }
    );

  const centerPct =
    totalExpense > 0
      ? Math.round(
          (maxCat.amount /
            totalExpense) *
            100
        )
      : 0;

  /* MONTH COMPARISON */

  const prevMonth =
    new Date();

  prevMonth.setMonth(
    prevMonth.getMonth() - 1
  );

  const prevExpense =
    transactions
      .filter((t) => {

        const d =
          new Date(t.date);

        return (
          t.type === 'expense' &&
          d.getMonth() ===
            prevMonth.getMonth() &&
          d.getFullYear() ===
            prevMonth.getFullYear()
        );

      })
      .reduce(
        (sum, t) =>
          sum + Number(t.amount),
        0
      );

  const diffPct =
    prevExpense > 0
      ? Math.round(
          Math.abs(
            ((totalExpense -
              prevExpense) /
              prevExpense) *
              100
          )
        )
      : 0;

  const compareText =
    totalExpense <= prevExpense
      ? `${diffPct}% less than last month`
      : `${diffPct}% more than last month`;

  /* 6 MONTH TREND */

  const trendData = [];

  for (let i = 5; i >= 0; i--) {

    const d =
      new Date();

    d.setMonth(
      d.getMonth() - i
    );

    const month =
      d.toLocaleDateString(
        'en-US',
        {
          month: 'short'
        }
      ).toUpperCase();

    const amount =
      transactions
        .filter((t) => {

          const td =
            new Date(t.date);

          return (
            t.type ===
              'expense' &&
            td.getMonth() ===
              d.getMonth() &&
            td.getFullYear() ===
              d.getFullYear()
          );

        })
        .reduce(
          (sum, t) =>
            sum +
            Number(t.amount),
          0
        );

    trendData.push({
      name: month,
      expense: amount
    });

  }

  return (

    <div className="page analytics-page">

      {/* HEADER */}

      <div className="analytics-header">

        <div className="analytics-left">

          <div className="menu-icon">
            ☰
          </div>

          <div className="analytics-title">
            Financial Serenity
          </div>

        </div>

        <img
          src={profileImg}
          alt="profile"
          className="txns-avatar"
        />

      </div>

      {/* PERIOD */}

      <div className="month-nav">

        <div className="current-period">
          CURRENT PERIOD
        </div>

        <div className="month-name">

          {currentDate.toLocaleDateString(
            'en-US',
            {
              month: 'long',
              year: 'numeric'
            }
          )}

        </div>

      </div>

      {/* EXPENSE CARD */}

      <div className="exp-card">

        <div className="exp-card-left">

          <div className="exp-card-label">
            TOTAL EXPENDITURE
          </div>

          <div className="exp-card-amount">

            ${totalExpense.toLocaleString(
              'en-US',
              {
                minimumFractionDigits: 2
              }
            )}

          </div>

          <div className="exp-card-sub">
            {compareText}
          </div>

        </div>

        <div className="exp-card-badge">
          {centerPct}%
        </div>

      </div>

      {/* PIE CHART */}

      <div className="chart-section">

        <div className="chart-card">

          <div className="chart-card-title">
            SPENDING BREAKDOWN
          </div>

          <ResponsiveContainer
            width="100%"
            height={220}
          >

            <PieChart>

              <Pie
                data={catData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="amount"
              >

                {catData.map(
                  (entry, i) => (

                    <Cell
                      key={entry.id}
                      fill={
                        RCOLORS[
                          i %
                          RCOLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="pie-center-text"
              >
                {centerPct}%
              </text>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* CATEGORY BREAKDOWN */}

      <div className="cat-breakdown">

        <div className="cat-breakdown-list">

          {catData.map((c, i) => {

            const pct =
              totalExpense > 0
                ? Math.round(
                    (c.amount /
                      totalExpense) *
                      100
                  )
                : 0;

            return (

              <div
                key={c.id}
                className="cat-breakdown-row"
              >

                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background:
                      RCOLORS[i]
                  }}
                />

                <div className="cbd-info">

                  <div className="cbd-name">
                    {c.label}
                  </div>

                  <div className="cbd-bar-wrap">

                    <div
                      className="cbd-bar"
                      style={{
                        width: `${pct}%`,
                        background:
                          RCOLORS[i]
                      }}
                    />

                  </div>

                </div>

                <div className="cbd-right">

                  <div className="cbd-amount">

                    ${c.amount.toLocaleString(
                      'en-US',
                      {
                        minimumFractionDigits: 2
                      }
                    )}

                  </div>

                  <div className="cbd-pct">
                    {pct}%
                  </div>

                </div>

              </div>

            );

          })}

        </div>

        <button className="report-btn">
          VIEW DETAILED REPORT
        </button>

      </div>

      {/* TREND */}

      <div className="trend-section">

        <div className="trend-card">

          <div className="chart-card-title">
            6-MONTH TREND
          </div>

          <ResponsiveContainer
            width="100%"
            height={180}
          >

            <BarChart
              data={trendData}
              barSize={18}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11
                }}
              />

              <YAxis hide />

              <Tooltip />

              <Bar
                dataKey="expense"
                fill="#3b82f6"
                radius={[6,6,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}