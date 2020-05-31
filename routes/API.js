var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/calculate', function(req, res, next) {
  console.log("triggered");
  console.log(req.body)
  let total = req.body.price; 
  let discount = req.body.discount;
  let tax = req.body.tax;
  res.send({price:total*tax*(1-discount)});
});

module.exports = router;
