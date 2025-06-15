const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verificar configuração do email
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro na configuração do email:', error);
  } else {
    console.log('Servidor de email configurado com sucesso');
  }
});

const enviarMensagem = async (req, res) => {
  try {
    // Validar dados recebidos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { nome, email, telefone, empresa, assunto, mensagem } = req.body;

    // Configurar opções do email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: 'leotechjf@gmail.com',
      subject: `Nova mensagem de contato: ${assunto}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #27ae60; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">
            Nova Mensagem de Contato - Leo Tech
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Dados do Cliente:</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
            <p><strong>Empresa:</strong> ${empresa || 'Não informada'}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Assunto:</h3>
            <p style="font-size: 16px; color: #555;">${assunto}</p>
            
            <h3 style="color: #333;">Mensagem:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #27ae60; margin: 10px 0;">
              ${mensagem.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; color: #27ae60; font-size: 14px;">
              <strong>📧 Mensagem enviada através do formulário de contato do site Leo Tech</strong><br>
              Data: ${new Date().toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      `,
      text: `
Nova Mensagem de Contato - Leo Tech

Dados do Cliente:
Nome: ${nome}
Email: ${email}
Telefone: ${telefone || 'Não informado'}
Empresa: ${empresa || 'Não informada'}

Assunto: ${assunto}

Mensagem:
${mensagem}

---
Mensagem enviada através do formulário de contato do site Leo Tech
Data: ${new Date().toLocaleString('pt-BR')}
      `
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email enviado com sucesso:', info.messageId);
    
    res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor. Tente novamente mais tarde.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  enviarMensagem
};
