var express = require('express');
const UserdModel = require('../model/User-model');
var router = express.Router();
const bcrypt = require('bcrypt')
const multer = require('multer');
const fs = require('fs');
const Cropper = require('cropperjs');


// Multer for storage and file name setting
let storage = multer.diskStorage({
  destination:'public/image',
  filename:(req,file,cb)=>{
    // cb(null,Date.now(+file+originalname))
  cb(null,file.originalname)
  }
})

// for uploading
let upload = multer({
  storage:storage
})

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render("user/login");
});
router.post('/login', async (req, res) => {
  console.log(req.body);
  console.log("hii");
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
router.get('/detail-upload',  function (req, res, next) {
  console.log(req.body);
  res.render("user/detail-upload");
});
router.post('/detail-upload/:id', (req, res, )=> {
const id = req.params.id
  const image = req.files.image
  image.mv(`../public/image`+id+'.jpg',(err,done)=>{
    if(!err){
      console.log('Image uploaded successfully');
      res.status(200).json("upload Sucessfully")
    }
  })
  
  res.render("user/detail-upload");
  // const { name, data, mimetype } = req.files.image;
  // const base64Image = data.toString('base64');
  // const imgSrc = `data:${mimetype};base64,${base64Image}`;
  
  // // Create the img tag
  // const imgTag = `<img src="${imgSrc}" alt="${name}" name="image" />`;
  
  // console.log(imgTag);


  // // console.log(id);
  // const cropper = new Cropper(imgTag,{
  //   autoCrop: true,
  //   autoCropArea: 1,
  //   aspectRatio: 270 / 300,
  //   minCropBoxWidth: 270,
  //   minCropBoxHeight: 300,

  // })
  // var url = cropper.getCroppedCanvas().toDataUrl("image/png")
  // console.log(url);

  
});

module.exports = router;
