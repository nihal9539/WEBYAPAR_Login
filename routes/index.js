var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add-user', function(req, res, next) {
  console.log("hii");
  res.render('add-user');
});
router.get('/user-details', function(req, res, next) {
  console.log("hii");
  res.render('user-details');
});

module.exports = router;
