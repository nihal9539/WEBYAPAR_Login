var express = require('express');
const UserdModel = require('../model/User-model');
var router = express.Router();
const bcrypt = require('bcrypt')
const multer = require('multer');
const fs = require('fs');
const Cropper = require('cropperjs');


// Multer for storage and file name setting
let storage = multer.diskStorage({
  destination: 'public/image',
  filename: (req, file, cb) => {
    // cb(null,Date.now(+file+originalname))
    cb(null, file.originalname)
  }
})

// for uploading
let upload = multer({
  storage: storage
})

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render("user/login");
});
router.post('/login', async (req, res) => {
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
router.post('/detail-upload/:id', async (req, res,) => {
  const id = req.params.id
  console.log("hii");
  console.log(req.body);
  try {
    if (req.files.image) {
      const image = req.files.image
      image.mv('./public/image/' + id + '.webp', (err, done) => {
        if (!err) {
          console.log('Image uploaded successfully');
        } else {
          console.log(err);
        }
      })
    }

    const userDeatils = await UserdModel.findByIdAndUpdate(id,
      { $set: req.body },
      { new: true })
    // console.log(userDeatils);
    console.log(userDeatils._id.toString());
         console.log(userDeatils);
    res.render('user/detail-upload', { userDeatils,id });

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
