const router  = require('express').Router(); // Express router

// Index GET request handling
router.get('/', (req, res, next) => {
    //Show contact feedback if present
    if (req.query.contact) {
        res.render('index', {contact: JSON.parse(decodeURI(req.query.contact))});
    } else {
        res.render('index');
    }
    // next("router");
});

// Handling for 404 (not found) error
router.get('*', (req, res, next) => {
    res.status(404).render('templates/error', {err: 404});
    // next();
});

module.exports = router;