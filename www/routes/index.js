var express = require('express');
var router = express.Router();

let currentColors = require('../data/default.json')
//console.log(currentColors)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Thematic Color Manager',
    colors: currentColors
  });
});

router.get('/theme', function(req, res, next) {
  res.send({
    colors: currentColors
  });
});

const isHex = (val) => /^[\da-fA-F]+$/.test(val);

router.post('/', function(req, res, next) {
  const newColors = req.body
  for (let key in newColors) {
    let value = newColors[key]
    if (isHex(value) && (value.length == 3 || value.length == 6)) {
      currentColors[key] = value;
    }
  }
  res.redirect('/')
});

module.exports = router;
