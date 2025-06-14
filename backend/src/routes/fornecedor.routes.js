// Rotas para Fornecedor
const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedor.controller');

// Definindo as rotas CRUD para Fornecedor
router.get('/', fornecedorController.getAll);
router.get('/:id', fornecedorController.getById);
router.post('/', fornecedorController.create);
router.put('/:id', fornecedorController.update);
router.delete('/:id', fornecedorController.delete);

module.exports = router;
