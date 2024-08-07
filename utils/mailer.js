const nodemailer = require('nodemailer');
const User = require('../models/User');
const CError = require('../c_errors/CError');
require('dotenv').config();

const generateOTP = () => {
    let randomNumber = Math.random();
    let otp = Math.floor(randomNumber * 10000);
    if (otp < 10000) {
        otp += 10000;
    }
    return otp;
}

const sendMail = async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user)
        return next(new CError('NOT_FOUND'));
    // try {
    const OTP = generateOTP();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Test Mail',
        html: `<h1>Please verify your email address by entering OTP - ${OTP}</h1>`,
    };
    const response = await transporter.sendMail(mailOptions);
    if (response.response.includes('OK')) {
        req.session.email = email;
        req.session.verify_otp = OTP;
        console.log(req.session.verify_otp, '===');
        return res.status(200).send({ message: 'Send mail success' });
    }
    // } catch (error) {
    //     console.log(error);
    //     return res.status(400).send({ message: 'Send mail fail' });
    // }
};

const verifyOTP = async (req, res) => {
    const { otp } = req.body;
    // console.log('Session verify_otp:', req.session.verify_otp, otp);
    if (req.session.verify_otp == otp) {
        await User.findOneAndUpdate({ email: req.session.email }, { is_email_verified: true });
        return res.status(200).send({ message: 'Verify OTP success' });
    } else {
        return res.status(400).send({ message: 'Verify OTP fail' });
    }

};

module.exports = {
    sendMail,
    verifyOTP,
};
