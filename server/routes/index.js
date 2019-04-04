let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send(`<h1>index</h1>
            <a href='/auth/login'>login</a>
            <a href='/auth/signup'>signup</a>
  `);
});

module.exports = router;
