const db = require('./src/database/db');

// Recriar as tabelas com os novos campos
db.serialize(() => {
  // Remover tabelas existentes
  db.run('DROP TABLE IF EXISTS produtos', (err) => {
    if (err) console.error('Erro ao remover tabela produtos:', err);
  });
  
  db.run('DROP TABLE IF EXISTS fornecedores', (err) => {
    if (err) console.error('Erro ao remover tabela fornecedores:', err);
  });
  
  // Criar tabela de fornecedores com novos campos
  db.run(`CREATE TABLE fornecedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cnpj TEXT,
    endereco TEXT,
    telefone TEXT,
    email TEXT,
    site TEXT
  )`, (err) => {
    if (err) {
      console.error('Erro ao criar tabela fornecedores:', err);
      return;
    }
    console.log('Tabela fornecedores criada com sucesso');
    
    // Inserir fornecedores de exemplo
    const fornecedores = [
      { nome: 'Laura Silva', cnpj: '12.345.678/0001-90', endereco: 'Rua A, 123', telefone: '(11) 98765-4321', email: 'laura@empresa.com', site: 'https://laura.com' },
      { nome: 'Pedro Santos', cnpj: '98.765.432/0001-10', endereco: 'Rua B, 456', telefone: '(11) 87654-3210', email: 'pedro@empresa.com', site: 'https://pedro.com' },
      { nome: 'Paulo Costa', cnpj: '11.222.333/0001-44', endereco: 'Rua C, 789', telefone: '(11) 76543-2109', email: 'paulo@empresa.com', site: 'https://paulo.com' }
    ];
    
    fornecedores.forEach(fornecedor => {
      db.run(
        'INSERT INTO fornecedores (nome, cnpj, endereco, telefone, email, site) VALUES (?, ?, ?, ?, ?, ?)',
        [fornecedor.nome, fornecedor.cnpj, fornecedor.endereco, fornecedor.telefone, fornecedor.email, fornecedor.site],
        function(err) {
          if (err) console.error('Erro ao inserir fornecedor:', err);
          else console.log('Fornecedor inserido:', fornecedor.nome);
        }
      );
    });
  });
  
  // Criar tabela de produtos com campo de estoque
  db.run(`CREATE TABLE produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL,
    quantidade_estoque INTEGER DEFAULT 0,
    fornecedor_id INTEGER,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores (id)
  )`, (err) => {
    if (err) {
      console.error('Erro ao criar tabela produtos:', err);
      return;
    }
    console.log('Tabela produtos criada com sucesso');
    
    // Aguardar a criação dos fornecedores antes de inserir produtos
    setTimeout(() => {
      const produtos = [
        { nome: 'Produto A', preco: 10.99, quantidade_estoque: 50, fornecedor_id: 1 },
        { nome: 'Produto B', preco: 20.99, quantidade_estoque: 30, fornecedor_id: 2 },
        { nome: 'Produto C', preco: 30.99, quantidade_estoque: 20, fornecedor_id: 3 },
        { nome: 'Produto D', preco: 15.50, quantidade_estoque: 100, fornecedor_id: 1 }
      ];
      
      produtos.forEach(produto => {
        db.run(
          'INSERT INTO produtos (nome, preco, quantidade_estoque, fornecedor_id) VALUES (?, ?, ?, ?)',
          [produto.nome, produto.preco, produto.quantidade_estoque, produto.fornecedor_id],
          function(err) {
            if (err) console.error('Erro ao inserir produto:', err);
            else console.log('Produto inserido:', produto.nome);
          }
        );
      });
      
      // Verificar os dados inseridos
      setTimeout(() => {
        db.all('SELECT * FROM fornecedores', [], (err, fornecedores) => {
          if (err) console.error('Erro ao consultar fornecedores:', err);
          else console.log('Fornecedores no banco:', fornecedores);
        });
        
        db.all('SELECT p.*, f.nome as fornecedor_nome FROM produtos p LEFT JOIN fornecedores f ON p.fornecedor_id = f.id', [], (err, produtos) => {
          if (err) console.error('Erro ao consultar produtos:', err);
          else console.log('Produtos no banco:', produtos);
        });
      }, 1000);
    }, 500);
  });
});
