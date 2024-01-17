var express = require('express');
const UserdModel = require('../model/User-model');
var router = express.Router();
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render("user/login");
});
router.post('/login', async (req, res) => {
  console.log("ho");
  const user = await UserdModel.findOne({ userId: req.body.userId })
  const validity = await bcrypt.compare(req.body.password, user.password)

  if (validity) {
    res.redirect('detail-upload');
  } else {
    res.redirect('login',);
  }

})
router.get('/detail-upload', function (req, res, next) {
  res.render("user/detail-upload");
});

module.exports = router;
