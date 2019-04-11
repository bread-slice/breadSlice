// config/ cloudinary.js

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

console.log(process.env);
cloudinary.config({
  cloud_name: 'monroeshost',
  api_key: '545526897398867',
  api_secret: 'K6BVc76ySII2VgPGgkO3eUP-GfI'
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-name', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function(req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
