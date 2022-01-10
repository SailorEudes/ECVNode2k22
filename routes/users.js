var express = require('express')
var User = require('../models').User
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
  User.count({ where: { id: req.params.id } }).then((count) => {
    if (count != 0) {
      next()
    } else {
      //console.log('User not found');
      res.status(400).json('User not found')
    }
  })
}

router.get('/', function (req, res) {
  //console.log('Getting all users');
  User.findAll().then((user) => {
    res.status(200).json(user)
  })
})

router.post('/', function (req, res) {
  User.create({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    username: req.body.username,
    link: req.body.link,
  })
    .then((user) => {
      /*console.log(user.get({
            plain: true
        }));*/
      res.status(200).json(user)
    })
    .error((err) => {
      res.status(405).json('Erreur')
    })
})

router.get('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Get user by id');
  User.findById(req.params.id).then((user) => {
    //console.log(user);
    res.status(200).json(user)
  })
})

router.put('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Update user by id');
  User.update(
    {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      username: req.body.username,
      link: req.body.link,
    },
    {
      where: { id: req.params.id },
    },
  ).then((result) => {
    res.status(200).json(result)
  })
})

router.delete('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Delete user by id');
  User.destroy({
    where: { id: req.params.id },
  }).then((result) => {
    res.status(200).json(result)
  })
})

module.exports = router
