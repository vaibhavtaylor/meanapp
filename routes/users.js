var express = require('express');
var router = express.Router();
var mongoModule = require('./mongomodule');

router.get('/', function(req, res, next) {
  res.render('user.html');
});

/* GET users listing. */
router.get('/data', function(req, res, next) {
  console.log("getting data");
  mongoModule.mongoModule.getUserData("users", function(data) {
        // console.log(data);
        res.json(data);
    });
});

/*
Adding user to database
*/
router.get('/adduser/:user', function(req, res, next) {
  console.log("Adding User: " + req.params.user);
  mongoModule.mongoModule.addUser("users", req.params.user, function(data){
    res.send(data);
  })
})

/*
Delete user from Database
*/
router.get('/deleteuser/:user', function(req, res, next) {
  mongoModule.mongoModule.deleteUser("users", req.params.user, function(data){
    res.send(data);
  })
})

/*
Update user data
*/
router.get('/updateData/:username/:age', function(req, res, next){
  mongoModule.mongoModule.updateData('users', req.params.username, req.params.age, function(data){
    res.send(data);
  })
})

module.exports = router;
