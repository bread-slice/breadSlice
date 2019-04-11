const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ 'welcome to the api': true });
});

router.post('/post', uploadCloud.single('photo'), (req, res, next) => {
  console.log('i made a bitch', req.body);
});

module.exports = router;
