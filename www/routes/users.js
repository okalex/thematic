const express = require('express');
const router = express.Router();
const path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// const userTheme = (req, res, next) => {
//   const user = req.params.user
//   const theme = req.params.theme || 'default'
//   const themeFilename = path.resolve(__dirname + '/../themes/' + theme + '.zip');
//   console.log('User: ' + user + ', theme: ' + theme);
//   console.log('Theme filename = ' + themeFilename);
//   //res.send('User: ' + user + ', theme: ' + theme);
//
//   res.sendFile(themeFilename);
// }
//
// router.get('/:user/theme', userTheme)
// router.get('/:user/theme/:theme', userTheme)

module.exports = router;
