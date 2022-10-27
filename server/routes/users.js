/* app.css - Nhat Phuc Nguyen - 301157980 - September/28/2022 */
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
