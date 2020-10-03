/*****************
 * @Dependencies *
 *****************/

//Web Framework
const express = require('express');

const userHandler = require('./userHandler');

// //Initialize Express Router

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  userHandler
    .saveUser(name, email, password)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

/************
 * @Exports *
 ************/

//Express Router
module.exports = router;
