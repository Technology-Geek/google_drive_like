const { log } = require('console');
/*****************
 * @Dependencies *
 *****************/

//Web Framework
const express = require('express');
var multer = require('multer');
const fileHandler = require('./fileHandler');
const path = require('path');

// //Initialize Express Router
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../assets/'));
  },
  filename: function (req, file, cb) {
    const ownerId = req.user.id;
    const parentId = file.fieldname;
    const name = file.originalname;
    cb(null, `${ownerId}_${parentId}_${name}`);
  },
});
var upload = multer({ storage: storage });

router.post('/', upload.any(), (req, res) => {
  res.sendStatus(201);
});

router.get('/search', (req, res) => {
  const { name } = req.query;
  fileHandler
    .search(name, req.user.id)
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(500));
});

// http://localhost:7000/file?name=name.jpg&folderId=1
router.get('/', (req, res) => {
  const { name, folderId } = req.query;
  res.sendFile(
    path.join(
      __dirname,
      '../../assets/',
      req.user.id + '_' + folderId + '_' + name
    )
  );
});

router.delete('/', (req, res) => {
  const { ownerId, parentId, name } = req.query;

  fileHandler
    .deleteFile(name, parentId, ownerId)
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(500));
});
/************
 * @Exports *
 ************/

//Express Router
module.exports = router;
