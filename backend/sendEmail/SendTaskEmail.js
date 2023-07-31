const nodemailer = require('nodemailer');

const SendTaskEmail = async (taskData, employeeName, managerName) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: taskData.email,
            subject: 'EMS Task',
            text: `Dear ${employeeName},\n\n You are assigned a task!\n\nTask Details:\n\nTitle: ${taskData.title}\n\nDescription: ${taskData.desc}\n\nDeadline: ${taskData.deadline}\n\nThanks,\n${managerName}`,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending task email:', error);
        throw new Error('EmailError');
    }
};

module.exports = { SendTaskEmail };