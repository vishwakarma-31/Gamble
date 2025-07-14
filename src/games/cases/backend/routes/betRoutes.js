const express = require('express');
const Bet = require('../models/Bet');
const User = require('../models/User');
const router = express.Router();

router.post('/place-bet', async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.userId);
    if (!user || user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= amount;
    await user.save();

    const bet = new Bet({ userId: req.userId, amount });
    await bet.save();

    res.json({ success: true, betId: bet._id });
  } catch (err) {
    res.status(500).json({ message: 'Error placing bet' });
  }
});

router.post('/confirm-bet', async (req, res) => {
  try {
    const { betId } = req.body;
    const bet = await Bet.findById(betId);
    if (!bet || bet.status !== 'pending') return res.status(400).json({ message: 'Invalid bet' });

    bet.status = 'confirmed';
    await bet.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Error confirming bet' });
  }
});

router.post('/refund-bet', async (req, res) => {
  try {
    const { betId } = req.body;
    const bet = await Bet.findById(betId);
    if (!bet || bet.status !== 'pending') return res.status(400).json({ message: 'Invalid refund' });

    const user = await User.findById(bet.userId);
    user.balance += bet.amount;
    await user.save();

    bet.status = 'refunded';
    await bet.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Error refunding bet' });
  }
});

module.exports = router;