const express = require("express");
const router = express.Router();
const Documents = require("../models/documents");
const admin = require("firebase-admin");

router.post("/", async function (req, res, next) {
  try {
    const { title, content, idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const author = decodedToken.uid;

    await Documents.create({ title, content, author });
    res.status(200).json({ message: "저장되었습니다" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
