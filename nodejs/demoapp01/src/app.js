const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

app.use(bodyParser.json());

app.get('/demo01', (req, res) => {
  res.json({
    demoapp01: {
      status: 'ok'
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



