const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const { Page } = require('../models');


router.get('/add', (req, res, next) => {
  res.send(addPage());
});


router.get('/', (req, res, next) => {
  res.send('got to get WIKI');
});


router.post('/', async (req, res, next) => {
  

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: 0,
  })

  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
