var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("moviesApp:server");

//Models
var Bookmark = require("../models/Bookmark.js");
mongoose.set("strictQuery", false);
var db = mongoose.connection;

/* GET movies listing */
router.get("/", function (req, res) {
  Bookmark.find()
  .then(Bookmark => res.status(200).json(Bookmark))
  .catch(err => res.status(500).send(err));
});

/* GET bookmarks listing from an user by user email. */
router.get("/:email", function (req, res) {
  Bookmark.find({ email: req.params.email })
    .sort("-addeddate")
    .populate("movie")
    .then(bookmarks => res.status(200).json(bookmarks))
    .catch(err => res.status(500).send(err));
});

/* POST a new bookmark*/
router.post("/", function (req, res) {
  Bookmark.create(req.body)
  .then(bookmarkinfo=> res.sendStatus(200))
  .catch(err => res.status(500).send(err));
});

/* PUT an existing bookmark */
router.put("/:id", function (req, res) {
  Bookmark.findByIdAndUpdate(
    req.params.id,
    req.body,
  ).then(bookmarkinfo => {
    debug(bookmarkinfo);
    res.sendStatus(200);
  }).catch(err => res.status(500).send(err));
});

/* DELETE an existing post */
router.delete("/:id", function (req, res) {
  Bookmark.findByIdAndDelete(req.params.id)
  .then(postinfo => res.sendStatus(200))
  .catch(err => res.status(500).send(err));
});

module.exports = router;
