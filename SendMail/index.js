const nodemailer = require("nodemailer");

const emailFrom = "yarmolik.test@gmail.com";
const password = "yarmolik123";
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: emailFrom,
        pass: password
    },
});

function send(emailTo, mail) {
    const option = {
        from: emailFrom,
        to: emailTo,
        subject: "Send function",
        text: mail,
    };

    transport.sendMail(option, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

module.exports = send;