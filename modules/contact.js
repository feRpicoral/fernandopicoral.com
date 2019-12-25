const nodemailer = require("nodemailer"),
      router     = require('express').Router(),
      config     = require('./config'),
      util       = require('util');

router.post('/contact', (req, res) => {
    let transporter = nodemailer.createTransport(config.email);
    let mail = {
        from: 'contact@fernandopicoral.com',
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
    //TODO Send confirmation email to sender with html
    transporter.sendMail(mail, function (err, info) {
        //Handle contact feedback
        let message, textColorClass;
        if(err) {
            console.log(err);
            message = 'Your message couldn\'t be delivered. Error ' + err.code;
            textColorClass = 'text-danger';
        } else {
            console.log(info);
            message = 'Your message was submitted!';
            textColorClass = 'text-success';
        }
        let contact = {
            message: message,
            class: textColorClass
        };
        res.redirect('/?contact=' + encodeURI(JSON.stringify(contact)));
    });
});

module.exports = router;