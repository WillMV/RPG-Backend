import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

const emailRepository = {
  async send({
    to,
    subject,
    html,
  }: {
    to: string[];
    subject: string;
    html: string;
  }) {
    const from = process.env.EMAIL_DOMAIN;
    if (!from)
      throw new Error(
        "Not exist value in EMAIL_DOMAIN. Please addi EMAIL_DOMAIN in your .env settings",
      );

    try {
      const info = await transporter.sendMail({
        from,
        to,
        html,
        subject,
      });
      return info;
    } catch (error) {
      console.error("Error while sending Email:", error);
      throw error;
    }
  },
};

export default emailRepository;
