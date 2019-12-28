const nodemailer = require("nodemailer"),
      router     = require('express').Router(),
      config     = require('./config'),
      util       = require('util'),
      Recaptcha  = require('recaptcha-v2').Recaptcha;

router.post('/contact', (req, res, next) => {
    let data = {
        remoteip:  req.connection.remoteAddress,
        response:  req.body["g-recaptcha-response"],
        secret: config.recaptcha.privateKey
    };
    let recaptcha = new Recaptcha(config.recaptcha.siteKey, config.recaptcha.privateKey, data);

    recaptcha.verify(function(success, error_code) {
        if (success) {
            let transporter = nodemailer.createTransport(config.email);
            let mail = {
                from: 'Contato <contact@fernandopicoral.com>',
                to: ['fernandopicoral@gmail.com'],
                replyTo: req.body.email,
                subject: '[CONTATO] Nova mensagem em fernandopicoral.com',
                text: util.format('' +
                    'Nova mensagem no site fernandopicoral.com\n' +
                    '\n' +
                    'Página: fernandopicoral.com/contact,\n' +
                    'Nome: %s\n' +
                    'Email: %s\n' +
                    '\n' +
                    'Mensagem:\n' +
                    '%s', req.body.name, req.body.email, req.body.message)
            };
            //TODO Send confirmation email to sender with html and sanitize input
            transporter.sendMail(mail, function (err, info) {
                //Handle contact feedback
                let message, textColorClass;
                if(err) {
                    message = 'Your message couldn\'t be delivered. Error ' + err.code;
                    textColorClass = 'text-danger';
                } else {
                    message = 'Your message was submitted!';
                    textColorClass = 'text-success';
                }
                let contact = {
                    message: message,
                    class: textColorClass
                };
                res.redirect('/?contact=' + encodeURI(JSON.stringify(contact)));
            });
        }
        else {
            // Redisplay the form. TODO Redisplay with the fields filled in as they were before
            let contact = {
                message: 'Your message couldn\'t be delivered due to the missing captcha.',
                class: 'text-danger'
            };
            res.redirect('/?contact=' + encodeURI(JSON.stringify(contact)));
        }
    });
});

module.exports = router;