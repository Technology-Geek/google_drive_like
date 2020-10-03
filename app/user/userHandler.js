const db = require('../../database');

// DB Error Handler
const dbErrorHandler = require('../../utils/error/dbErrorHandler');

/*****************
 * @UserHandlers *
 *****************/

// Save User
function saveUser(name, email, password) {
  return new Promise((resolve, reject) => {
    if (!name || !email || !password)
      return reject(dbErrorHandler({ code: 'ER_BAD_FIELD_ERROR' }));
    const sql = `INSERT INTO users(name, email, password)
                    VALUES("${name}","${email}", "${password}")`;
    db.query(sql, (err, result) => {
      if (err) return reject(dbErrorHandler(err));
      if (result.affectedRows == 1) return resolve('User Saved');
    });
  });
}
module.exports = { saveUser };
