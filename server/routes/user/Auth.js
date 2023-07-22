const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const passport = require("passport");

let loggedIn = false;
//* Route 5  - google authentication
router.get("/google", (req, res) => {
  const googleAuthURL = "https://accounts.google.com/o/oauth2/v2/auth";

  const params = new URLSearchParams({
    response_type: "code",
    redirect_uri: process.env.CALLBACK_URL,
    scope: "profile email ",
    client_id: process.env.CLIENT_ID,
  });

  const redirectURL = `${googleAuthURL}?${params}`;
  return res.json({ url: redirectURL });
});

//* Route 6  - google authentication callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "auth/login/failed",
  }),
  (req, res) => {
    loggedIn = false;
    res.redirect(process.env.successURL);
  },
);

//* Route 7  - google authentication failed
router.get("/login/failed", (req, res) => {
  res
    .status(401)
    .json({ error: true, message: "User failed to authenticate." });
});

//* Route 8  - google authentication success
router.get("/login/success", (req, res) => {
  if (req.user && !loggedIn) {
    const data = { User: { id: req.user.email } };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    loggedIn = true;

    res.status(200).json({
      success: true,
      error: false,
      message: "Successfully Loged In",
      user: req.user,
      accessToken: token,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

//* Route 9  - google authentication logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;
