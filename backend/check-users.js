const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.all("SELECT * FROM usuarios", [], (err, rows) => {
  if (err) {
    console.error('Erro ao consultar usuários:', err);
    return;
  }
  console.log('Usuários cadastrados:');
  console.log(JSON.stringify(rows, null, 2));
  db.close();
});
