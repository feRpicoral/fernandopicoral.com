const express = require('express'),
      router  = express.Router();

router.get('/', (req, res, next) => {
    //Show contact feedback if present
    if (req.query.contact) {
        res.render('index', {contact: JSON.parse(decodeURI(req.query.contact))});
    } else {
        res.render('index');
    }
});

router.get('*', (req, res) => {
    res.status(404).render('templates/error', {err: 404});
});

module.exports = router;