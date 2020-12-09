
(function() {

    const jwtSecret = 'top-secret!',
          jwt = require('jsonwebtoken'),
          users = require('./users');


    function getToken(req, res, next) {
        const user = users.getAuthenticatedUser(
            req.body.username,
            req.body.password,
        );
        console.log('getToken', req.body, user);
        if (!user)
            return res.status(401).json({msg: "Authentication failed"});

        const token = jwt.sign( {user: user}, jwtSecret, { expiresIn: '30d' });
        return res.json(
            {
                user: user,
                token: token
            }
        )
    };

    module.exports = {
        getToken: getToken
    }

})();
