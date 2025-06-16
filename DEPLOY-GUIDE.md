# 🚀 Deploy no Railway - Guia Completo

## Preparação para Deploy

### 1. Arquivos de Configuração Necessários

#### Procfile (para Railway)
```
web: cd backend && npm start
```

#### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### package.json (raiz) - Script de build
```json
{
  "scripts": {
    "build": "cd frontend && npm install && npm run build",
    "start": "cd backend && npm start",
    "railway-build": "npm run build"
  }
}
```

### 2. Configuração do Backend para Produção

#### backend/package.json - Adicionar script
```json
{
  "scripts": {
    "start": "node src/app.js",
    "build": "echo 'Backend build complete'"
  }
}
```

#### backend/src/app.js - Configurar porta
```javascript
const PORT = process.env.PORT || 3001;
```

### 3. Configuração do Frontend

#### frontend/package.json - Build script
```json
{
  "scripts": {
    "build": "react-scripts build",
    "start": "serve -s build -l $PORT"
  },
  "dependencies": {
    "serve": "^14.0.0"
  }
}
```

## 🌐 Variáveis de Ambiente

No Railway, configure:
```
NODE_ENV=production
PORT=3001
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=suasenhaapp
EMAIL_TO=destinatario@exemplo.com
DATABASE_URL=./database.sqlite
```

## 📋 Passo a Passo no Railway

1. **Acesse**: https://railway.app
2. **Login**: Com GitHub
3. **New Project**: Deploy from GitHub repo
4. **Selecione**: seu repositório Leo Tech
5. **Configure**: Variables de ambiente
6. **Deploy**: Automático!

## 🔧 Configuração Avançada

### Build Script Personalizado
```bash
# No railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "cd backend && npm start"
healthcheckPath = "/api/health"
```

### Health Check Endpoint
Adicione no backend:
```javascript
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
```
