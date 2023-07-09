const nodemailer = require("nodemailer");

require("dotenv").config();

const { MAIL_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "mailformail969@meta.ua",
    pass: MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const email = { ...data };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
