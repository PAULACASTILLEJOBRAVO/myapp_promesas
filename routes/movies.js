var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("moviesApp:server");

//Models
var Movie = require("../models/Movie.js");

var db = mongoose.connection;

/* GET movies listing */
router.get("/", function (req, res) {
  Movie.find()
  .then(movies => res.status(200).json(movies))
  .catch(err => res.status(500).send(err));
});

/* GET single movie by Id */
router.get("/:id", function (req, res, next) {
  Movie.findById(req.params.id)
  .then(movies => res.status(200).json(movies))
  .catch(err => res.status(500).send(err));
});

/* POST a new movie*/
router.post("/", function (req, res) {
  Movie.create(req.body)
  .then(movieinfo=> res.sendStatus(200))
  .catch(err => res.status(500).send(err));
});

/* PUT an existing movie */
router.put("/:id", function (req, res) {
  Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
  ).then(movieinfo => {
    debug(movieinfo);
    res.sendStatus(200);
  }).catch(err => res.status(500).send(err));
});

/* DELETE an existing post */
router.delete("/:id", function (req, res) {
  Movie.findByIdAndDelete(req.params.id)
  .then(postinfo => res.sendStatus(200))
  .catch(err => res.status(500).send(err));
});

module.exports = router;