const express = require('express');
const app = express();
const morgan = require('morgan');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser')

const path = require('path');

app.use(bodyParser.urlencoded());
// app.use(express.urlencoded({extended: false}))

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './public')));

const layout = require('./views/layout.js');

app.use('/wiki', wikiRouter);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 3000;

const init = async () => {
  await models.db.sync();
  // models.db.sync({force: true}); Drops and recreates all tables.

  app.listen(PORT, () => {
    console.log('I am listening on port:' + PORT);
  });
};

init();
