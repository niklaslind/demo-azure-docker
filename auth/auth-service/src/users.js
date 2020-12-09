

(function(){

    const _ = require('lodash');

    function getAuthenticatedUser(username, password) {
        const user = settings.users[username],
              expectedPw = settings.passwords[username];
        return (user && (password == expectedPw)) ? user : null ;
    }

    function initUsers(settings) {
        const users = settings.users;
        for (group of settings.groups) {
            for(username of group.users) {
                const user = settings.users[username];
                user.groups.push(group.name);
                for(acl of _.get(group, 'acl', [])) {
                    user.acl.push(acl);
                }
                for(licenceName of _.get(group, 'licences', [])) {
                    user.licences.push(licenceName);
                    for(acl of settings.licences[licenceName].acl ) {
                        user.acl.push(acl);
                    }
                }
            }
        }
    }

    const settings = {
        groups: [
            {
                name: "kund1",
                users: ['pelle@kund1'],
                licences: ['lic1']
            },
            {
                name: "kund2",
                users: ['lisa@kund2'],
                licences: ['lic2']
            },
            {
                name: "admin",
                users: ['jörgen@tyrens'],
                acl: [
                    {
                       "resource": "/validator/ifcrules",
                        "permissions": ["post"]
                    }
                ]
            }

        ],
        
        "users": {
            "pelle@kund1": {
                "username": "pelle@kund1",
                "licences": [],
                "acl": [],
                groups: []
            },
            "lisa@kund2": {
                "username": "lisa@kund2",
                "licences": [],
                "acl": [],
                groups: []
            },
            "autodesk": {
                "username": "autodesk",
                "licences": [],
                "acl": [
                    {
                        "resource": "/validator/([^/]+)/jobs",
                        "permissions": ["post"]
                    }
                ],
                groups: []
            },
            "jörgen@tyrens": {
                "username": "jörgen@tyrens",
                "licences": [],
                "acl": [],
                groups: []
            }
        },

        "licences": {
            lic1: {
                valid: {from:"not_implemented", to:"not_implemented"},
                "acl": [
                    {
                        "resource": "/validator/kund1/jobs",
                        "permissions": ["post"]
                    }
                ]
            },
            lic2: {
                valid: {from:"not_implemented", to:"not_implemented"},
                "acl": [
                    {
                        "resource": "/validator/kund2/jobs",
                        "permissions": ["post"]
                    }
                ]
            }
        },

        "passwords": {
            "pelle@kund1": 'pelle',
            "lisa@kund2": 'lisa',
            "autodesk": 'autodesk',
            "jörgen@tyrens": "jörgen"
        }
    };


    function getAllUsers() {
        return settings.users;
    }

    initUsers(settings);
    console.log('Done init users in system:', JSON.stringify(getAllUsers(), null, 4));

    module.exports = {
        getAuthenticatedUser: getAuthenticatedUser,
        getAllUsers: getAllUsers
    }
})()
