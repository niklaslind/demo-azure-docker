(function() {
    const express = require('express'),
          bodyParser = require('body-parser'),
          app = express(),
          users = require('./users'),
          authorize = require("./authorize"),
          authenticate = require('./authenticate'),
          port = 4000;

    app.use(bodyParser.json());

    app.get('/users', getAllUsers)

    app.post('/authenticate', authenticate.getToken);

    app.post('/authorize', authenticate.getToken);

    app.use(authorize.initialize());


    function getAllUsers(req, res, next) {
        res.json(users.getAllUsers());
    }


    // app.post('/validator/:group/jobs',
    //          authorize.authenticate(),
    //          authorize.checkAcl,
    //          function(req, res, next) {
    //              console.log('New job for group', req.params.group);
    //              return res.json({ message: 'Job is enqueued' });
    //          });

    // app.post('/validator/ifcrules',
    //          authorize.authenticate(),
    //          authorize.checkAcl,
    //          function(req, res, next) {
    //              console.log('Rule uploaded');
    //              return res.json({ message: 'Rule uploaded' });
    //          });





    app.listen(port, () => {
        console.log('auth-service listening to port', port);
    });

})()
