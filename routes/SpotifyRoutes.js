const express = require('express');
const router = express.Router();

const { login, authCallback } = require('../utils/Spotify');

var token = null;

const cookieConfigs = {
  maxAge: 1000 * 60 * 60 * 6, // Expires after 6h
  httpOnly: false,
  signed: false,
  sameSite: 'none',
  secure: true,
  path: '/',
};

router.get('/login', async (req, res) => {
  const redirect = await login(`${req.headers.referer}auth/callback`);
  res.redirect(redirect);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  token = await authCallback(code, `${req.headers.referer}auth/callback`);
  console.log('token', token);
  res.redirect('/');
});

router.get('/token', (req, res) => {
  console.log('123', token);
  res.status(208).send({token});
});

module.exports = router;
