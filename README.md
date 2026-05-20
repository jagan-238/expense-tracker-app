# Expense Tracker App

A modern mobile-first Expense Tracker App built with React and Plain CSS.

The app helps users manage income and expenses with beautiful analytics, transaction tracking, category filters, charts, and real-time balance updates.

---

# Live Features

- Dashboard with balance overview
- Income & Expense tracking
- Add / Edit / Delete transactions
- Category based expense management
- Analytics with Pie Chart & Bar Chart
- Search & filter transactions
- Transactions grouped by date
- localStorage persistence
- Mobile-first responsive UI
- Real-time calculations

---

# Tech Stack

- React
- React Router DOM
- Context API
- useReducer
- Plain CSS
- Recharts

---

# Folder Structure

```text
src/
│
├── assets/
├── components/
├── context/
├── pages/
├── styles/
├── utils/
├── App.jsx
├── main.jsx
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <your-github-repo-link>
```

---

## 2. Navigate Into Project

```bash
cd expense-tracker-app
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start Development Server

```bash
npm run dev
```

---

## 5. Open Browser

```text
http://localhost:5173
```

---

# Main Features

## Dashboard

- Total Balance
- Income & Expense cards
- Spend Analytics section
- Recent activity transactions
- Dynamic real-time updates

---

## Transactions

- Search transactions
- Filter by categories
- Date grouped transactions
- Responsive transaction cards

---

## Add Transaction

- Add income or expense
- Edit transaction
- Delete transaction
- Category selection
- Validation
- Notes support

---

## Analytics

- Dynamic pie chart
- Category spending breakdown
- Percentage calculations
- 6-month trend graph
- Real-time updates from transactions

---

# State Management

The application uses:

- Context API
- useReducer

This allows all pages to share the same transaction data globally.

Whenever a transaction is:
- added
- edited
- deleted

all pages automatically update instantly.

---

# localStorage

All transactions are stored inside localStorage.

This keeps data saved even after page refresh.

---

# Key Decisions Made

## 1. Context API + useReducer

Used for centralized global state management.

### Reason

- Easier data sharing
- Cleaner structure
- Avoids prop drilling

---

## 2. Plain CSS

Used plain CSS instead of UI libraries.

### Reason

- Assignment requirement
- Better control over pixel-perfect UI
- Improved CSS practice

---

## 3. Reusable Components

Created reusable components like:

- TransactionRow
- CategoryIcon
- BottomNav

### Reason

- Cleaner code
- Reusable UI
- Easier maintenance

---

## 4. Dynamic Analytics

Analytics calculations are fully dynamic.

Charts update automatically whenever transaction data changes.

---

# Challenges Faced

- Managing realtime balance updates
- Dynamic analytics calculations
- Grouping transactions by date
- Maintaining responsive layout
- Matching Figma design accurately

---

# What I Would Improve With More Time

- Dark mode support
- Better animations & transitions
- Swipe gestures for mobile
- Export transactions feature
- Advanced analytics filters
- Budget goals & alerts
- Authentication
- Cloud database integration

---

# Responsive Design

The app is designed mobile-first using 375px base width and also supports larger tablet screens.

---

# Author

Jagan Mohan Reddy
