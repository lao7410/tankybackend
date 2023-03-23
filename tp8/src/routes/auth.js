const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    //bien el auth, redirect
    res.redirect("/products");
  }
);

module.exports = router;