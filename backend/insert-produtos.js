const db = require('./src/database/db');

// Inserir produtos de teste
const produtos = [
  { nome: 'Produto 1', preco: 10.99, fornecedor_id: 1 },
  { nome: 'Produto 2', preco: 20.99, fornecedor_id: 2 },
  { nome: 'Produto 3', preco: 30.99, fornecedor_id: 3 }
];

// Função para inserir um produto
function insertProduto(produto) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO produtos (nome, preco, fornecedor_id) VALUES (?, ?, ?)',
      [produto.nome, produto.preco, produto.fornecedor_id],
      function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

// Inserir todos os produtos
Promise.all(produtos.map(p => insertProduto(p)))
  .then(() => {
    console.log('Produtos inseridos com sucesso');
    // Verificar os produtos inseridos
    db.all('SELECT * FROM produtos', [], (err, rows) => {
      if (err) console.error('Erro ao consultar produtos:', err);
      else console.log('Produtos no banco:', rows);
      process.exit(0);
    });
  })
  .catch(err => {
    console.error('Erro ao inserir produtos:', err);
    process.exit(1);
  });
