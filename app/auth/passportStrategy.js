const LocalStrategy = require('passport-local').Strategy;
const { json } = require('express');
const db = require('../../database');

const Local = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  function (email, password, done) {
    db.query(
      `SELECT email FROM users WHERE email="${email}" AND password="${password}"`,
      (err, result) => {
        if (err) return done(err);
        let r = JSON.stringify(result);
        r = JSON.parse(r);

        if (result.length == 1) done(null, result[0].email);
      }
    );
  }
);

module.exports = Local;
