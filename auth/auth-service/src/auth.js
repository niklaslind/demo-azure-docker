
(function() {

    const passport = require("passport"),
          passportJWT = require("passport-jwt"),
          jwt = require('jsonwebtoken'),
          config = require("config"),
          ExtractJwt = passportJWT.ExtractJwt,
          Strategy = passportJWT.Strategy;

    const params = {
        secretOrKey: 'xyz', //config.auth.jwtsecret,
        jwtFromRequest: ExtractJwt.fromHeader('x-access-token')
    };


    const strategy = new Strategy(params, function(payload, done) {
        console.log('strategy.paylod', payload);
        return done(null, payload);
    });

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(strategy);

    module.exports = {
        initialize: function() {
            return passport.initialize();
        },

        authenticate: function() {
            return passport.authenticate("jwt", params.secretOrKey); // config.auth.jwtsession);
        },

        getToken: function(req, res, next) {
            console.log('getToken', req.body);
            const token = jwt.sign( req.body, params.secretOrKey, { expiresIn: '30d' });
            return res.json({ token: token });
        },


    }

})();
