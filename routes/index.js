var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const AdmindModel = require('../model/admin-model');
const UserModel = require('../model/User-model');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',);
});
router.get('/add-user', async function (req, res, next) {


  res.render('add-user');
});

// Login Admin
// router.post('/signup', async (req, res) => {
//   const salt = await bcrypt.genSalt(10)
//   const hashPassword = await bcrypt.hash(req.body.password, salt)
//   req.body.password = hashPassword

//   const admin = new AdmindModel(req.body)
//   console.log(admin);
//   try {
//     await admin.save()
//   } catch (error) {
//     console.log(error.message);
//   }
// })

// Create User
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
  }else{
    res.render('index',{"error":"check password"});
  }

})
router.get('/user-details', function (req, res, next) {
  console.log("hii");
  res.render('user-details');
});

module.exports = router;
