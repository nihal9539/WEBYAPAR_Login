var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const AdmindModel = require('../model/admin-model');
const UserModel = require('../model/User-model');



/* GET home page. */
var error = {
  message: false
}
router.get('/', function (req, res, next) {
  res.render('index', error);
});
router.get('/add-user', async function (req, res, next) {
  const user = await UserModel.find();

  user.map((dataa) => {
    console.log(dataa);
  })

  res.render('add-user', { user });
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

// admin signup

// router.post('/register',async(req,res)=>{
//   try {
//   const salt = await bcrypt.genSalt(10)
//   const hashPassword = await bcrypt.hash(req.body.password, salt)
//   req.body.password = hashPassword
//   const user = new AdmindModel(req.body)

//     await user.save()
//     console.log("added");

//   } catch (error) {
//     console.log(error.message);

//   }
// })
router.post('/login', async (req, res) => {
  try {
    const user = await AdmindModel.findOne({ adminId: req.body.adminId })
    console.log(user);
    if (user) {
      const validity = await bcrypt.compare(req.body.password, user.password)

      if (validity) {
        error.message = false
        res.redirect('add-user');
      } else {
        error.message = true
        res.redirect('/');
      }

    } else {
      error.message = true
      res.redirect('/');

    }
  } catch (error) {
    console.log(error);
    throw error

  }


})
router.post('/accept-user/:id', async (req, res) => {
  const id = req.params.id
  console.log(id);
  try {

    const user = await UserModel.findByIdAndUpdate(id, { accept: true })
    if (user) {
      const userDeatils = await UserModel.findById(id)
      res.render('user/detail-upload',{userDeatils,id})

    } else {
      console.log("user not found");
    }
  } catch (error) {
    console.log(error.message);
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

  res.render('user-details', { user });
});

module.exports = router;
