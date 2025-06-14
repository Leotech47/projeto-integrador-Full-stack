const db = require('../database/db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS associacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    fornecedor_id INTEGER NOT NULL,
    FOREIGN KEY(produto_id) REFERENCES produtos(id),
    FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id)
  )`);
});

module.exports = {
  getAll: (callback) => {
    db.all(`SELECT associacoes.id, produtos.nome as produto_nome, fornecedores.nome as fornecedor_nome, produto_id, fornecedor_id
            FROM associacoes
            JOIN produtos ON associacoes.produto_id = produtos.id
            JOIN fornecedores ON associacoes.fornecedor_id = fornecedores.id`, [], callback);
  },
  getById: (id, callback) => {
    db.get(`SELECT associacoes.id, produtos.nome as produto_nome, fornecedores.nome as fornecedor_nome, produto_id, fornecedor_id
            FROM associacoes
            JOIN produtos ON associacoes.produto_id = produtos.id
            JOIN fornecedores ON associacoes.fornecedor_id = fornecedores.id
            WHERE associacoes.id = ?`, [id], callback);
  },
  create: (associacao, callback) => {
    db.run('INSERT INTO associacoes (produto_id, fornecedor_id) VALUES (?, ?)', [associacao.produto_id, associacao.fornecedor_id], function(err) {
      callback(err, { id: this.lastID, ...associacao });
    });
  },
  update: (id, associacao, callback) => {
    db.run('UPDATE associacoes SET produto_id = ?, fornecedor_id = ? WHERE id = ?', [associacao.produto_id, associacao.fornecedor_id, id], function(err) {
      callback(err, { id, ...associacao });
    });
  },
  delete: (id, callback) => {
    db.run('DELETE FROM associacoes WHERE id = ?', [id], callback);
  }
};
