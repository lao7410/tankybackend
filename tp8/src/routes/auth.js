const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/productos');
});

module.exports = router;
