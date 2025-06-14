const Fornecedor = require('../models/fornecedor.model');

module.exports = {
  getAll: (req, res) => {
    Fornecedor.getAll((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },
  getById: (req, res) => {
    Fornecedor.getById(req.params.id, (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Fornecedor não encontrado' });
      res.json(row);
    });
  },
  create: (req, res) => {
    Fornecedor.create(req.body, (err, novo) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(novo);
    });
  },
  update: (req, res) => {
    Fornecedor.update(req.params.id, req.body, (err, atualizado) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(atualizado);
    });
  },
  delete: (req, res) => {
    Fornecedor.delete(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(204).end();
    });
  }
};
