let express = require('express');
let authRouter = express.Router();

/* GET home page. */
authRouter.get('/signup', (req, res, next) => {
  res.send(`<h1>signup</h1>
            <a href='/auth/login'>login</a>
            <a href='/'>index</a>
  `);
});

authRouter.get('/login', (req, res, next) => {
  res.send(`<h1>login</h1>
            <a href='/'>index</a>
            <a href='/auth/signup'>signup</a>
  `);
});

module.exports = authRouter;