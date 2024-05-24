const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'key'; // Chave secreta para assinar tokens

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());
app.use(cors());

let usuarios = [];

// Rota de cadastro de usuários
app.post('/cadastro', (req, res) => {
  const { username, password } = req.body;
  usuarios.push({ username, password });
  res.json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Verifica se o usuário existe e a senha está correta
  const usuario = usuarios.find(user => user.username === username && user.password === password);
  if (!usuario) {
    return res.status(401).json({ message: 'Usuário ou senha incorretos' });
  }

  // Cria um token de autenticação
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
