const { json } = require('body-parser');

const fs = require('fs');
// DB Error Handler
const dbErrorHandler = require('../../utils/error/dbErrorHandler');

// Delete File
function deleteFile(name, parentId, ownerId) {
  return new Promise((resolve, reject) => {
    fs.unlink(`./assets/${ownerId}_${parentId}_${name}`, () => resolve('done'));
  });
}
module.exports = { deleteFile };
