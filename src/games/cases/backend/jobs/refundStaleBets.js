const mongoose = require('mongoose');
const Bet = require('../models/Bet');
const User = require('../models/User');
require('dotenv').config();

(async function refundStaleBets() {
  await mongoose.connect(process.env.MONGO_URI);

  const staleThreshold = new Date(Date.now() - 60 * 1000); // 60s old
  const staleBets = await Bet.find({ status: 'pending', createdAt: { $lt: staleThreshold } });

  for (let bet of staleBets) {
    const user = await User.findById(bet.userId);
    user.balance += bet.amount;
    await user.save();
    bet.status = 'refunded';
    await bet.save();
  }

  console.log(`Refunded ${staleBets.length} stale bets.`);
  process.exit();
})();