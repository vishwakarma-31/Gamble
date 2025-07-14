import BetHistory from '../components/BetHistory';
import { getTokenFromLocalStorage } from '../utils/auth';

const BetHistoryPage = () => {
  const token = getTokenFromLocalStorage();

  return (
    <div className="min-h-screen bg-[#0f1923] text-white py-8 px-4">
      <BetHistory token={token} />
    </div>
  );
};

export default BetHistoryPage;
