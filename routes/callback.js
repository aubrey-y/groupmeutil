var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    if(req.body["text"] === "@everyone") {
        //tag everyone
    }
});

module.exports = router;
