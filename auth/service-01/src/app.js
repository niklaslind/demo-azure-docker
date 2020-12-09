const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

app.use(bodyParser.json());

app.post('/testservice', (req, res) => {
  console.log('/testservice', req.body)
  res.json({
    demoapp01: {
      status: 'ok',
      body: req.body
    }
  });
});



const port = process.env.PORT || 3002;
app.listen(
  port,
  () => { console.log(`deemoapp01 listening to port: ${port}`); }
);
