const db = require('./src/database/db');

// Verificar a tabela de produtos
db.all('SELECT * FROM produtos', [], (err, rows) => {
  if (err) {
    console.error('Erro ao consultar produtos:', err);
  } else {
    console.log('Produtos encontrados:', rows);
  }
});

// Verificar a tabela de fornecedores
db.all('SELECT * FROM fornecedores', [], (err, rows) => {
  if (err) {
    console.error('Erro ao consultar fornecedores:', err);
  } else {
    console.log('Fornecedores encontrados:', rows);
  }
});

// Verificar a tabela de associações
db.all('SELECT * FROM associacoes', [], (err, rows) => {
  if (err) {
    console.error('Erro ao consultar associações:', err);
  } else {
    console.log('Associações encontradas:', rows);
  }
});
