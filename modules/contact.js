const nodemailer = require("nodemailer"),
      router     = require('express').Router(),
      config     = require('./config');

router.get('/', (req, res) => {
    res.send(config)
});

module.exports = router;