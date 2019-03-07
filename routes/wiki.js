const express = require('express');
const router = express.Router();
const { addPage } = require('../views');

router.use(express.bodyParser());


router.get('/', (req, res, next) => {
  res.send('got to get WIKI');
});

router.post('/add', (req, res, next) => {
  console.log(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
