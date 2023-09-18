const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { generateTokens } = require('../utils/jwt');
const {
  addRefreshTokenToWhitelist,
} = require('../auth/auth.services');


const {
  findUserByEmail,
} = require('../auth/user.services');

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);
    const userId = existingUser.id;
    const number = existingUser.mobileNumber;
    console.log(userId);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid Email credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid Password credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

    res.json({
      accessToken,
      refreshToken,
      userId,
      number,
      
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;