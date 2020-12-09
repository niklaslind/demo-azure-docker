
const _ = require('lodash'),
      cli = require('cli'),
      fs = require('fs'),
      superagent = require('superagent');

const options = cli.parse(
    {
        signin: ['s', 'Signin and get api-token'],
        username: ['u', 'username', 'string' ],
        password: ['p', 'password', 'string' ]
    }
);


if (options.signin) {

    const credentials = {
        username: options.username,
        password: options.password
    };
    console.log('Authenticating', credentials);
    superagent
        .post('localhost/signin')
        .send( credentials )
        .end((err, res) => {
            if (err)
                console.log('Could not authenticate');
            else {
                fs.writeFile(`token.${options.username}`,
                             JSON.stringify(
                                 {
                                     'x-access-token': res.body['token']
                                 }
                             ),
                             function (err) {
                                 if (err) throw err;
                                 console.log('Saved!');
                             });
            }
        });
}
