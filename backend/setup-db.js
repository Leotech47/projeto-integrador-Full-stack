const db = require('./src/database/db');

// Recriar a tabela de produtos
db.serialize(() => {
  // Remover a tabela existente
  db.run('DROP TABLE IF EXISTS produtos', (err) => {
    if (err) {
      console.error('Erro ao remover tabela:', err);
      return;
    }
    
    // Criar a nova tabela
    db.run(`CREATE TABLE produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL,
      fornecedor_id INTEGER,
      FOREIGN KEY (fornecedor_id) REFERENCES fornecedores (id)
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela:', err);
        return;
      }
      
      // Inserir produtos de teste
      const produtos = [
        { nome: 'Produto 1', preco: 10.99, fornecedor_id: 1 },
        { nome: 'Produto 2', preco: 20.99, fornecedor_id: 2 },
        { nome: 'Produto 3', preco: 30.99, fornecedor_id: 3 }
      ];
      
      // Inserir cada produto
      produtos.forEach(produto => {
        db.run(
          'INSERT INTO produtos (nome, preco, fornecedor_id) VALUES (?, ?, ?)',
          [produto.nome, produto.preco, produto.fornecedor_id],
          (err) => {
            if (err) {
              console.error('Erro ao inserir produto:', err);
            }
          }
        );
      });
      
      // Verificar os produtos inseridos
      db.all('SELECT * FROM produtos', [], (err, rows) => {
        if (err) {
          console.error('Erro ao consultar produtos:', err);
        } else {
          console.log('Produtos no banco:', rows);
        }
      });
    });
  });
});
