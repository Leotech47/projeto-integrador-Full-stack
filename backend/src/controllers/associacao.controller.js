const { body } = require('express-validator');
const logger = require('../utils/logger');
const Associacao = require('../models/associacao.model');

// Regras de validação
const validateAssociacao = [
  body('produto_id')
    .isInt({ min: 1 })
    .withMessage('produto_id deve ser um número inteiro positivo'),
  body('fornecedor_id')
    .isInt({ min: 1 })
    .withMessage('fornecedor_id deve ser um número inteiro positivo')
];

const associacaoController = {
  getAll: (req, res) => {
    try {
      Associacao.getAll((err, associacoes) => {
        if (err) {
          logger.error('Erro ao buscar associações:', err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        res.json(associacoes);
      });
    } catch (error) {
      logger.error('Erro não tratado ao buscar associações:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  getById: (req, res) => {
    try {
      const { id } = req.params;
      Associacao.getById(id, (err, associacao) => {
        if (err) {
          logger.error(`Erro ao buscar associação ${id}:`, err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        if (!associacao) {
          return res.status(404).json({ message: 'Associação não encontrada' });
        }
        res.json(associacao);
      });
    } catch (error) {
      logger.error(`Erro não tratado ao buscar associação ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  create: (req, res) => {
    try {
      const associacao = req.body;
      Associacao.create(associacao, (err, novaAssociacao) => {
        if (err) {
          logger.error('Erro ao criar associação:', err);
          return res.status(400).json({ message: err.message });
        }
        logger.info(`Nova associação criada: ${novaAssociacao.id}`);
        res.status(201).json(novaAssociacao);
      });
    } catch (error) {
      logger.error('Erro não tratado ao criar associação:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  update: (req, res) => {
    try {
      const { id } = req.params;
      const associacao = req.body;
      
      Associacao.update(id, associacao, (err, associacaoAtualizada) => {
        if (err) {
          logger.error(`Erro ao atualizar associação ${id}:`, err);
          return res.status(400).json({ message: err.message });
        }
        if (!associacaoAtualizada) {
          return res.status(404).json({ message: 'Associação não encontrada' });
        }
        logger.info(`Associação atualizada: ${id}`);
        res.json(associacaoAtualizada);
      });
    } catch (error) {
      logger.error(`Erro não tratado ao atualizar associação ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  delete: (req, res) => {
    try {
      const { id } = req.params;
      Associacao.delete(id, (err, result) => {
        if (err) {
          logger.error(`Erro ao deletar associação ${id}:`, err);
          return res.status(500).json({ message: 'Erro ao deletar associação' });
        }
        if (result.changes === 0) {
          return res.status(404).json({ message: 'Associação não encontrada' });
        }
        logger.info(`Associação deletada: ${id}`);
        res.status(204).send();
      });
    } catch (error) {
      logger.error(`Erro não tratado ao deletar associação ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  getByProduto: (req, res) => {
    try {
      const { produto_id } = req.params;
      Associacao.getByProdutoId(produto_id, (err, associacoes) => {
        if (err) {
          logger.error(`Erro ao buscar associações do produto ${produto_id}:`, err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        res.json(associacoes);
      });
    } catch (error) {
      logger.error(`Erro não tratado ao buscar associações do produto ${req.params.produto_id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  getByFornecedor: (req, res) => {
    try {
      const { fornecedor_id } = req.params;
      Associacao.getByFornecedorId(fornecedor_id, (err, associacoes) => {
        if (err) {
          logger.error(`Erro ao buscar associações do fornecedor ${fornecedor_id}:`, err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        res.json(associacoes);
      });
    } catch (error) {
      logger.error(`Erro não tratado ao buscar associações do fornecedor ${req.params.fornecedor_id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

module.exports = {
  validateAssociacao,
  associacaoController
};
