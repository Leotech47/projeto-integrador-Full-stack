const Associacao = require('../models/associacao.model');

module.exports = {
  getAll: (req, res) => {
    Associacao.getAll((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },
  getById: (req, res) => {
    Associacao.getById(req.params.id, (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Associação não encontrada' });
      res.json(row);
    });
  },
  create: (req, res) => {
    const { produto_id, fornecedor_id } = req.body;
    if (!produto_id || !fornecedor_id) {
      return res.status(400).json({ error: 'produto_id e fornecedor_id são obrigatórios' });
    }
    Associacao.create({ produto_id, fornecedor_id }, (err, novo) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(novo);
    });
  },
  update: (req, res) => {
    const { produto_id, fornecedor_id } = req.body;
    if (!produto_id || !fornecedor_id) {
      return res.status(400).json({ error: 'produto_id e fornecedor_id são obrigatórios' });
    }
    Associacao.update(req.params.id, { produto_id, fornecedor_id }, (err, atualizado) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(atualizado);
    });
  },
  delete: (req, res) => {
    Associacao.delete(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(204).end();
    });
  }
};
