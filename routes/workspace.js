const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const Documents = require("../models/documents");

router.get("/", async function (req, res, next) {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ message: "인증이 필요합니다" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const documents = await Documents.find({ author: uid });

    res.json(documents);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
