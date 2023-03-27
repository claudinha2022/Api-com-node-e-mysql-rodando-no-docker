const mysql = require('mysql');

// Configurando o banco de dados (esta em rede)
const db = mysql.createConnection({
  host: '172.20.0.1',
  host: '192.168.2.7',
  host: 'contmysql',
  user: 'root',
  password: '123',
  database: 'nodejsqlbd01'
});

// Conectando-se ao banco de dados
db.connect((err) => {
  if (err) {
    console.log(`Erro ao conectar-se ao banco de dados: ${err.message}`);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados');
  }
});

module.exports = db;
