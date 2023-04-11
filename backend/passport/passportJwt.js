var JWTStrategy = require("passport-jwt").Strategy;
var ExtractJWT = require("passport-jwt").ExtractJwt;
var User = require("../model/user.js");

module.exports = {
  initializer: function (passport) {
    passport.use(
      new JWTStrategy(
        {
          secretOrKey: process.env.SECRET_KEY,
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        function (jwt_payload, cb) {
          User.findById({ _id: jwt_payload.id })
            .then(function (user) {
              if (user) {
                return cb(null, user);
              } else return cb(null, false);
            })
            .catch(function (err) {
              return cb(err, false);
            });
        }
      )
    );
  },
};
