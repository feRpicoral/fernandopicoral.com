const nodemailer = require("nodemailer"),
      router     = require('express').Router(),
      config     = require('./config'),
      util       = require('util'),
      recaptchaV2  = require('recaptcha-v2').Recaptcha;

/*
    * Returns the a URI-ready feedback for the contact form.
    *
    * @param {String} message Text to be displayed as feedback
    * @param {String} color Color of the text. Red, blue, or green.
    *
    * @return {Object} URI encoded JSON object with keys 'message' and 'class'
    */
function getUriFeedback(message, color) {
    let c;
    switch (color.toLowerCase()) {
        case 'red':
        case 'text-danger':
            c = 'text-danger';
            break;
        case 'blue':
        case 'text-primary':
            c = 'text-primary';
            break;
        default:
        case 'green':
        case 'text-success':
            c = 'text-success'
    }

    let contact = {
        message: message,
        class: c
    };

    return encodeURI(JSON.stringify(contact));
}

class Sanitize {
    static email(email) {
        email = String(email).toLowerCase();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    static name(name) {
        name = String(name).toString();
        return !(
            //Conditions to set the name as invalid
            name.length < 2 ||
            /[^a-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]+/ig.test(name) === true
        );
    }
    static message(msg) {
        msg = String(msg).toString();
        return !(
            //Conditions to set the message as invalid
            !msg ||
            /[a-z]+/ig.test(msg) === false
        );
    }
    static isInputValid(email, name, message) {
        const s = Sanitize;
        return s.email(email) && s.name(name) && s.message(message);
    }
}

router.post('/', (req, res, next) => {

    req.body.name = req.body.name.toLowerCase();
    req.body.email = req.body.email.toLowerCase();

    let recaptcha = new recaptchaV2(config.recaptcha.siteKey, config.recaptcha.privateKey, {
        remoteip: req.connection.remoteAddress,
        response: req.body["g-recaptcha-response"],
        secret: config.recaptcha.privateKey
    });

    function sendMessage() {
        if (Sanitize.isInputValid(req.body.email, req.body.name, req.body.message)) {
            let transporter = nodemailer.createTransport(config.email);

            const mail = {
                from: 'Contato <contact@fernandopicoral.com>',
                to: ['fernandopicoral@gmail.com'],
                replyTo: req.body.email,
                subject: '[CONTATO] Nova mensagem em fernandopicoral.com',
                text: util.format(
                    'Nova mensagem no site fernandopicoral.com\n\nPágina: fernandopicoral.com/contact,\nNome: %s\nEmail: %s\n\nMensagem:\n%s',
                    req.body.name, req.body.email, req.body.message
                )
            };

            transporter.sendMail(mail, (err, info) => {
                if (err) {
                    res.redirect('/?contact=' + getUriFeedback("Your message couldn't be delivered. Error: " + err, "red"));
                } else {
                    sendConfirmationEmail();
                }
            });
            transporter.close();
        } else {
            //TODO Specify which input had invalid chars
            res.redirect('/?contact=' + getUriFeedback("Your message couldn't be delivered due to invalid characters on the input.", "red"));
        }
    }

    function sendConfirmationEmail() {
        let transporter = nodemailer.createTransport(config.email);

        let mail = {
            from: 'Contact <noreply@fernandopicoral.com>',
            to: [req.body.email],
            subject: 'Thank you for your message!',
            text: 'Your browser doesn\'t support HTML emails.\n\nWe have received your message at fernandopicoral.com and will respond as soon as possible!\n\nThank you!',
            html: "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\" style=\"heigth: 100%;\"><head> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"> <style>@font-face{font-family: 'Lato'; font-style: normal; font-weight: 400; font-display: swap; src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf) format('truetype');}@font-face{font-family: 'Poppins'; font-style: normal; font-weight: 500; font-display: swap; src: local('Poppins Medium'), local('Poppins-Medium'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLGT9Z1xlEA.ttf) format('truetype');}@font-face{font-family: 'Poppins'; font-style: normal; font-weight: 600; font-display: swap; src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlEA.ttf) format('truetype');}@font-face{font-family: 'Poppins'; font-style: normal; font-weight: 700; font-display: swap; src: local('Poppins Bold'), local('Poppins-Bold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLCz7Z1xlEA.ttf) format('truetype');}@media screen and (max-width: 576px){.icon{display: none;}}</style> <style type=\"text/css\"> .ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:150%}a{text-decoration:none}@media screen and (max-width: 600px){table.row th.col-lg-1,table.row th.col-lg-2,table.row th.col-lg-3,table.row th.col-lg-4,table.row th.col-lg-5,table.row th.col-lg-6,table.row th.col-lg-7,table.row th.col-lg-8,table.row th.col-lg-9,table.row th.col-lg-10,table.row th.col-lg-11,table.row th.col-lg-12{display:block;width:100% !important}.d-mobile{display:block !important}.d-desktop{display:none !important}.w-lg-25{width:auto !important}.w-lg-25>tbody>tr>td{width:auto !important}.w-lg-50{width:auto !important}.w-lg-50>tbody>tr>td{width:auto !important}.w-lg-75{width:auto !important}.w-lg-75>tbody>tr>td{width:auto !important}.w-lg-100{width:auto !important}.w-lg-100>tbody>tr>td{width:auto !important}.w-lg-auto{width:auto !important}.w-lg-auto>tbody>tr>td{width:auto !important}.w-25{width:25% !important}.w-25>tbody>tr>td{width:25% !important}.w-50{width:50% !important}.w-50>tbody>tr>td{width:50% !important}.w-75{width:75% !important}.w-75>tbody>tr>td{width:75% !important}.w-100{width:100% !important}.w-100>tbody>tr>td{width:100% !important}.w-auto{width:auto !important}.w-auto>tbody>tr>td{width:auto !important}.p-lg-0>tbody>tr>td{padding:0 !important}.pt-lg-0>tbody>tr>td,.py-lg-0>tbody>tr>td{padding-top:0 !important}.pr-lg-0>tbody>tr>td,.px-lg-0>tbody>tr>td{padding-right:0 !important}.pb-lg-0>tbody>tr>td,.py-lg-0>tbody>tr>td{padding-bottom:0 !important}.pl-lg-0>tbody>tr>td,.px-lg-0>tbody>tr>td{padding-left:0 !important}.p-lg-1>tbody>tr>td{padding:0 !important}.pt-lg-1>tbody>tr>td,.py-lg-1>tbody>tr>td{padding-top:0 !important}.pr-lg-1>tbody>tr>td,.px-lg-1>tbody>tr>td{padding-right:0 !important}.pb-lg-1>tbody>tr>td,.py-lg-1>tbody>tr>td{padding-bottom:0 !important}.pl-lg-1>tbody>tr>td,.px-lg-1>tbody>tr>td{padding-left:0 !important}.p-lg-2>tbody>tr>td{padding:0 !important}.pt-lg-2>tbody>tr>td,.py-lg-2>tbody>tr>td{padding-top:0 !important}.pr-lg-2>tbody>tr>td,.px-lg-2>tbody>tr>td{padding-right:0 !important}.pb-lg-2>tbody>tr>td,.py-lg-2>tbody>tr>td{padding-bottom:0 !important}.pl-lg-2>tbody>tr>td,.px-lg-2>tbody>tr>td{padding-left:0 !important}.p-lg-3>tbody>tr>td{padding:0 !important}.pt-lg-3>tbody>tr>td,.py-lg-3>tbody>tr>td{padding-top:0 !important}.pr-lg-3>tbody>tr>td,.px-lg-3>tbody>tr>td{padding-right:0 !important}.pb-lg-3>tbody>tr>td,.py-lg-3>tbody>tr>td{padding-bottom:0 !important}.pl-lg-3>tbody>tr>td,.px-lg-3>tbody>tr>td{padding-left:0 !important}.p-lg-4>tbody>tr>td{padding:0 !important}.pt-lg-4>tbody>tr>td,.py-lg-4>tbody>tr>td{padding-top:0 !important}.pr-lg-4>tbody>tr>td,.px-lg-4>tbody>tr>td{padding-right:0 !important}.pb-lg-4>tbody>tr>td,.py-lg-4>tbody>tr>td{padding-bottom:0 !important}.pl-lg-4>tbody>tr>td,.px-lg-4>tbody>tr>td{padding-left:0 !important}.p-lg-5>tbody>tr>td{padding:0 !important}.pt-lg-5>tbody>tr>td,.py-lg-5>tbody>tr>td{padding-top:0 !important}.pr-lg-5>tbody>tr>td,.px-lg-5>tbody>tr>td{padding-right:0 !important}.pb-lg-5>tbody>tr>td,.py-lg-5>tbody>tr>td{padding-bottom:0 !important}.pl-lg-5>tbody>tr>td,.px-lg-5>tbody>tr>td{padding-left:0 !important}.p-0>tbody>tr>td{padding:0 !important}.pt-0>tbody>tr>td,.py-0>tbody>tr>td{padding-top:0 !important}.pr-0>tbody>tr>td,.px-0>tbody>tr>td{padding-right:0 !important}.pb-0>tbody>tr>td,.py-0>tbody>tr>td{padding-bottom:0 !important}.pl-0>tbody>tr>td,.px-0>tbody>tr>td{padding-left:0 !important}.p-1>tbody>tr>td{padding:4px !important}.pt-1>tbody>tr>td,.py-1>tbody>tr>td{padding-top:4px !important}.pr-1>tbody>tr>td,.px-1>tbody>tr>td{padding-right:4px !important}.pb-1>tbody>tr>td,.py-1>tbody>tr>td{padding-bottom:4px !important}.pl-1>tbody>tr>td,.px-1>tbody>tr>td{padding-left:4px !important}.p-2>tbody>tr>td{padding:8px !important}.pt-2>tbody>tr>td,.py-2>tbody>tr>td{padding-top:8px !important}.pr-2>tbody>tr>td,.px-2>tbody>tr>td{padding-right:8px !important}.pb-2>tbody>tr>td,.py-2>tbody>tr>td{padding-bottom:8px !important}.pl-2>tbody>tr>td,.px-2>tbody>tr>td{padding-left:8px !important}.p-3>tbody>tr>td{padding:16px !important}.pt-3>tbody>tr>td,.py-3>tbody>tr>td{padding-top:16px !important}.pr-3>tbody>tr>td,.px-3>tbody>tr>td{padding-right:16px !important}.pb-3>tbody>tr>td,.py-3>tbody>tr>td{padding-bottom:16px !important}.pl-3>tbody>tr>td,.px-3>tbody>tr>td{padding-left:16px !important}.p-4>tbody>tr>td{padding:24px !important}.pt-4>tbody>tr>td,.py-4>tbody>tr>td{padding-top:24px !important}.pr-4>tbody>tr>td,.px-4>tbody>tr>td{padding-right:24px !important}.pb-4>tbody>tr>td,.py-4>tbody>tr>td{padding-bottom:24px !important}.pl-4>tbody>tr>td,.px-4>tbody>tr>td{padding-left:24px !important}.p-5>tbody>tr>td{padding:48px !important}.pt-5>tbody>tr>td,.py-5>tbody>tr>td{padding-top:48px !important}.pr-5>tbody>tr>td,.px-5>tbody>tr>td{padding-right:48px !important}.pb-5>tbody>tr>td,.py-5>tbody>tr>td{padding-bottom:48px !important}.pl-5>tbody>tr>td,.px-5>tbody>tr>td{padding-left:48px !important}.s-lg-1>tbody>tr>td,.s-lg-2>tbody>tr>td,.s-lg-3>tbody>tr>td,.s-lg-4>tbody>tr>td,.s-lg-5>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-0>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-1>tbody>tr>td{font-size:4px !important;line-height:4px !important;height:4px !important}.s-2>tbody>tr>td{font-size:8px !important;line-height:8px !important;height:8px !important}.s-3>tbody>tr>td{font-size:16px !important;line-height:16px !important;height:16px !important}.s-4>tbody>tr>td{font-size:24px !important;line-height:24px !important;height:24px !important}.s-5>tbody>tr>td{font-size:48px !important;line-height:48px !important;height:48px !important}}@media yahoo{.d-mobile{display:none !important}.d-desktop{display:block !important}.w-lg-25{width:25% !important}.w-lg-25>tbody>tr>td{width:25% !important}.w-lg-50{width:50% !important}.w-lg-50>tbody>tr>td{width:50% !important}.w-lg-75{width:75% !important}.w-lg-75>tbody>tr>td{width:75% !important}.w-lg-100{width:100% !important}.w-lg-100>tbody>tr>td{width:100% !important}.w-lg-auto{width:auto !important}.w-lg-auto>tbody>tr>td{width:auto !important}.p-lg-0>tbody>tr>td{padding:0 !important}.pt-lg-0>tbody>tr>td,.py-lg-0>tbody>tr>td{padding-top:0 !important}.pr-lg-0>tbody>tr>td,.px-lg-0>tbody>tr>td{padding-right:0 !important}.pb-lg-0>tbody>tr>td,.py-lg-0>tbody>tr>td{padding-bottom:0 !important}.pl-lg-0>tbody>tr>td,.px-lg-0>tbody>tr>td{padding-left:0 !important}.p-lg-1>tbody>tr>td{padding:4px !important}.pt-lg-1>tbody>tr>td,.py-lg-1>tbody>tr>td{padding-top:4px !important}.pr-lg-1>tbody>tr>td,.px-lg-1>tbody>tr>td{padding-right:4px !important}.pb-lg-1>tbody>tr>td,.py-lg-1>tbody>tr>td{padding-bottom:4px !important}.pl-lg-1>tbody>tr>td,.px-lg-1>tbody>tr>td{padding-left:4px !important}.p-lg-2>tbody>tr>td{padding:8px !important}.pt-lg-2>tbody>tr>td,.py-lg-2>tbody>tr>td{padding-top:8px !important}.pr-lg-2>tbody>tr>td,.px-lg-2>tbody>tr>td{padding-right:8px !important}.pb-lg-2>tbody>tr>td,.py-lg-2>tbody>tr>td{padding-bottom:8px !important}.pl-lg-2>tbody>tr>td,.px-lg-2>tbody>tr>td{padding-left:8px !important}.p-lg-3>tbody>tr>td{padding:16px !important}.pt-lg-3>tbody>tr>td,.py-lg-3>tbody>tr>td{padding-top:16px !important}.pr-lg-3>tbody>tr>td,.px-lg-3>tbody>tr>td{padding-right:16px !important}.pb-lg-3>tbody>tr>td,.py-lg-3>tbody>tr>td{padding-bottom:16px !important}.pl-lg-3>tbody>tr>td,.px-lg-3>tbody>tr>td{padding-left:16px !important}.p-lg-4>tbody>tr>td{padding:24px !important}.pt-lg-4>tbody>tr>td,.py-lg-4>tbody>tr>td{padding-top:24px !important}.pr-lg-4>tbody>tr>td,.px-lg-4>tbody>tr>td{padding-right:24px !important}.pb-lg-4>tbody>tr>td,.py-lg-4>tbody>tr>td{padding-bottom:24px !important}.pl-lg-4>tbody>tr>td,.px-lg-4>tbody>tr>td{padding-left:24px !important}.p-lg-5>tbody>tr>td{padding:48px !important}.pt-lg-5>tbody>tr>td,.py-lg-5>tbody>tr>td{padding-top:48px !important}.pr-lg-5>tbody>tr>td,.px-lg-5>tbody>tr>td{padding-right:48px !important}.pb-lg-5>tbody>tr>td,.py-lg-5>tbody>tr>td{padding-bottom:48px !important}.pl-lg-5>tbody>tr>td,.px-lg-5>tbody>tr>td{padding-left:48px !important}.s-lg-0>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-lg-1>tbody>tr>td{font-size:4px !important;line-height:4px !important;height:4px !important}.s-lg-2>tbody>tr>td{font-size:8px !important;line-height:8px !important;height:8px !important}.s-lg-3>tbody>tr>td{font-size:16px !important;line-height:16px !important;height:16px !important}.s-lg-4>tbody>tr>td{font-size:24px !important;line-height:24px !important;height:24px !important}.s-lg-5>tbody>tr>td{font-size:48px !important;line-height:48px !important;height:48px !important}}</style></head><body style=\"outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; padding: 0; border: 0;\"><div class=\"preview\" style=\"display: none; max-height: 0px; overflow: hidden;\"> We received your message!                                                                           </div><table valign=\"top\" class=\"bg-light body\" style=\"outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; margin: 0; padding: 0; border: 0;\" bgcolor=\"#f8f9fa\"> <tbody> <tr> <td valign=\"top\" style=\"border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 16px; margin: 0;\" align=\"left\" bgcolor=\"#f8f9fa\"> <table class=\"container\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; width: 100%;\"> <tbody> <tr> <td align=\"center\" style=\"border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;\"><!--[if (gte mso 9)|(IE)]> <table align=\"center\"> <tbody> <tr> <td width=\"600\"><![endif]--> <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse; width: 100%; max-width: 600px; margin: 0 auto;\"> <tbody> <tr> <td style=\"border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 16px; margin: 0;\" align=\"left\"> <table class=\"p-0\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse;\"> <tbody> <tr> <td style=\"border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 16px; margin: 0; padding: 0;\" align=\"left\"> <div class=\"wrap center-screen \" style=\"margin-top: 3rem; margin-bottom: 3rem; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 2px solid #171a1d;\" align=\"center\"> <table class=\"p-5\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family: Helvetica, Arial, sans-serif; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-spacing: 0px; border-collapse: collapse;\"> <tbody> <tr> <td style=\"border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 16px; margin: 0; padding: 48px;\" align=\"left\"> <div class=\"\"> <h1 id=\"logo\" class=\"text-center\" style=\"margin-top: 0; margin-bottom: 0; font-weight: 500; color: inherit; vertical-align: baseline; font-size: 70px; line-height: 43.2px; font-family: 'Poppins', sans-serif;\" align=\"center\"> <span class=\"icon\" style=\"color: #159ce4;\">&lt;</span> Picoral <span class=\"icon\" style=\"color: #159ce4;\">/</span><span class=\"icon\" style=\"color: #159ce4;\">&gt;</span> </h1> <table class=\"s-4 w-100\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%;\"> <tbody> <tr> <td height=\"24\" style=\"border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;\" align=\"left\">   </td></tr></tbody> </table> <h2 id=\"sub-title\" class=\"text-center \" style=\"margin-top: 0; margin-bottom: 0; font-weight: 100; color: inherit; vertical-align: baseline; font-size: 25px; line-height: 38.4px;\" align=\"center\">We received your message</h2> <table class=\"s-5 w-100\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%;\"> <tbody> <tr> <td height=\"48\" style=\"border-spacing: 0px; border-collapse: collapse; line-height: 48px; font-size: 48px; width: 100%; height: 48px; margin: 0;\" align=\"left\">   </td></tr></tbody> </table> <p class=\"lead text-center\" style=\"line-height: 24px; font-size: 16px; font-weight: 100; margin: 0;\" align=\"center\">We just wanted to let you know that we received the message you sent us. We will reply to it as soon as possible! Below you can find a copy of your message if you are not remembering it.</p><table class=\"s-5 w-100\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%;\"> <tbody> <tr> <td height=\"48\" style=\"border-spacing: 0px; border-collapse: collapse; line-height: 48px; font-size: 48px; width: 100%; height: 48px; margin: 0;\" align=\"left\">   </td></tr></tbody> </table> <p class=\"name text-center\" style=\"line-height: 24px; font-size: 35px; margin: 0;\" align=\"center\"><strong><span>NAME_HOLDER</span>'s</strong> message:</p><table class=\"s-4 w-100\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%;\"> <tbody> <tr> <td height=\"24\" style=\"border-spacing: 0px; border-collapse: collapse; line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;\" align=\"left\">   </td></tr></tbody> </table> <p class=\"message \" style=\"line-height: 24px; font-size: 16px; font-weight: 100; margin: 0;\" align=\"justify\">MESSAGE_HOLDER</p></div></td></tr></tbody> </table> </div></td></tr></tbody> </table> </td></tr></tbody> </table><!--[if (gte mso 9)|(IE)]> </td></tr></tbody> </table><![endif]--> </td></tr></tbody> </table> </td></tr></tbody></table></body></html>"
        };

        mail.html = mail.html.replace("NAME_HOLDER", req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).split(' ')[0]);
        mail.html = mail.html.replace("MESSAGE_HOLDER", req.body.message);

        transporter.sendMail(mail, (err, info) => {
            if (err) {
                const date  = new Date(),
                      sec   = String(date.getSeconds()),
                      min   = String(date.getMinutes()),
                      day   = String(date.getDate()).padStart(2, '0'),
                      month = String(date.getMonth() + 1).padStart(2, '0'),
                      year  = date.getFullYear().toString().substr(-2);

                console.log(util.format("[%s/%s/%s - %s:%s] A contact confirmation message couldn't be delivered to '%s'. Error: %s",
                    month, day, year, req.body.email, err));
            }
        });
        transporter.close();
    }

    recaptcha.verify((success, error_code) => {
        if (success) {
            sendMessage();
            next();
        } else {
            res.redirect('/?contact=' + getUriFeedback("Your message couldn't be delivered due to a captcha error. Error: " + error_code, "red"));
        }
    });

}, (req, res) => {
    res.redirect('/?contact=' + getUriFeedback('Your message was submitted!', 'green'));
});

module.exports = router;