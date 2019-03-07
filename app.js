const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./models/index.js')

const path = require('path');

app.use(morgan('dev'));


app.use(express.static(path.join(__dirname, './public')));

const layout = require('./views/layout.js')


app.get('/', (req, res) => {
    console.log('this is ' + db);
    res.send(layout('hi'));
})





const PORT = 3000;

app.listen(PORT, () => {
    console.log('I am listening on port:' + PORT);
})