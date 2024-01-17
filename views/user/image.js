inputfile = document.getElementById('input-image')
imageview = document.getElementById('imageview')
drop = document.getElementById('drop')

inputfile.addEventListener("change",uploadImage)

function uploadImage(){
   console.log("hii")
   let imageLink = URL.createObjectURL(inputfile.files[0]);
   imageview.style.backgroundImage = `url${imageLink}`
}