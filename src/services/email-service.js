'use strict';

var config = require('../config');
var sendGrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendGrid.send({
        to: to,
        from: 'hello@brunocosta.com',
        subject: subject,
        html: body
    });
};