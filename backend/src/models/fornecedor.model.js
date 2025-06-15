const db = require('../database/db');

module.exports = {  getAll: (callback) => {
    db.all('SELECT * FROM fornecedores ORDER BY id DESC', [], callback);
  },
  
  getById: (id, callback) => {
    db.get('SELECT * FROM fornecedores WHERE id = ?', [id], callback);
  },
    create: (fornecedor, callback) => {
    const { nome, cnpj, endereco, telefone, email, site } = fornecedor;
    
    // Validação básica
    if (!nome || nome.trim().length < 2) {
      return callback(new Error('Nome é obrigatório e deve ter pelo menos 2 caracteres'));
    }
    
    const query = `
      INSERT INTO fornecedores (nome, cnpj, endereco, telefone, email, site) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    db.run(query, [nome, cnpj, endereco, telefone, email, site], function(err) {
      if (err) return callback(err);
      
      // Buscar o fornecedor recém-criado
      module.exports.getById(this.lastID, callback);
    });
  },
    update: (id, fornecedor, callback) => {
    const { nome, cnpj, endereco, telefone, email, site } = fornecedor;
    
    // Validação básica
    if (!nome || nome.trim().length < 2) {
      return callback(new Error('Nome é obrigatório e deve ter pelo menos 2 caracteres'));
    }
    
    const query = `
      UPDATE fornecedores 
      SET nome = ?, cnpj = ?, endereco = ?, telefone = ?, email = ?, site = ?
      WHERE id = ?
    `;
    
    db.run(query, [nome, cnpj, endereco, telefone, email, site, id], function(err) {
      if (err) return callback(err);
      
      if (this.changes === 0) {
        return callback(null, null); // Fornecedor não encontrado
      }
      
      // Buscar o fornecedor atualizado
      module.exports.getById(id, callback);
    });
  },
  
  delete: (id, callback) => {
    db.run('DELETE FROM fornecedores WHERE id = ?', [id], function(err) {
      if (err) return callback(err);
      callback(null, { changes: this.changes });
    });
  }
};
