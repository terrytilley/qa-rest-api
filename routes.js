'use strict';

var express = require('express');
var router = express.Router();
var Question = require("./models").Question;

router.param('qID', (req, res, next, id) => {
  Question.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

router.param('aID', (req, res, next, id) => {
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }
  next();
});

// GET /questions
// Route for questions collection
router.get('/', (req, res, next) => {
  Question.find({})
        .sort({createdAt: -1})
        .exec((err, questions) => {
          if (err) return next(err);
          res.json(questions);
        });
});

// POST /questions
// Route for creating questions
router.post('/', (req, res, next) => {
  var question = new Question(req.body);
  question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// GET /questions/:qID
// Route for specific questions
router.get('/:qID', (req, res, next) => {
  res.json(req.question);
});

// POST /questions/:qID/answers
// Route for creating an answer
router.post('/:qID/answers', (req, res, next) => {
  req.question.answers.push(req.body);
  req.question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// PUT /questions/:qID/answers/:aID
// Editing a specific answer
router.put('/:qID/answers/:aID', (req, res, next) => {
  req.answer.update(req.body, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});

// DELETE /questions/:qID/answers/:aID
// Delete a specific answer
router.delete('/:qID/answers/:aID', (req, res, next) => {
  req.answer.remove((err) => {
    req.question.save((err, question) => {
      if (err) return next(err);
      res.json(question);
    });
  });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote on a specific answer
router.post('/:qID/answers/:aID/vote-:dir',
  (req, res, next) => {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else {
      req.vote = req.params.dir;
      next();
    }
  },
  (req, res, next) => {
    req.answer.vote(req.vote, (err, question) => {
      if (err) return next(err);
      res.json(question);
    });
});

module.exports = router;
