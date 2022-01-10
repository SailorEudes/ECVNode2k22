var express = require('express')
var Post = require('../models').Post
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
  Post.count({ where: { id: req.params.id } }).then((count) => {
    if (count != 0) {
      next()
    } else {
      //console.log('Post not found');
      res.status(400).json('Post not found')
    }
  })
}

router.get('/', function (req, res) {
  //console.log('Getting all posts');
  Post.findAll().then((post) => {
    res.status(200).json(post)
  })
})

router.post('/', function (req, res) {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    author: req.body.author,
  })
    .then((post) => {
      /*console.log(post.get({
            plain: true
        }));*/
      res.status(200).json(post)
    })
    .error((err) => {
      res.status(405).json('Erreur')
    })
})

router.get('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Get post by id');
  Post.findById(req.params.id).then((post) => {
    //console.log(post);
    res.status(200).json(post)
  })
})

router.put('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Update post by id');
  Post.update(
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
  //console.log('Delete post by id');
  Post.destroy({
    where: { id: req.params.id },
  }).then((result) => {
    res.status(200).json(result)
  })
})

module.exports = router
