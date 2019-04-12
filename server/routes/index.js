const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary');
const Tesseract = require('tesseract.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ 'welcome to the api': true });
});

router.post('/post', uploadCloud.single('photo'), (req, res, next) => {
  console.log('i made a bitch', req.file.url);
  console.log(req.file);
  let myImage = req.file.url;
  Tesseract.recognize(myImage).then(function(result) {
    console.log('result!!!!', result.text);
    res.json({ data: result.text });
  });
});

module.exports = router;
