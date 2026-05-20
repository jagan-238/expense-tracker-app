export default function CategoryIcon({ catId }) {

  const icons = {

    /* DASHBOARD */

    technology: '💻',
    income: '💰',
    dining: '☕',
    travel: '✈️',

    /* TRANSACTIONS */

    groceries: '🛍️',
    transport: '🚖',
    bills: '🧾',
    shopping: '🛒',
    health: '🏋️',
    food: '🍔',
    'food & drink': '☕',

    /* ADD TRANSACTION */

    rent: '🏠',
    leisure: '🎮',
    other: '📦',
    education: '📚'

  };

  return (

    <div className="txn-icon">

      {icons[String(catId).toLowerCase()] || '📦'}

    </div>

  );
}