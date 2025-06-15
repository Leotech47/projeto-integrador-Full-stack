const { body } = require('express-validator');
const logger = require('../utils/logger');
const Produto = require('../models/produto.model');

// Regras de validação
const validateProduto = [
  body('nome')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('preco')
    .isFloat({ min: 0 })
    .withMessage('Preço deve ser um número positivo'),
  body('quantidade_estoque')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantidade em estoque deve ser um número inteiro positivo'),
  body('fornecedor_id')
    .optional()
    .isInt()
    .withMessage('ID do fornecedor deve ser um número inteiro')
];

const produtoController = {
  getAll: async (req, res) => {
    try {
      Produto.getAll((err, produtos) => {
        if (err) {
          logger.error('Erro ao buscar produtos:', err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        res.json(produtos);
      });
    } catch (error) {
      logger.error('Erro não tratado ao buscar produtos:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      Produto.getById(id, (err, produto) => {
        if (err) {
          logger.error(`Erro ao buscar produto ${id}:`, err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        if (!produto) {
          return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto);
      });
    } catch (error) {
      logger.error(`Erro não tratado ao buscar produto ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  create: async (req, res) => {
    try {
      const produto = req.body;
      Produto.create(produto, (err, novoProduto) => {
        if (err) {
          logger.error('Erro ao criar produto:', err);
          return res.status(500).json({ message: 'Erro ao criar produto' });
        }
        logger.info(`Novo produto criado: ${novoProduto.id}`);
        res.status(201).json(novoProduto);
      });
    } catch (error) {
      logger.error('Erro não tratado ao criar produto:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const produto = req.body;
      
      Produto.update(id, produto, (err, produtoAtualizado) => {
        if (err) {
          logger.error(`Erro ao atualizar produto ${id}:`, err);
          return res.status(500).json({ message: 'Erro ao atualizar produto' });
        }
        if (!produtoAtualizado) {
          return res.status(404).json({ message: 'Produto não encontrado' });
        }
        logger.info(`Produto atualizado: ${id}`);
        res.json(produtoAtualizado);
      });
    } catch (error) {
      logger.error(`Erro não tratado ao atualizar produto ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      Produto.delete(id, (err) => {
        if (err) {
          logger.error(`Erro ao deletar produto ${id}:`, err);
          return res.status(500).json({ message: 'Erro ao deletar produto' });
        }
        logger.info(`Produto deletado: ${id}`);
        res.status(204).send();
      });
    } catch (error) {
      logger.error(`Erro não tratado ao deletar produto ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  updateEstoque: async (req, res) => {
    try {
      const { id } = req.params;
      const { operacao, quantidade } = req.body;

      if (!['adicionar', 'subtrair'].includes(operacao)) {
        return res.status(400).json({ message: 'Operação deve ser "adicionar" ou "subtrair"' });
      }

      if (!quantidade || quantidade <= 0) {
        return res.status(400).json({ message: 'Quantidade deve ser um número positivo' });
      }

      Produto.updateEstoque(id, operacao, quantidade, (err, produto) => {
        if (err) {
          logger.error(`Erro ao atualizar estoque do produto ${id}:`, err);
          return res.status(500).json({ message: 'Erro ao atualizar estoque' });
        }
        if (!produto) {
          return res.status(404).json({ message: 'Produto não encontrado' });
        }
        logger.info(`Estoque atualizado para produto ${id}: ${operacao} ${quantidade}`);
        res.json(produto);
      });
    } catch (error) {
      logger.error(`Erro não tratado ao atualizar estoque do produto ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

module.exports = {
  validateProduto,
  produtoController
};
