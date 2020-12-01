const _ = require('lodash'),
      cli = require('cli'),
      cliOptions = cli.parse(
          {
              listTickets: ['l', 'List tickets'],
              betweenTags: ['b', 'List between fromTag...toTag', 'string'],
              trackTicket: ['t', 'Track ticket', 'string']
          }
      );

console.log(cliOptions);
