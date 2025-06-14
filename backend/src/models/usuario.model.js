const db = require('../database/db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    confirmado INTEGER DEFAULT 0,
    token_confirmacao TEXT
  )`);
});

module.exports = {
  create: (usuario, callback) => {
    bcrypt.hash(usuario.senha, 10, (err, hash) => {
      if (err) return callback(err);
      const token = crypto.randomBytes(24).toString('hex');
      db.run('INSERT INTO usuarios (cpf, email, senha, token_confirmacao) VALUES (?, ?, ?, ?)', [usuario.cpf, usuario.email, hash, token], function(err) {
        callback(err, { id: this?.lastID, cpf: usuario.cpf, email: usuario.email, token_confirmacao: token });
      });
    });
  },
  findByCpf: (cpf, callback) => {
    db.get('SELECT * FROM usuarios WHERE cpf = ?', [cpf], callback);
  },
  findByEmail: (email, callback) => {
    db.get('SELECT * FROM usuarios WHERE email = ?', [email], callback);
  },
  authenticate: (cpf, senha, callback) => {
    db.get('SELECT * FROM usuarios WHERE cpf = ?', [cpf], (err, row) => {
      if (err) return callback(err);
      if (!row) return callback(null, false);
      if (!row.confirmado) return callback(null, 'not_confirmed');
      bcrypt.compare(senha, row.senha, (err, result) => {
        if (err) return callback(err);
        callback(null, result ? row : false);
      });
    });
  },
  confirmEmail: (token, callback) => {
    db.run('UPDATE usuarios SET confirmado = 1 WHERE token_confirmacao = ?', [token], function(err) {
      callback(err, this.changes > 0);
    });
  },
  deleteAll: (callback) => {
    db.run('DELETE FROM usuarios', [], callback);
  }
};
