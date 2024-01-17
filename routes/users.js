var express = require('express');
const UserdModel = require('../model/User-model');
var router = express.Router();
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render("user/login");
});
router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserdModel.findOne({ userId: req.body.userId })
    if (user) {
      console.log(user);
      const validity = await bcrypt.compare(req.body.password, user.password)
      const { password, ...userDeatils } = user._doc
      console.log(userDeatils);
      if (validity) {
        res.render('user/detail-upload', { userDeatils });
      } else {
        res.redirect('login',);
      }
    } else {
      res.render('login')
    }

  } catch (error) {

  }


})
router.get('/detail-upload', function (req, res, next) {
  res.render("user/detail-upload");
});
router.get('/add-details/:id', async function (req, res, next) {
  const id = req.params.id
  console.log(id);
  const user = await UserdModel.findByIdAndUpdate(id, req.body)
  console.log(user);
  res.render("user/detail-upload");
});

module.exports = router;
