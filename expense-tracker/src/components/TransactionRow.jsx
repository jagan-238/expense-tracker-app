import CategoryIcon from './CategoryIcon';
import { getCat, formatAmount } from '../utils/helpers';

export default function TransactionRow({ txn, onClick }) {
  const cat = getCat(txn.category);
  return (
    <div className="txn-row" onClick={() => onClick && onClick(txn)}>
      <CategoryIcon catId={txn.category} />
      <div className="txn-info">
        <div className="txn-title">{txn.title}</div>
        <div className="txn-sub">{cat.label}</div>
      </div>
      <div className={`txn-amount ${txn.type}`}>
        {formatAmount(txn.amount, txn.type)}
      </div>
    </div>
  );
}

