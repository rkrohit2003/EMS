const nodemailer = require('nodemailer');

const SendNotificationEmail = async (notificationMessage, users, managerName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // Loop through all users and send the notification email
    for (const user of users) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'EMS Notification',
        text: `Dear ${user.name},\n\n ${notificationMessage}!\n\nThanks,\n${managerName}`,
      };

      await transporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw new Error('EmailError');
  }
};

module.exports = { SendNotificationEmail };