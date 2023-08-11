import nodemailer from "nodemailer";
const { UKRNET_PASSWORD = "", UKRNET_LOGIN = "" } = process.env;

type IEmailData = {
  to: string;
  subject: string;
  html: string;
};

const config = {
  host: "smtp.ukr.net",
  port: 465, // 25, 465, 2525,
  secure: true,
  auth: {
    user: UKRNET_LOGIN,
    pass: UKRNET_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendMail = async (data: IEmailData) => {
  const emailOptions = {
    from: UKRNET_LOGIN,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  try {
    await transporter.sendMail(emailOptions);
  } catch (error: any) {
    console.log(error.message);
  }
};

export default sendMail;
