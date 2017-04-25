var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
   res.render('index.html');
});

/*
Routes with one parameters
*/
router.get('/user/:userID', function(req, res, next){
  res.send(req.params);
});

/*
Routes with multiple parameters
*/
router.get('/user/:userID/name/:name', function(req, res, next){
  res.send(req.params);
});

/*
Route Handler with multiple function
*/
router.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

/*
Route Handler with array of function
*/
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

router.get('/example/c', [cb1, cb0, cb2])

module.exports = router;
