var express = require('express')
var Comment = require('../models').Comment
var router = express.Router()

// middleware
var checkIDInput = function (req, res, next) {
  //console.log('Check ID input');
  if (isNaN(req.params.id)) {
    //console.log('Invalid ID supplied');
    res.status(400).json('Invalid ID supplied')
  } else {
    next()
  }
}
var checkIDExist = function (req, res, next) {
  //console.log('Check ID exist');
  Comment.count({ where: { id: req.params.id } }).then((count) => {
    if (count != 0) {
      next()
    } else {
      //console.log('Comment not found');
      res.status(400).json('Comment not found')
    }
  })
}

router.get('/', function (req, res) {
  //console.log('Getting all comments');
  Comment.findAll().then((comment) => {
    res.status(200).json(comment)
  })
})

router.post('/', function (req, res) {
  Comment.create({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    author: req.body.author,
  })
    .then((comment) => {
      /*console.log(comment.get({
            plain: true
        }));*/
      res.status(200).json(comment)
    })
    .error((err) => {
      res.status(405).json('Erreur')
    })
})

router.get('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Get comment by id');
  Comment.findById(req.params.id).then((comment) => {
    //console.log(comment);
    res.status(200).json(comment)
  })
})

router.put('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Update comment by id');
  Comment.update(
    {
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
      author: req.body.author,
    },
    {
      where: { id: req.params.id },
    },
  ).then((result) => {
    res.status(200).json(result)
  })
})

router.delete('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Delete comment by id');
  Comment.destroy({
    where: { id: req.params.id },
  }).then((result) => {
    res.status(200).json(result)
  })
})

module.exports = router
