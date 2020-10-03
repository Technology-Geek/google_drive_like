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

function search(name, ownerId) {
  return new Promise((resolve, reject) => {
    fs.readdir(`./assets`, (err, files) => {
      if (err) reject('error');
      const result = files.filter((val) => {
        const x = val.split('_');
        const owner = x[0];
        const folder = x[1];

        if (owner == ownerId && x[2].includes(name)) return val;
      });

      resolve(result);
    });
  });
}
module.exports = { deleteFile, search };
