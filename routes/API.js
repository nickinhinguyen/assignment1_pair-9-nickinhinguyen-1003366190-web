var express = require('express');
var router = express.Router();

/* A simple Api that receive a price, discount, tax and compute the result, return result back to user */
router.post('/calculate', function(req, res, next) {
  let total = req.body.price; 
  let discount = req.body.discount;
  let tax = req.body.tax;
  res.send({price:total*tax*(1-discount)});
});

module.exports = router;
