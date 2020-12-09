
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




  function checkAcl(req, res, next) {
    console.log('checkAcl', req.method, req.path);
    const group = req.params.group,
          required = {
            resource: req.path,
            operation: req.method.toLowerCase()
          },
          userAcl = _.get(req, 'user.user.acl', []),
          matchingAcl =
          _(userAcl)
          .filter( userAcl => {
            const userAclResource = new RegExp(userAcl.resource);
            return (userAclResource.test(required.resource)) && (userAcl.permissions.includes(required.operation));
          })
          .value();

    console.log('checkAcl', required, userAcl, matchingAcl);

    if (_.isEmpty(matchingAcl))
      return res.status(401).json({msg: "Operation not allowed"});

    next();
  }


  module.exports = {
    initialize: function() {
      return passport.initialize();
    },

    authenticate: function() {
      return passport.authenticate("jwt", params.secretOrKey);
    },

    checkAcl: checkAcl

  }

})();
