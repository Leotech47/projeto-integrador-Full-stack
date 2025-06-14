const db = require('../database/db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS fornecedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
  )`);
});

module.exports = {
  getAll: (callback) => {
    db.all('SELECT * FROM fornecedores', [], callback);
  },
  getById: (id, callback) => {
    db.get('SELECT * FROM fornecedores WHERE id = ?', [id], callback);
  },
  create: (fornecedor, callback) => {
    db.run('INSERT INTO fornecedores (nome) VALUES (?)', [fornecedor.nome], function(err) {
      callback(err, { id: this.lastID, ...fornecedor });
    });
  },
  update: (id, fornecedor, callback) => {
    db.run('UPDATE fornecedores SET nome = ? WHERE id = ?', [fornecedor.nome, id], function(err) {
      callback(err, { id, ...fornecedor });
    });
  },
  delete: (id, callback) => {
    db.run('DELETE FROM fornecedores WHERE id = ?', [id], callback);
  }
};
