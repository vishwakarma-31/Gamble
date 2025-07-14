const express = require('express');
const Bet = require('../models/Bet');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bets = await Bet.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, bets });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history' });
  }
});

module.exports = router;