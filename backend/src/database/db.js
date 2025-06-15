// Configuração inicial do banco de dados SQLite
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');
let db;

try {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      process.exit(1);
    }
    console.log('Conectado ao banco de dados SQLite');
  });

  // Habilitar chaves estrangeiras
  db.run('PRAGMA foreign_keys = ON');

  // Criação das tabelas em ordem correta
  db.serialize(() => {
    // Tabela de fornecedores (deve ser criada primeiro)
    db.run(`CREATE TABLE IF NOT EXISTS fornecedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cnpj TEXT,
      endereco TEXT,
      telefone TEXT,
      email TEXT,
      site TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Tabela de produtos com chave estrangeira e campo quantidade_estoque
    db.run(`CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL CHECK (preco >= 0),
      quantidade_estoque INTEGER DEFAULT 0,
      fornecedor_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    )`);

    // Tabela de associações produto-fornecedor
    db.run(`CREATE TABLE IF NOT EXISTS associacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto_id INTEGER NOT NULL,
      fornecedor_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
      FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id) ON DELETE CASCADE,
      UNIQUE(produto_id, fornecedor_id)
    )`);

    // Tabela de usuários
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cpf TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      confirmado INTEGER DEFAULT 0,
      token_confirmacao TEXT,
      reset_token TEXT,
      reset_token_expiry DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  });

} catch (error) {
  console.error('Erro fatal ao inicializar o banco de dados:', error);
  process.exit(1);
}

// Fechar o banco de dados graciosamente quando o processo for encerrado
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco de dados:', err);
    } else {
      console.log('Conexão com o banco de dados fechada');
    }
    process.exit(err ? 1 : 0);
  });
});

module.exports = db;
