const nodemailer = require('nodemailer');
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
    // const { email } = req.body;
    // console.log(email);
    try {
        const OTP = generateOTP();
        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASSWORD,
        //     },
        // });
        // const mailOptions = {
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: 'Test Mail',
        //     html: `<h1>Please verify your email address by entering OTP - ${OTP}</h1>`,
        // };
        // const response = await transporter.sendMail(mailOptions);
        // if (response.response.includes('OK')) {
        req.session.verify_otp = OTP;
        console.log(req.session.verify_otp, '===');
        res.status(200).json({ msg: "Mail Sent", "otp": req.session.verify_otp });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Send mail fail' });
    }
};

const verifyOTP = (req, res) => {
    // console.log('Session verify_otp:', req.session.verify_otp);
    // return res.json({ 'Session_verify_otp': req.session.verify_otp })
    console.log(req.session.verify_otp);
    if (req.session.verify_otp) {
        res.json(`Welcome ${req.session.verify_otp}, this is your profile page.`);
    } else {
        res.status(401).send('Unauthorized. Please log in.');
    }

};

module.exports = {
    sendMail,
    verifyOTP,
};


// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // In a real application, you would validate username and password
    // and set up session data upon successful authentication.
    // For demonstration, we'll assume any non-empty username and password is valid.
    console.log(username, password, req.body, "===");
    if (username && password) {
        req.session.user = username;  // Save username in session
        res.status(200).send('Logged in successfully!');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Profile route
// router.post('/profile', (req, res) => {
//     console.log(req.session.user);
//     if (req.session.user) {
//         res.send(`Welcome ${req.session.user}, this is your profile page.`);
//     } else {
//         res.status(401).send('Unauthorized. Please log in.');
//     }
// });
router.post('/profile', (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.send(`Welcome ${req.session.user}, this is your profile page.`);
    } else {
        res.status(401).send('Unauthorized. Please log in.');
    }
});