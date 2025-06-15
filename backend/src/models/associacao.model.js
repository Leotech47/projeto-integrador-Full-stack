const db = require('../database/db');

module.exports = {  getAll: (callback) => {
    const query = `
      SELECT a.id, a.produto_id, a.fornecedor_id, 
             p.nome as produto_nome, f.nome as fornecedor_nome
      FROM associacoes a
      JOIN produtos p ON a.produto_id = p.id
      JOIN fornecedores f ON a.fornecedor_id = f.id
      ORDER BY a.id DESC
    `;
    db.all(query, [], callback);
  },
    getById: (id, callback) => {
    const query = `
      SELECT a.id, a.produto_id, a.fornecedor_id, 
             p.nome as produto_nome, f.nome as fornecedor_nome
      FROM associacoes a
      JOIN produtos p ON a.produto_id = p.id
      JOIN fornecedores f ON a.fornecedor_id = f.id
      WHERE a.id = ?
    `;
    db.get(query, [id], callback);
  },
  
  create: (associacao, callback) => {
    const { produto_id, fornecedor_id } = associacao;
    
    // Validação básica
    if (!produto_id || !fornecedor_id) {
      return callback(new Error('produto_id e fornecedor_id são obrigatórios'));
    }
    
    // Verificar se o produto existe
    db.get('SELECT id FROM produtos WHERE id = ?', [produto_id], (err, produto) => {
      if (err) return callback(err);
      if (!produto) return callback(new Error('Produto não encontrado'));
      
      // Verificar se o fornecedor existe
      db.get('SELECT id FROM fornecedores WHERE id = ?', [fornecedor_id], (err, fornecedor) => {
        if (err) return callback(err);
        if (!fornecedor) return callback(new Error('Fornecedor não encontrado'));
        
        // Criar a associação
        const query = 'INSERT INTO associacoes (produto_id, fornecedor_id) VALUES (?, ?)';
        db.run(query, [produto_id, fornecedor_id], function(err) {
          if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
              return callback(new Error('Esta associação já existe'));
            }
            return callback(err);
          }
          
          // Buscar a associação recém-criada
          module.exports.getById(this.lastID, callback);
        });
      });
    });
  },
  
  update: (id, associacao, callback) => {
    const { produto_id, fornecedor_id } = associacao;
    
    // Validação básica
    if (!produto_id || !fornecedor_id) {
      return callback(new Error('produto_id e fornecedor_id são obrigatórios'));
    }
    
    // Verificar se o produto existe
    db.get('SELECT id FROM produtos WHERE id = ?', [produto_id], (err, produto) => {
      if (err) return callback(err);
      if (!produto) return callback(new Error('Produto não encontrado'));
      
      // Verificar se o fornecedor existe
      db.get('SELECT id FROM fornecedores WHERE id = ?', [fornecedor_id], (err, fornecedor) => {
        if (err) return callback(err);
        if (!fornecedor) return callback(new Error('Fornecedor não encontrado'));
        
        // Atualizar a associação
        const query = 'UPDATE associacoes SET produto_id = ?, fornecedor_id = ? WHERE id = ?';
        db.run(query, [produto_id, fornecedor_id, id], function(err) {
          if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
              return callback(new Error('Esta associação já existe'));
            }
            return callback(err);
          }
          
          if (this.changes === 0) {
            return callback(null, null); // Associação não encontrada
          }
          
          // Buscar a associação atualizada
          module.exports.getById(id, callback);
        });
      });
    });
  },
  
  delete: (id, callback) => {
    db.run('DELETE FROM associacoes WHERE id = ?', [id], function(err) {
      if (err) return callback(err);
      callback(null, { changes: this.changes });
    });
  },
  
  getByProdutoId: (produto_id, callback) => {
    const query = `
      SELECT a.id, a.produto_id, a.fornecedor_id, 
             p.nome as produto_nome, f.nome as fornecedor_nome,
             a.created_at
      FROM associacoes a
      JOIN produtos p ON a.produto_id = p.id
      JOIN fornecedores f ON a.fornecedor_id = f.id
      WHERE a.produto_id = ?
      ORDER BY a.created_at DESC
    `;
    db.all(query, [produto_id], callback);
  },
  
  getByFornecedorId: (fornecedor_id, callback) => {
    const query = `
      SELECT a.id, a.produto_id, a.fornecedor_id, 
             p.nome as produto_nome, f.nome as fornecedor_nome,
             a.created_at
      FROM associacoes a
      JOIN produtos p ON a.produto_id = p.id
      JOIN fornecedores f ON a.fornecedor_id = f.id
      WHERE a.fornecedor_id = ?
      ORDER BY a.created_at DESC
    `;
    db.all(query, [fornecedor_id], callback);
  }
};
