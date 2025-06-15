// Rotas para Associação Produto/Fornecedor
const express = require('express');
const router = express.Router();
const validate = require('../middleware/validator');
const { validateAssociacao, associacaoController } = require('../controllers/associacao.controller');

// Rotas CRUD básicas
router.get('/', associacaoController.getAll);
router.get('/:id', associacaoController.getById);
router.post('/', 
  validateAssociacao,
  validate,
  associacaoController.create
);
router.put('/:id', 
  validateAssociacao,
  validate,
  associacaoController.update
);
router.delete('/:id', associacaoController.delete);

// Rotas para buscar associações por produto ou fornecedor
router.get('/produto/:produto_id', associacaoController.getByProduto);
router.get('/fornecedor/:fornecedor_id', associacaoController.getByFornecedor);

module.exports = router;
