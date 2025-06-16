// Ponto de entrada do backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const produtoRoutes = require('./routes/produto.routes');
const fornecedorRoutes = require('./routes/fornecedor.routes');
const associacaoRoutes = require('./routes/associacao.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const contatoRoutes = require('./routes/contato.routes');

app.use(cors());
app.use(express.json());

// Health check endpoint para deploy
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Leo Tech Backend',
    version: '1.0.0'
  });
});

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.json({ 
    message: 'Leo Tech API - Sistema de Gestão Full Stack',
    status: 'Online',
    endpoints: {
      health: '/api/health',
      fornecedores: '/fornecedores',
      produtos: '/produtos',
      associacoes: '/associacoes',
      usuarios: '/usuarios',
      contato: '/contato'
    }
  });
});

app.use('/produtos', produtoRoutes);
app.use('/fornecedores', fornecedorRoutes);
app.use('/associacoes', associacaoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/contato', contatoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
