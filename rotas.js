const express = require('express');
const mysql = require('mysql');
const multer = require('multer');

const db = require('./dbconexao');

const upload = multer();

const router = express.Router();

// Criando a rota para inserir dados no banco de dados
router.post('/cliente/gravar', upload.any(), (req, res) => {
  const { nome, telefone, email, cep, logradouro, bairro, cidade, uf, numero, complemento, tipo_cliente_id } = req.body;

  // Validando os dados recebidos
  if (!nome || !telefone || !email || !cep || !logradouro || !bairro || !cidade || !uf || !numero || !complemento || !tipo_cliente_id) {
    res.status(400).send('Dados inválidos. Verifique se todos os campos obrigatórios foram preenchidos corretamente.');
    return;
  }

  const sql = 'INSERT INTO cliente (nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, tipo_cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, telefone, email, cep, logradouro, bairro, cidade, uf, numero, complemento, tipo_cliente_id], (err, result) => {
    // tratamento de erros
    if (err) {
      console.log(`Erro ao inserir dados no banco de dados: ${err.message}`);
      res.status(500).send('Erro interno do servidor');
    } else {
      //sucesso na inserção de dados
      if (result.affectedRows > 0) {
        console.log(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
      } else {
        // erro na inserção de dados
        console.log(`Erro ao inserir dados no banco de dados. Nenhum registro foi afetado.`);
        console.log(`Campo que causou o erro: ${err.sqlMessage}`);
      }
      res.status(200).send(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
    }
  });
});

// Criando a rota para buscar dados no banco de dados com base no e-mail ou no ID do cliente
router.get('/cliente/:chave/:valor', (req, res) => {
  const { chave, valor } = req.params;
  let sql;

  if (chave === "id") {
    sql = `SELECT * FROM cliente WHERE id = ?`;
  } else if (chave === "email") {
    sql = `SELECT * FROM cliente WHERE email = ?`;
  } else {
    return res.status(400).send('Chave inválida');
  }

  db.query(sql, [valor], (err, result) => {
    if (err) {
      console.log(`Erro ao buscar dados no banco de dados: ${err.message}`);
      return res.status(500).send('Erro interno do servidor');
    }
    console.log(`Dados encontrados: ${JSON.stringify(result)}`);
    return res.status(200).send(result);
  });
});


// Criando a rota para buscar os tipos de clientes no banco de dados
router.get('/tipo_cliente', (req, res) => {
  const sql = 'SELECT * FROM tipo_cliente';
  return db.query(sql, (err, result) => {
    if (err) {
      console.log(`Erro ao buscar tipos de clientes no banco de dados: ${err.message}`);
      return res.status(500).send('Erro interno do servidor');
    }
    console.log(`Tipos de clientes encontrados: ${JSON.stringify(result)}`);
    return res.status(200).send(result);
  });
});

module.exports = router;

