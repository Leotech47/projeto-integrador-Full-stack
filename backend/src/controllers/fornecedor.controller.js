const { body } = require('express-validator');
const Fornecedor = require('../models/fornecedor.model');

// Regras de validação
const validateFornecedor = [
  body('nome')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('cnpj')
    .optional()
    .isLength({ min: 14, max: 18 })
    .withMessage('CNPJ deve ter entre 14 e 18 caracteres'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email deve ter um formato válido'),
  body('telefone')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Telefone deve ter pelo menos 10 caracteres'),
  body('site')
    .optional()
    .isURL()
    .withMessage('Site deve ter um formato de URL válido')
];

const fornecedorController = {
  getAll: (req, res) => {
    console.log('GET /fornecedores - Iniciando busca');
    try {
      Fornecedor.getAll((err, fornecedores) => {
        if (err) {
          console.error('Erro ao buscar fornecedores:', err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        console.log('Fornecedores encontrados:', fornecedores.length);
        res.json(fornecedores);
      });
    } catch (error) {
      console.error('Erro não tratado ao buscar fornecedores:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  getById: (req, res) => {
    console.log(`GET /fornecedores/${req.params.id}`);
    try {
      const { id } = req.params;
      Fornecedor.getById(id, (err, fornecedor) => {
        if (err) {
          console.error(`Erro ao buscar fornecedor ${id}:`, err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        if (!fornecedor) {
          return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.json(fornecedor);
      });
    } catch (error) {
      console.error(`Erro não tratado ao buscar fornecedor ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  create: (req, res) => {
    console.log('POST /fornecedores - Dados recebidos:', req.body);
    try {
      const fornecedor = req.body;
      Fornecedor.create(fornecedor, (err, novoFornecedor) => {
        if (err) {
          console.error('Erro ao criar fornecedor:', err);
          return res.status(400).json({ message: err.message });
        }
        console.log(`Novo fornecedor criado: ${novoFornecedor.id}`);
        res.status(201).json(novoFornecedor);
      });
    } catch (error) {
      console.error('Erro não tratado ao criar fornecedor:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  update: (req, res) => {
    console.log(`PUT /fornecedores/${req.params.id} - Dados:`, req.body);
    try {
      const { id } = req.params;
      const fornecedor = req.body;
      
      Fornecedor.update(id, fornecedor, (err, fornecedorAtualizado) => {
        if (err) {
          console.error(`Erro ao atualizar fornecedor ${id}:`, err);
          return res.status(400).json({ message: err.message });
        }
        if (!fornecedorAtualizado) {
          return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        console.log(`Fornecedor atualizado: ${id}`);
        res.json(fornecedorAtualizado);
      });
    } catch (error) {
      console.error(`Erro não tratado ao atualizar fornecedor ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
  
  delete: (req, res) => {
    console.log(`DELETE /fornecedores/${req.params.id}`);
    try {
      const { id } = req.params;
      Fornecedor.delete(id, (err, result) => {
        if (err) {
          console.error(`Erro ao deletar fornecedor ${id}:`, err);
          return res.status(500).json({ message: 'Erro ao deletar fornecedor' });
        }
        if (result.changes === 0) {
          return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        console.log(`Fornecedor deletado: ${id}`);        res.status(204).send();
      });
    } catch (error) {
      console.error(`Erro não tratado ao deletar fornecedor ${req.params.id}:`, error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

module.exports = {
  validateFornecedor,
  fornecedorController
};

module.exports = {
  validateFornecedor,
  fornecedorController
};
