/*****************
 * @Dependencies *
 *****************/

//Web Framework
const express = require('express');
const { fstat } = require('fs');
const fileHandler = require('../file/fileHandler');
const folderHandler = require('./folderHandler');

// //Initialize Express Router
const router = express.Router();

router.get('/files', (req, res) => {
  const { folderId, num } = req.query;
  folderHandler
    .getSubFilesWithPagination(req.user.id, folderId, num)
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

router.get('/folders', (req, res) => {
  const { folderId, num, page } = req.query;
  folderHandler
    .getSubFolderWithPagination(req.user.id, folderId, num, page)
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

router.get('/search', (req, res) => {
  const { name, parentId, num, page } = req.query;
  folderHandler
    .searchSubFolderWithPagination(name, req.user.id, parentId)
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

router.post('/', (req, res) => {
  const { name, parentId } = req.body;
  folderHandler
    .saveFolder(name, parentId, req.user.id, folderId, num)
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

router.delete('/', (req, res) => {
  const { folderId, name } = req.query;
  folderHandler
    .getSubFilesWithPagination(req.user.id, folderId, 1)
    .then((data) => {
      if (data.length > 0) return res.sendStatus(400);
      else fileHandler.deleteFile(name, folderId, req.user.id);
    })
    .catch((err) => res.sendStatus(500));
});

/************
 * @Exports *
 ************/

//Express Router
module.exports = router;
