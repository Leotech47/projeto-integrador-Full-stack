# 🏗️ Arquitetura do Sistema Leo Tech

## 📊 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Leo Tech Full Stack                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐    HTTP/REST API    ┌─────────────────────┐
│                     │◄──────────────────►│                     │
│      Frontend       │     Port 3001       │      Backend        │
│     (React 18)      │                     │    (Node.js)        │
│     Port 3000       │                     │                     │
│                     │                     │                     │
│  ┌───────────────┐  │                     │  ┌───────────────┐  │
│  │  Components   │  │                     │  │ Controllers   │  │
│  │  - Header     │  │                     │  │ - Fornecedor  │  │
│  │  - Footer     │  │                     │  │ - Produto     │  │
│  │  - WhatsApp   │  │                     │  │ - Associacao  │  │
│  └───────────────┘  │                     │  │ - Contato     │  │
│                     │                     │  └───────────────┘  │
│  ┌───────────────┐  │                     │                     │
│  │    Pages      │  │                     │  ┌───────────────┐  │
│  │ - Home        │  │                     │  │    Models     │  │
│  │ - Fornecedor  │  │                     │  │ - Data Layer  │  │
│  │ - Produto     │  │                     │  │ - Validation  │  │
│  │ - Associacao  │  │                     │  └───────────────┘  │
│  │ - Contato     │  │                     │                     │
│  └───────────────┘  │                     │  ┌───────────────┐  │
│                     │                     │  │    Routes     │  │
│  ┌───────────────┐  │                     │  │ - API Endpoints│ │
│  │    Utils      │  │                     │  │ - Middleware  │  │
│  │ - API Calls   │  │                     │  └───────────────┘  │
│  │ - Helpers     │  │                     │                     │
│  └───────────────┘  │                     │                     │
└─────────────────────┘                     └─────────────────────┘
                                                       │
                                                       │ SQL Queries
                                                       ▼
                                            ┌─────────────────────┐
                                            │                     │
                                            │     Database        │
                                            │    (SQLite)         │
                                            │                     │
                                            │  ┌───────────────┐  │
                                            │  │    Tables     │  │
                                            │  │ - fornecedores│  │
                                            │  │ - produtos    │  │
                                            │  │ - associacoes │  │
                                            │  │ - usuarios    │  │
                                            │  └───────────────┘  │
                                            │                     │
                                            └─────────────────────┘
```

## 🔄 Fluxo de Dados

### 1. Requisição do Frontend
```
Usuário → Componente React → API Call → Backend Route
```

### 2. Processamento no Backend
```
Route → Controller → Model → Database
```

### 3. Resposta
```
Database → Model → Controller → Route → Frontend → Usuário
```

## 🗂️ Estrutura de Dados

### 📋 Fornecedores
```sql
fornecedores {
  id: INTEGER PRIMARY KEY
  cnpj: TEXT UNIQUE
  razao_social: TEXT
  contato: TEXT
  telefone: TEXT
  email: TEXT
}
```

### 📦 Produtos
```sql
produtos {
  id: INTEGER PRIMARY KEY
  nome: TEXT
  descricao: TEXT
  categoria: TEXT
  preco: REAL
  estoque: INTEGER
  fornecedor_id: INTEGER → fornecedores(id)
}
```

### 🔗 Associações
```sql
associacoes {
  id: INTEGER PRIMARY KEY
  produto_id: INTEGER → produtos(id)
  fornecedor_id: INTEGER → fornecedores(id)
  quantidade: INTEGER
  data_associacao: DATETIME
}
```

### 👥 Usuários
```sql
usuarios {
  id: INTEGER PRIMARY KEY
  nome: TEXT
  email: TEXT UNIQUE
  senha: TEXT (hash)
}
```

## 🚀 Deployment

### 📦 Processo de Build
```
1. Frontend Build (npm run build)
2. Backend Setup (database.sqlite)
3. Environment Variables (.env)
4. Process Manager (PM2 recommended)
```

### 🌍 Hosting Options
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean
- **Database**: SQLite (file-based) or PostgreSQL

## 🔧 Tecnologias por Camada

### Frontend Layer
- **React 18** - Core library
- **React Router DOM** - Client-side routing
- **Fetch API** - HTTP requests
- **CSS3** - Styling
- **jsPDF** - PDF generation

### Backend Layer
- **Express.js** - Web framework
- **SQLite3** - Database driver
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Winston** - Logging
- **CORS** - Cross-origin requests

### Development Tools
- **ESLint** - Code linting
- **Jest** - Testing framework
- **Nodemon** - Development server
- **Concurrently** - Parallel processes

## 🔒 Segurança

### Autenticação
```
Login → JWT Token → Middleware → Protected Routes
```

### Validação
```
Input → Validation Layer → Sanitization → Database
```

### Proteções Implementadas
- SQL Injection Prevention
- XSS Protection
- CORS Configuration
- Password Hashing
- Input Validation

## 📊 Performance

### Otimizações Frontend
- Component lazy loading
- Efficient re-renders
- API call optimization
- Asset minification

### Otimizações Backend
- Database indexing
- Query optimization
- Caching strategies
- Error handling

## 🔄 Estados da Aplicação

### Frontend States
```
- Loading states
- Error states
- Success feedback
- Form validation states
```

### Backend States
```
- Database connections
- Authentication states
- Request/Response cycles
- Error handling
```

## 📈 Monitoramento

### Logs
- Application logs (Winston)
- Error tracking
- Performance metrics
- User activity

### Debugging
- Console logs (development)
- API testing (Insomnia/Postman)
- Browser DevTools
- Node.js Inspector
