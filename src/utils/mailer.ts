import { MailerParameters } from 'src/types/mailer.parameters.type';

const nodemailer = require('nodemailer');

type MailConfigOptions = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
};

const getMailConfigOptions = (): MailConfigOptions => {
  const host = process.env.MAILER_HOST;
  const user = process.env.MAILER_USER;
  const pass = process.env.MAILER_PASSWORD;
  const port = Number(process.env.MAILER_PORT ?? 587);
  const secure = String(process.env.MAILER_SECURE ?? 'false') === 'true';

  if (!host || !user || !pass || Number.isNaN(port)) {
    throw new Error('Invalid mailer configuration in environment variables');
  }

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  };
};

export const sendEmail = async (params: MailerParameters) => {
  const mailConfigOptions = getMailConfigOptions();
  const transporter = nodemailer.createTransport(mailConfigOptions);
  const sender = process.env.MAILER_SENDER;

  if (!sender) {
    throw new Error('MAILER_SENDER is not set');
  }

  console.log('mailConfigOptions:', mailConfigOptions);
  const info = await transporter.sendMail({
    from: sender,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html,
  });

  console.log('Message sent:', info.messageId);
};
