const express = require('express');
const cors = require('cors');
const multer = require('multer');
const rotas = require('./rotas');

const app = express();
const porta = 3000;

// Configurando o express para lidar com POSTs
app.use(express.json())

// Configurando o CORS
app.use(cors());

// Definindo o middleware para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Utilizando as rotas
app.use(rotas);

// Iniciando o servidor
app.listen(porta, () => {
  console.log(`Servidor ouvindo na porta ${porta}`);
});
