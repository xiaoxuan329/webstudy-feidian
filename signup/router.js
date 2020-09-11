var fs = require('fs')
var express = require('express')
var Users = require('./user')
var router = express.Router()

router.get('/list', function (req, res) {
 //   fs.readFile('./db.json', 'utf8', function(err,data){})
    Users.find(function (err, users) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('../views/list.html', {
            users: users
        })
    })
})

router.get('/', function (req, res) {
   res.render('../views/index.html')
})

router.post('/', function (req, res) {
   Users.save(req.body,function(err){
       if(err){
        return res.status(500).send('Server error.')
       }
       res.redirect('/list')
   })
   console.log(req.body)
})

router.get('/delete', function(req, res){
    Users.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/list')
    })
})

router.get('/edit', function (req, res) {
    Users.findById(parseInt(req.query.id), function (err, user) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('../views/edit.html', {
            user: user
        })
    })
})

router.post('/edit', function (req, res) {
    Users.updateById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/list')
    })
})

module.exports = router