
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

function writeTokenToFile(token, filename) {
    fs.writeFile(
        filename,
        JSON.stringify({'x-access-token': token}),
        function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
}

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
                writeTokenToFile( res.body['token'], `token.${options.username}`);
            }
        });
}
