const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {

        user: process.env.SENDING_EMAIL_FROM,
        pass: process.env.SENDING_EMAIL_APP_CODE
    }
});




const sendmail_forget_password = async (toEmail, currentUserId, temToken) => {
    const info = await transporter.sendMail({
        from: process.env.SENDING_EMAIL_FROM,
        to: toEmail,
        subject: 'Reset Your Password!',
        text: `${process.env.FRONTEND_SERVER_ADDRESS}/resetpassword/${currentUserId}/${temToken}`  /// KEEP THIS CORRECT COZ IT WILL BE IN URL TO SHOW resetpassword page
    })


    return info


}


const sendmail_Email_verification = async (toEmail, currentUserId, temToken) => {
    const info = await transporter.sendMail({
        from: process.env.SENDING_EMAIL_FROM,
        to: toEmail,
        subject: 'Email Verification!',
        text: `${process.env.FRONTEND_SERVER_ADDRESS}/emailverification/${currentUserId}/${temToken}`  /// KEEP THIS CORRECT COZ IT WILL BE IN URL TO SHOW resetpassword page
    })


    return info


}



module.exports = { sendmail_forget_password, sendmail_Email_verification }