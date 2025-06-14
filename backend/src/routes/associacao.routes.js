// Rotas para Associação Produto/Fornecedor
const express = require('express');
const router = express.Router();
const associacaoController = require('../controllers/associacao.controller');

// Rota de teste para GET /associacoes
router.get('/', associacaoController.getAll);
router.get('/:id', associacaoController.getById);
router.post('/', associacaoController.create);
router.put('/:id', associacaoController.update);
router.delete('/:id', associacaoController.delete);

module.exports = router;
