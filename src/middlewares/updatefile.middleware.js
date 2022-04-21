const cloudinary = require('cloudinary').v2

const deleteImgCloudinary = (imgUrl) => {
    const imgSplited = imgUrl.split('/')
    const nameSplited = imgSplited[imgSplited.length - 1].split('.')
    const folderSplited = imgSplited[imgSplited.length - 2]
    const public_id = `${folderSplited}/${nameSplited[0]}`;
    cloudinary.uploader.destroy(public_id, () => {
        console.log('Image delete in cloudinary')
    })
}

module.exports = { deleteImgCloudinary }
const multer = require('multer');

const cloudinary = require('cloudinary').v2

const { CloudinaryStorage } = require('multer-storage-cloudinary');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Products',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
    }
})


const upload = multer({ storage });

module.exports = upload;