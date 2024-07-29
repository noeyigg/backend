require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const createError = require("http-errors");
const admin = require("firebase-admin");
const path = require("path");

const verifyTokenRouter = require("./routes/verifyToken");
const workspaceRouter = require("./routes/workspace");
const documentsRouter = require("./routes/documents");
const newRouter = require("./routes/new");

const app = express();

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose.connect(process.env.DATABASE);

app.use(cors({ origin: "http://localhost:3000"}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/verifyToken", verifyTokenRouter);
app.use("/workspace", workspaceRouter);
app.use("/documents", documentsRouter);
app.use("/new", newRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
