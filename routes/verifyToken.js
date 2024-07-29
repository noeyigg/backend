const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

router.post("/", async function (req, res, next) {
  const idToken = req.body.token;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ uid: decodedToken.uid });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
