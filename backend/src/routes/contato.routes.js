const express = require('express');
const { body } = require('express-validator');
const { enviarMensagem } = require('../controllers/contato.controller');

const router = express.Router();

// Validações para o formulário de contato
const validarContato = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres'),

  body('email')
    .isEmail()
    .withMessage('Email deve ter um formato válido')
    .normalizeEmail(),

  body('telefone')
    .optional()
    .isMobilePhone('pt-BR')
    .withMessage('Telefone deve ter formato válido'),

  body('empresa')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Nome da empresa deve ter no máximo 100 caracteres'),

  body('assunto')
    .notEmpty()
    .withMessage('Assunto é obrigatório')
    .isLength({ min: 5, max: 200 })
    .withMessage('Assunto deve ter entre 5 e 200 caracteres'),

  body('mensagem')
    .notEmpty()
    .withMessage('Mensagem é obrigatória')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Mensagem deve ter entre 10 e 2000 caracteres')
];

// POST /contato - Enviar mensagem de contato
router.post('/', validarContato, enviarMensagem);

module.exports = router;
