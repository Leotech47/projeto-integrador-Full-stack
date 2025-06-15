// Rotas para Fornecedor
const express = require('express');
const router = express.Router();
const validate = require('../middleware/validator');
const { validateFornecedor, fornecedorController } = require('../controllers/fornecedor.controller');

// Definindo as rotas CRUD para Fornecedor
router.get('/', fornecedorController.getAll);
router.get('/:id', fornecedorController.getById);
router.post('/', 
  validateFornecedor,
  validate,
  fornecedorController.create
);
router.put('/:id', 
  validateFornecedor,
  validate,
  fornecedorController.update
);
router.delete('/:id', 
  fornecedorController.delete
);

module.exports = router;
