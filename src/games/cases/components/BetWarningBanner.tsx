const BetWarningBanner = ({ pending }: { pending: boolean }) => {
  if (!pending) return null;
  return (
    <div className="bg-yellow-500 text-black p-3 font-bold text-center">
      You have a pending bet! If this was a mistake, please retry or wait for refund.
    </div>
  );
};
