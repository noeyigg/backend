const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const Documents = require("../models/documents");

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    const document = await Documents.findById(id);

    if (!document) {
      return res.status(404).json({ message: "문서를 찾을 수 없습니다" });
    }

    res.json(document);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
