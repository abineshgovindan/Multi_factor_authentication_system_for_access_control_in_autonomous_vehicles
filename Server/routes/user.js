const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { findUserById } = require('../auth/user.services');

const router = express.Router();

router.get('/profile/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params.id;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;