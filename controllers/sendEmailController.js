const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        let testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        await transporter.sendMail({
            from: 'foo@example.com',
            to: email,
            subject: subject,
            text: text
        });

        console.log('Email sent');

    } catch (error) {
        console.log(error);
    }
};

/**
 * @param {string} email
 * @param {string} subject
 * @param {string} text
 * @returns {Promise<void>}
 * (async () => { 
 *  await sendEmail('vishwas.acharya@volansys.com', 'Hello ✔', 'Test'); 
 * });
 */

module.exports = sendEmail;