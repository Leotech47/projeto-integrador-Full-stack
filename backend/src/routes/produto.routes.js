// Rotas para Produto
const express = require('express');
const router = express.Router();
const validate = require('../middleware/validator');
const { validateProduto, produtoController } = require('../controllers/produto.controller');


router.get('/', produtoController.getAll);
router.get('/:id', produtoController.getById);
router.post('/', 
  validateProduto,
  validate,
  produtoController.create
);
router.put('/:id', 
  validateProduto,
  validate,
  produtoController.update
);
router.delete('/:id', 
  produtoController.delete
);
router.patch('/:id/estoque', 
  produtoController.updateEstoque
);

module.exports = router;
