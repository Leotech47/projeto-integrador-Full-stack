const Usuario = require('../models/usuario.model');
const emailService = require('../utils/email');
const logger = require('../utils/logger');
const crypto = require('crypto');

module.exports = {
  register: async (req, res) => {
    const { cpf, senha, email } = req.body;
    
    if (!cpf || !senha || !email || senha.length < 8) {
      return res.status(400).json({ 
        error: 'CPF, e-mail e senha (mínimo 8 caracteres) obrigatórios.' 
      });
    }

    try {
      // Verificar se usuário já existe
      const existingUser = await new Promise((resolve, reject) => {
        Usuario.findByCpf(cpf, (err, user) => {
          if (err) reject(err);
          resolve(user);
        });
      });

      if (existingUser) {
        return res.status(409).json({ error: 'Usuário já cadastrado.' });
      }

      // Verificar se email já está em uso
      const existingEmail = await new Promise((resolve, reject) => {
        Usuario.findByEmail(email, (err, user) => {
          if (err) reject(err);
          resolve(user);
        });
      });

      if (existingEmail) {
        return res.status(409).json({ error: 'E-mail já cadastrado.' });
      }

      // Criar novo usuário
      const novoUsuario = await new Promise((resolve, reject) => {
        Usuario.create({ cpf, senha, email }, (err, novo) => {
          if (err) reject(err);
          resolve(novo);
        });
      });

      // Enviar e-mail de confirmação
      const confirmUrl = `http://localhost:3000/confirmar-email?token=${novoUsuario.token_confirmacao}`;
      const emailResult = await emailService.sendEmail(
        email,
        'Confirmação de cadastro',
        `<p>Olá! Clique no link para confirmar seu cadastro: <a href="${confirmUrl}">${confirmUrl}</a></p>`
      );

      if (!emailResult.success) {
        logger.error('Erro ao enviar email de confirmação:', emailResult.error);
        return res.status(201).json({ 
          message: 'Usuário cadastrado com sucesso, mas houve um erro ao enviar o email de confirmação. Entre em contato com o suporte.',
          usuario: { id: novoUsuario.id, cpf: novoUsuario.cpf }
        });
      }

      res.status(201).json({ 
        message: 'Usuário cadastrado! Verifique seu e-mail para confirmar.',
        usuario: { id: novoUsuario.id, cpf: novoUsuario.cpf }
      });

    } catch (error) {
      logger.error('Erro no registro de usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  login: (req, res) => {
    const { cpf, senha } = req.body;
    if (!cpf || !senha) {
      return res.status(400).json({ error: 'CPF e senha obrigatórios.' });
    }
    Usuario.authenticate(cpf, senha, (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (user === 'not_confirmed') return res.status(401).json({ error: 'Confirme seu e-mail antes de fazer login.' });
      if (!user) return res.status(401).json({ error: 'CPF ou senha inválidos.' });
      res.json({ message: 'Login realizado com sucesso!', usuario: { id: user.id, cpf: user.cpf } });
    });
  },
  confirmEmail: (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).send('Token inválido.');
    Usuario.confirmEmail(token, (err, ok) => {
      if (err || !ok) return res.status(400).send('Token inválido ou já confirmado.');
      res.send('E-mail confirmado com sucesso! Agora você pode fazer login.');
    });
  },
  requestCancel: (req, res) => {
    const { cpf } = req.body;
    if (!cpf) return res.status(400).json({ error: 'CPF obrigatório.' });
    Usuario.findByCpf(cpf, (err, user) => {
      if (err || !user) return res.status(404).json({ error: 'Usuário não encontrado.' });
      const token = user.token_confirmacao || require('crypto').randomBytes(24).toString('hex');
      // Atualiza token_confirmacao se não existir
      if (!user.token_confirmacao) {
        const db = require('../database/db');
        db.run('UPDATE usuarios SET token_confirmacao = ? WHERE cpf = ?', [token, cpf]);
      }
      const cancelUrl = `http://localhost:3000/confirmar-cancelamento?token=${token}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Confirmação de cancelamento de cadastro',
        html: `<p>Olá! Clique no link para confirmar o cancelamento do seu cadastro: <a href="${cancelUrl}">${cancelUrl}</a></p>`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: 'Erro ao enviar e-mail de cancelamento.' });
        }
        res.json({ message: 'E-mail de confirmação de cancelamento enviado.' });
      });
    });
  },
  confirmCancel: (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).send('Token inválido.');
    const db = require('../database/db');
    db.run('DELETE FROM usuarios WHERE token_confirmacao = ?', [token], function(err) {
      if (err || this.changes === 0) return res.status(400).send('Token inválido ou usuário já removido.');
      res.send('Cadastro cancelado com sucesso!');
    });
  },
  deleteAll: (req, res) => {
    Usuario.deleteAll((err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Todos os usuários foram deletados.' });
    });
  },
  listAll: (req, res) => {
    const db = require('../database/db');
    db.all('SELECT id, cpf, email, confirmado FROM usuarios', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },
  resendConfirmationEmail: async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório.' });
    }

    try {
      // Buscar usuário pelo email
      const user = await new Promise((resolve, reject) => {
        Usuario.findByEmail(email, (err, user) => {
          if (err) reject(err);
          resolve(user);
        });
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      if (user.confirmado) {
        return res.status(400).json({ error: 'Email já confirmado.' });
      }

      // Gerar novo token de confirmação
      const newToken = crypto.randomBytes(24).toString('hex');
      
      // Atualizar token no banco
      await new Promise((resolve, reject) => {
        const db = require('../database/db');
        db.run('UPDATE usuarios SET token_confirmacao = ? WHERE email = ?', 
          [newToken, email], (err) => {
            if (err) reject(err);
            resolve();
          });
      });

      // Enviar novo email de confirmação
      const confirmUrl = `http://localhost:3000/confirmar-email?token=${newToken}`;
      const emailResult = await emailService.sendEmail(
        email,
        'Confirmação de cadastro (reenvio)',
        `<p>Olá! Aqui está seu novo link para confirmar seu cadastro: <a href="${confirmUrl}">${confirmUrl}</a></p>`
      );

      if (!emailResult.success) {
        logger.error('Erro ao reenviar email de confirmação:', emailResult.error);
        return res.status(500).json({ 
          error: 'Erro ao enviar email de confirmação. Por favor, tente novamente.' 
        });
      }

      res.json({ 
        message: 'Novo email de confirmação enviado. Por favor, verifique sua caixa de entrada.' 
      });

    } catch (error) {
      logger.error('Erro ao reenviar confirmação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  recuperarSenha: async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório.' });
    }

    try {
      const user = await new Promise((resolve, reject) => {
        Usuario.findByEmail(email, (err, user) => {
          if (err) reject(err);
          resolve(user);
        });
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Gerar token temporário para redefinição de senha
      const resetToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = new Date(Date.now() + 3600000); // 1 hora de validade

      // Salvar token no banco
      await new Promise((resolve, reject) => {
        const db = require('../database/db');
        db.run(
          'UPDATE usuarios SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
          [resetToken, tokenExpiry.toISOString(), email],
          (err) => {
            if (err) reject(err);
            resolve();
          }
        );
      });

      // Enviar email com link para redefinição de senha
      const resetUrl = `http://localhost:3000/redefinir-senha?token=${resetToken}`;
      const emailResult = await emailService.sendEmail(
        email,
        'Recuperação de Senha',
        `<p>Você solicitou a recuperação de senha. Clique no link abaixo para criar uma nova senha:</p>
         <p><a href="${resetUrl}">${resetUrl}</a></p>
         <p>Este link é válido por 1 hora.</p>
         <p>Se você não solicitou a recuperação de senha, ignore este email.</p>`
      );

      if (!emailResult.success) {
        logger.error('Erro ao enviar email de recuperação:', emailResult.error);
        return res.status(500).json({ 
          error: 'Erro ao enviar email de recuperação. Por favor, tente novamente.' 
        });
      }

      res.json({ 
        message: 'Email de recuperação enviado. Por favor, verifique sua caixa de entrada.' 
      });

    } catch (error) {
      logger.error('Erro ao processar recuperação de senha:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};
