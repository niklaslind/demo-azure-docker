const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

app.use(bodyParser.json());

app.post('/demo01', (req, res) => {
  console.log('/demo01')
  res.json({
    demoapp01: {
      status: 'ok'
    }
  });
});


app.post('/signin', (req, res) => {
  console.log('/signin', req.body)
  res.json({
    demoapp01: {
      status: 'ok',
      body: req.body
    }
  });
});


app.get('/auth', (req, res) => {
  console.log('/auth', JSON.stringify(req.headers, null, 4));
  res.status(200).json({
    demoapp01: {
      status: 'auth ok'
    }
  });
});

app.get('/**/', (req, res) => {
  console.log('got /**/')
  res.json({
    demoapp01: {
      status: '* ok'
    }
  });
});


const port = process.env.DEMOAPP01_PORT || process.env.PORT || 3001;
if (port) {
  app.listen(
    port,
    () => { console.log(`deemoapp01 listening to port: ${port}`); }
  );
} else {
  console.log(`Environment variable \`TAMBUR_CASE_PORT' nor \`PORT' set. Exiting!`);
}
