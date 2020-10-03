/************************
 * @RequestErrorHandler *
 ************************/

/**
 * Request Error Handler
 *
 * @param {Response} res Http Response
 * @param {Number} statusCode Response Status Code
 * @param {Object} [errorObject] Response Error Object
 */

const errorHandler = (res, statusCode, errorObject = undefined) => {
  switch (statusCode) {
    //Bad Request
    case 400:
      res.status(statusCode).json(errorObject || { msg: 'Bad Request' });
      break;
    //Unauthorized
    case 401:
      res.status(statusCode).json(errorObject || { msg: 'Unauthorized' });
      break;
    //Forbidden
    case 403:
      res.status(statusCode).json(errorObject || { msg: 'Forbidden' });
      break;
    //Not Found
    case 404:
      res.status(statusCode).json(errorObject || { msg: 'Not Found' });
      break;
    //Conflict
    case 409:
      res.status(statusCode).json(errorObject || { msg: 'Conflict' });
      break;
    //Un processable Entity
    case 422:
      // prettier-ignore
      res.status(statusCode).json(errorObject || { msg: 'Un processable Entity' });
      break;
    //Internal Server Error
    case 500:
      // prettier-ignore
      res.status(statusCode).json(errorObject || { msg: 'Internal Server Error' });
      break;
  }
};

/************
 * @Exports *
 ************/

//Request Error Handler
module.exports = errorHandler;
