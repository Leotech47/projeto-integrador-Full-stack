// Rotas para Produto
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validator');
const { validateProduto, produtoController } = require('../controllers/produto.controller');


router.get('/', produtoController.getAll);
router.get('/:id', produtoController.getById);
router.post('/', 
  auth, 
  validateProduto,
  validate,
  produtoController.create
);
router.put('/:id', 
  auth, 
  validateProduto,
  validate,
  produtoController.update
);
router.delete('/:id', 
  auth, 
  produtoController.delete
);

module.exports = router;
