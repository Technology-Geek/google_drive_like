const passport = require('passport');
const local = require('./passportStrategy');

const db = require('../../database');
passport.use('local', local);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (email, done) {
  db.query(
    `SELECT id,email FROM users WHERE email="${email}"`,
    (err, result) => {
      if (err) return done(err);
      let r = JSON.stringify(result);
      r = JSON.parse(r);
      if (result.length == 1) done(null, { id: result[0].id });
    }
  );
});

module.exports = passport;
