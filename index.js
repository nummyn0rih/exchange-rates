const Express = require('express');
const bodyParser = require('body-parser');

const app = new Express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200);
  res.send('hello');
});

module.exports = app;
