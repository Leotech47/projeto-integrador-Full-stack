const db = require('../database/db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL,
    fornecedor_id INTEGER,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores (id)
  )`);
});

module.exports = {
  // Definição do modelo Produto
  getAll: (callback) => {
    const query = `
      SELECT p.*, f.nome as fornecedor_nome 
      FROM produtos p 
      LEFT JOIN fornecedores f ON p.fornecedor_id = f.id
    `;
    db.all(query, [], callback);
  },

  getById: (id, callback) => {
    const query = `
      SELECT p.*, f.nome as fornecedor_nome 
      FROM produtos p 
      LEFT JOIN fornecedores f ON p.fornecedor_id = f.id 
      WHERE p.id = ?
    `;
    db.get(query, [id], callback);
  },

  create: (produto, callback) => {
    if (!produto.nome || typeof produto.preco !== 'number' || produto.preco < 0) {
      return callback(new Error('Dados do produto inválidos'));
    }

    const query = `
      INSERT INTO produtos (nome, preco, fornecedor_id) 
      VALUES (?, ?, ?)
    `;
    db.run(query, [produto.nome, produto.preco, produto.fornecedor_id], function(err) {
      if (err) return callback(err);
      // Busca o produto recém criado com os dados do fornecedor
      module.exports.getById(this.lastID, callback);
    });
  },

  update: (id, produto, callback) => {
    if (!produto.nome || typeof produto.preco !== 'number' || produto.preco < 0) {
      return callback(new Error('Dados do produto inválidos'));
    }

    const query = `
      UPDATE produtos 
      SET nome = ?, 
          preco = ?, 
          fornecedor_id = ?,
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    db.run(query, [produto.nome, produto.preco, produto.fornecedor_id, id], function(err) {
      if (err) return callback(err);
      // Busca o produto atualizado com os dados do fornecedor
      module.exports.getById(id, callback);
    });
  },

  delete: (id, callback) => {
    db.run('DELETE FROM produtos WHERE id = ?', [id], callback);
  }
};
