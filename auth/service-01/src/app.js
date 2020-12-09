const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

app.use(bodyParser.json());


app.post('/validator/:group/jobs',
         function(req, res, next) {
           console.log('New job for group', req.params.group);
           return res.json({ message: 'Job is enqueued' });
         });

app.post('/validator/ifcrules',
         function(req, res, next) {
           console.log('Rule uploaded');
           return res.json({ message: 'Rule uploaded' });
         });






const port = process.env.PORT || 3001;
app.listen(
  port,
  () => { console.log(`service-01 listening to port: ${port}`); }
);
