const fs = require('fs');
const db = require('../../database');
// DB Error Handler
const dbErrorHandler = require('../../utils/error/dbErrorHandler');

/*****************
 * @FolderHandlers *
 *****************/

// Save Folder
function saveFolder(name, parentId, ownerId) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO folders(name,parentId)
                      VALUES("${name}",${parentId})`;
    db.query(sql, (err, result) => {
      if (err) return reject(dbErrorHandler(err));
      if (result.affectedRows == 1) {
        const insertedFolder = result.insertId;
        const sql2 = `INSERT INTO owners(folderId, userId)
                                    VALUES(${insertedFolder},${ownerId})`;
        db.query(sql2, (err, result) => {
          if (err) return reject(dbErrorHandler(err));
          if (result.affectedRows == 1) {
            return resolve('Folder Saved');
          }
        });
      }
    });
  });
}

function getSubFolderWithPagination(ownerId, folderId, num, page = 0) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT folders.name FROM folders JOIN owners ON
    folders.id=owners.folderId
        WHERE owners.userId=${ownerId} AND folders.parentId=${folderId} LIMIT ${num} OFFSET ${
      10 * page
    }`;
    db.query(sql, (err, result) => {
      if (err) return reject(dbErrorHandler(err));
      else {
        resolve(JSON.stringify(result));
      }
    });
  });
}

function getSubFilesWithPagination(ownerId, folderId, num) {
  return new Promise((resolve, reject) => {
    fs.readdir(`./assets`, (err, files) => {
      if (err) reject('error');
      const result = files.filter((val) => {
        const x = val.split('_');
        const owner = x[0];
        const folder = x[1];
        if (owner == ownerId && folder == folderId) return val;
      });
      result.splice(num, result.length - num);
      resolve(result);
    });
  });
}

function searchSubFolderWithPagination(name, ownerId, parentId) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT folders.name FROM folders JOIN owners ON
      folders.id=owners.folderId
          WHERE owners.userId=${ownerId} AND folders.parentId=${parentId} AND folders.name="${name}"`;
    db.query(sql, (err, result) => {
      if (err) return reject(dbErrorHandler(err));
      else {
        resolve(JSON.stringify(result));
      }
    });
  });
}

module.exports = {
  searchSubFolderWithPagination,
  getSubFilesWithPagination,
  getSubFolderWithPagination,
  saveFolder,
};
