const db = require('../database/db');

module.exports = {
  getAll: (callback) => {
    const query = `
      SELECT p.*, f.nome as fornecedor_nome 
      FROM produtos p 
      LEFT JOIN fornecedores f ON p.fornecedor_id = f.id
      ORDER BY p.id DESC
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
    const { nome, preco, quantidade_estoque, fornecedor_id } = produto;
    
    // Validação básica
    if (!nome || nome.trim().length < 2) {
      return callback(new Error('Nome é obrigatório e deve ter pelo menos 2 caracteres'));
    }
    
    if (typeof preco !== 'number' || preco < 0) {
      return callback(new Error('Preço deve ser um número positivo'));
    }    const query = `
      INSERT INTO produtos (nome, preco, quantidade_estoque, fornecedor_id) 
      VALUES (?, ?, ?, ?)
    `;
    const quantidadeEstoque = quantidade_estoque || 0;
    
    db.run(query, [nome, preco, quantidadeEstoque, fornecedor_id], function(err) {
      if (err) return callback(err);
      // Busca o produto recém criado com os dados do fornecedor
      module.exports.getById(this.lastID, callback);
    });
  },
  
  update: (id, produto, callback) => {
    const { nome, preco, quantidade_estoque, fornecedor_id } = produto;
    
    // Validação básica
    if (!nome || nome.trim().length < 2) {
      return callback(new Error('Nome é obrigatório e deve ter pelo menos 2 caracteres'));
    }
    
    if (typeof preco !== 'number' || preco < 0) {
      return callback(new Error('Preço deve ser um número positivo'));
    }    const query = `
      UPDATE produtos 
      SET nome = ?, preco = ?, quantidade_estoque = ?, fornecedor_id = ?
      WHERE id = ?
    `;
    const quantidadeEstoque = quantidade_estoque || 0;
    
    db.run(query, [nome, preco, quantidadeEstoque, fornecedor_id, id], function(err) {
      if (err) return callback(err);
      
      if (this.changes === 0) {
        return callback(null, null); // Produto não encontrado
      }
      
      // Busca o produto atualizado com os dados do fornecedor
      module.exports.getById(id, callback);
    });
  },
  updateEstoque: (id, operacao, quantidade, callback) => {
    // operacao: 'adicionar' ou 'subtrair'
    const query = operacao === 'adicionar' 
      ? 'UPDATE produtos SET quantidade_estoque = quantidade_estoque + ? WHERE id = ?'
      : 'UPDATE produtos SET quantidade_estoque = quantidade_estoque - ? WHERE id = ?';
    
    db.run(query, [quantidade, id], function(err) {
      if (err) return callback(err);
      
      if (this.changes === 0) {
        return callback(null, null); // Produto não encontrado
      }
      
      module.exports.getById(id, callback);
    });
  },
  
  delete: (id, callback) => {
    db.run('DELETE FROM produtos WHERE id = ?', [id], function(err) {
      if (err) return callback(err);
      callback(null, { changes: this.changes });
    });
  }
};
