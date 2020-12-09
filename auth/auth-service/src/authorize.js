
(function() {

  const _ = require('lodash'),
        passport = require("passport"),
        passportJWT = require("passport-jwt"),
        ExtractJwt = passportJWT.ExtractJwt,
        Strategy = passportJWT.Strategy;

  const params = {
    secretOrKey: 'top-secret!',
    jwtFromRequest: ExtractJwt.fromHeader('x-access-token')
  };

  const strategy = new Strategy(params, function(payload, done) {
    return done(null, payload);
  });

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(strategy);


  function authorize(req, res, next) {

    const requested = {
      resource: _.get(req, 'headers.x-original-uri', 'missing'),
      operation: _.get(req, 'headers.x-original-method', 'missing').toLowerCase()
    }
    userAcl = _.get(req, 'user.user.acl', []),
    matchingAcl =
      _(userAcl)
      .filter( userAcl => {
        const userAclResource = new RegExp(userAcl.resource);
        return (userAclResource.test(requested.resource)) && (userAcl.permissions.includes(requested.operation));
      })
      .value();

    console.log('checkAcl', requested, userAcl, matchingAcl, req.headers);

    if (_.isEmpty(matchingAcl))
      return res.status(401).json({msg: "Operation not allowed"});
    else
      return res.status(200).json({msg: "ok"});
  }


  module.exports = {
    initialize: function() {
      return passport.initialize();
    },

    authenticate: function() {
      return passport.authenticate("jwt", params.secretOrKey);
    },

    authorize: authorize

  }

})();
