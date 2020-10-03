/*****************
 * @Dependencies *
 *****************/

//Web Framework
const express = require('express');

const userHandler = require('./userHandler');

const passport = require('../auth');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  userHandler
    .saveUser(name, email, password)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.sendStatus(200);
});

/************
 * @Exports *
 ************/

//Express Router
module.exports = router;
