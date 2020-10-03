/*******************
 * @DBErrorHandler *
 *******************/

/**
 * DB Error Handler
 *
 * @param {Error} err DB Error Object
 */

function dbErrorHandler(err) {
  console.log(err);
  switch (err.code) {
    // Not Found
    case null:
      return { status: 404, msg: 'Not Found' };

    // Table Not Exist
    case 'ER_NO_SUCH_TABLE':
      return { status: 400, msg: 'Table Dose Not Exist' };

    // Duplicate Entry
    case 'ER_DUP_ENTRY':
      return { status: 409, msg: 'Already Exist, Duplicate Entry' };

    // Bad Field Name
    case 'ER_BAD_FIELD_ERROR':
      return { status: 400, msg: 'Bad Field Name' };

    // Reference Not Exist
    case 'ER_NO_REFERENCED_ROW_2':
      return { status: 400, msg: 'Reference Not Exist' };
    default: {
      return { status: 500, msg: 'DB Error' };
    }
  }
}

// function dbErrorHandler(err) {
//   switch (err.name) {
//     // Not Found
//     case null:
//       return { status: 404, msg: 'Not Found' };

//     // Unique Constraint Error
//     case 'SequelizeUniqueConstraintError':
//       return { status: 409, msg: 'Already Exist, Unique Constraint Error' };

//     // ForeignKey Constraint Error
//     case 'SequelizeForeignKeyConstraintError':
//       return { status: 400, msg: 'Payload Error, ForeignKey Constraint Error' };

//     default: {
//       return { status: 500, msg: 'DB Error' };
//     }
//   }
// }

/************
 * @Exports *
 ************/

//Request Error Handler
module.exports = dbErrorHandler;
