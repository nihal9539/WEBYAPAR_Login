var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const AdmindModel = require('../model/admin-model');
const UserModel = require('../model/User-model');
const { ObjectId } = require('mongodb');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',);
});
router.get('/add-user', async function (req, res, next) {


  res.render('add-user');
});


router.post('/add-user', async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  req.body.password = hashPassword

  const user = new UserModel(req.body)
  console.log(user);
  try {
    await user.save()
    console.log(user);
    res.redirect('users/login')
    console.log("done");
  } catch (error) {
    console.log(error.message);
  }
})

// admin login
router.post('/login', async (req, res) => {
  console.log("ho");
  const user = await AdmindModel.findOne({ adminId: req.body.adminId })
  const validity = await bcrypt.compare(req.body.password, user.password)

  if (validity) {
    res.redirect('add-user');
  } else {
    res.render('index', { "error": "check password" });
  }

})
router.get('/accept-user/:id', async (req, res) => {
  const id = req.params.id
  try {

    const user = await UserModel.findByIdAndUpdate(id, { accept: true })
    if (user) {
      console.log(user);
      res.redirect('/user-details')

    }
  } catch (error) {

  }
})
router.get('/delete-user/:id', async (req, res) => {
  const id = req.params.id
  try {

    const user = await UserModel.findByIdAndDelete(id)
    if (user) {
      console.log(user);
      res.redirect('/user-details')

    }
  } catch (error) {

  }


})
router.get('/user-details', async function (req, res, next) {
  const user = await UserModel.find();
  console.log(user);
  res.render('user-details', { user });
});

module.exports = router;
