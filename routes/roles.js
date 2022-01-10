var express = require('express')
var Role = require('../models').Role
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
  Role.count({ where: { id: req.params.id } }).then((count) => {
    if (count != 0) {
      next()
    } else {
      //console.log('Role not found');
      res.status(400).json('Role not found')
    }
  })
}

router.get('/', function (req, res) {
  //console.log('Getting all roles');
  Role.findAll().then((role) => {
    res.status(200).json(role)
  })
})

router.post('/', function (req, res) {
  Role.create({
    name: req.body.name,
  })
    .then((role) => {
      /*console.log(role.get({
            plain: true
        }));*/
      res.status(200).json(role)
    })
    .error((err) => {
      res.status(405).json('Erreur')
    })
})

router.get('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Get role by id');
  Role.findById(req.params.id).then((role) => {
    //console.log(role);
    res.status(200).json(role)
  })
})

router.put('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Update role by id');
  Role.update(
    {
      name: req.body.name,
    },
    {
      where: { id: req.params.id },
    },
  ).then((result) => {
    res.status(200).json(result)
  })
})

router.delete('/:id', [checkIDInput, checkIDExist], function (req, res) {
  //console.log('Delete role by id');
  Role.destroy({
    where: { id: req.params.id },
  }).then((result) => {
    res.status(200).json(result)
  })
})

module.exports = router
