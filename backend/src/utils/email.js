const nodemailer = require('nodemailer');
const logger = require('./logger');

let transporter = null;

const createTransporter = () => {
  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // true para porta 465, false para outras portas
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false // Permite certificados auto-assinados
      }
    });

    // Verificar a conexão
    transporter.verify(function(error, success) {
      if (error) {
        logger.error('Erro na configuração do email:', error);
      } else {
        logger.info('Servidor de email pronto para enviar mensagens');
      }
    });

  } catch (error) {
    logger.error('Erro ao criar transporter de email:', error);
  }
};

const sendEmail = async (to, subject, html) => {
  if (!transporter) {
    createTransporter();
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Erro ao enviar email:', error);
    return { success: false, error: error.message };
  }
};

// Criar o transporter assim que o módulo for carregado
createTransporter();

module.exports = {
  sendEmail
};
