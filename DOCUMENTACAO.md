# 📋 Leo Tech - Sistema de Gestão Full Stack

## 🎯 Visão Geral

O **Leo Tech** é um sistema completo de gestão desenvolvido em arquitetura Full Stack, projetado para gerenciar fornecedores, produtos, associações e facilitar o contato com clientes. O sistema combina um backend robusto em Node.js com uma interface moderna em React.

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (SQLite)      │
│   Port: 3000    │    │   Port: 3001    │    │   File: .sqlite │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 📁 Estrutura Completa de Arquivos

```
projeto-integrador-Full-stack/
├── 📄 README.md                              # Documentação principal
├── 📄 package.json                           # Configurações do projeto raiz
├── 📄 .gitignore                             # Arquivos ignorados pelo Git
├── 📄 Apostila - Pré-cadastro.pdf           # Documentação adicional
│
├── 🔧 Scripts de Automação/
│   ├── install.bat                          # Instala dependências
│   ├── start.bat                            # Inicia backend e frontend
│   ├── start_app.bat                        # Inicia apenas a aplicação
│   ├── dev.bat                              # Modo desenvolvimento
│   └── stop.bat                             # Para os serviços
│
├── 🧪 Testes e Utilitários/
│   ├── teste-apis.html                      # Interface para testar APIs
│   └── test-estoque.html                    # Teste específico de estoque
│
├── 🖥️ backend/                               # Servidor Node.js
│   ├── 📄 package.json                      # Dependências do backend
│   ├── 📄 package-lock.json                 # Lock das dependências
│   ├── 📄 README.md                         # Documentação do backend
│   ├── 📄 .eslintrc.json                    # Configuração do ESLint
│   ├── 🗄️ database.sqlite                   # Banco de dados SQLite
│   │
│   ├── 🔧 Scripts de Banco/
│   │   ├── check-db.js                      # Verifica estrutura do BD
│   │   ├── check-users.js                   # Verifica usuários
│   │   ├── setup-db.js                      # Configura banco inicial
│   │   ├── update-db.js                     # Atualiza estrutura
│   │   └── insert-produtos.js               # Insere produtos de teste
│   │
│   ├── 🧪 tests/
│   │   └── produto.test.js                  # Testes unitários dos produtos
│   │
│   └── 📁 src/                              # Código fonte do backend
│       ├── 📄 app.js                        # Aplicação principal
│       │
│       ├── 🎛️ controllers/                  # Controladores (lógica de negócio)
│       │   ├── associacao.controller.js     # Gestão de associações
│       │   ├── contato.controller.js        # Sistema de contato/email
│       │   ├── fornecedor.controller.js     # Gestão de fornecedores
│       │   ├── produto.controller.js        # Gestão de produtos
│       │   └── usuario.controller.js        # Gestão de usuários
│       │
│       ├── 🗄️ database/
│       │   └── db.js                        # Configuração do banco SQLite
│       │
│       ├── 🔒 middleware/
│       │   ├── auth.js                      # Autenticação JWT
│       │   └── validator.js                 # Validação de dados
│       │
│       ├── 📊 models/                       # Modelos de dados
│       │   ├── associacao.model.js          # Modelo de associações
│       │   ├── fornecedor.model.js          # Modelo de fornecedores
│       │   ├── produto.model.js             # Modelo de produtos
│       │   └── usuario.model.js             # Modelo de usuários
│       │
│       ├── 🛤️ routes/                        # Rotas da API
│       │   ├── associacao.routes.js         # Rotas de associações
│       │   ├── contato.routes.js            # Rotas de contato
│       │   ├── fornecedor.routes.js         # Rotas de fornecedores
│       │   ├── produto.routes.js            # Rotas de produtos
│       │   └── usuario.routes.js            # Rotas de usuários
│       │
│       └── 🔧 utils/                        # Utilitários
│           ├── email.js                     # Configuração de email
│           └── logger.js                    # Sistema de logs
│
└── 🌐 frontend/                             # Interface React
    ├── 📄 package.json                      # Dependências do frontend
    ├── 📄 package-lock.json                 # Lock das dependências
    ├── 📄 README.md                         # Documentação do frontend
    ├── 📄 LOGO-README.md                    # Instruções do logo
    │
    ├── 📁 public/
    │   ├── index.html                       # HTML principal
    │   └── logo-leotech.png                 # Logo da Leo Tech
    │
    └── 📁 src/                              # Código fonte do frontend
        ├── 📄 App.js                        # Componente principal
        ├── 📄 index.js                      # Ponto de entrada
        │
        ├── 🧩 components/                   # Componentes reutilizáveis
        │   ├── Footer.js                    # Rodapé
        │   ├── Header.js                    # Cabeçalho original
        │   ├── ProfessionalHeader.js        # Cabeçalho profissional
        │   └── WhatsappIcon.js              # Ícone do WhatsApp
        │
        └── 📄 pages/                        # Páginas da aplicação
            ├── Associacao.js                # Página de associações/relatórios
            ├── Cardapio.js                  # Página de cardápio
            ├── ConfirmarCancelamento.js     # Confirmação de cancelamento
            ├── ConfirmarEmail.js            # Confirmação de email
            ├── Contato.js                   # Formulário de contato
            ├── Fornecedor.js                # Gestão de fornecedores
            ├── Fornecedor_new.js            # Nova versão (backup)
            ├── Fornecedor_old.js            # Versão antiga (backup)
            ├── Home.js                      # Página inicial
            ├── Login.js                     # Página de login
            ├── NewHome.js                   # Nova home (backup)
            ├── Produto.js                   # Gestão de produtos
            └── QuemSomos.js                 # Página institucional
```

---

## 🛠️ Tecnologias Utilizadas

### 🖥️ Backend
- **Node.js** - Ambiente de execução
- **Express.js** - Framework web
- **SQLite3** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas
- **Nodemailer** - Envio de emails
- **Winston** - Sistema de logs
- **Jest** - Testes unitários
- **ESLint** - Qualidade de código

### 🌐 Frontend
- **React 18** - Library de interface
- **React Router DOM** - Navegação SPA
- **jsPDF** - Geração de PDFs
- **CSS3** - Estilização moderna

---

## ⚙️ Funcionalidades Principais

### 🏢 Gestão de Fornecedores
- ✅ Cadastro completo (CNPJ, razão social, contatos)
- ✅ Edição e exclusão
- ✅ Busca e filtragem
- ✅ Validação de dados

### 📦 Gestão de Produtos
- ✅ Cadastro com informações detalhadas
- ✅ Controle de estoque (entrada/saída)
- ✅ Associação com fornecedores
- ✅ Relatórios de movimentação

### 📊 Sistema de Associações
- ✅ Relacionamento produto-fornecedor
- ✅ Relatórios detalhados
- ✅ Controle de quantidades
- ✅ Histórico de movimentações

### 📧 Sistema de Contato
- ✅ Formulário integrado
- ✅ Envio automático de emails
- ✅ Validação de campos
- ✅ Feedback visual para usuário

### 🔒 Segurança
- ✅ Autenticação JWT
- ✅ Criptografia de senhas
- ✅ Validação de entrada
- ✅ Sanitização de dados

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn
- Git (opcional)

### 🔧 Instalação Automatizada
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd projeto-integrador-Full-stack

# Execute a instalação automática
install.bat
```

### ▶️ Execução
```bash
# Modo desenvolvimento (ambos serviços)
dev.bat

# Ou inicie manualmente
start.bat

# Para parar os serviços
stop.bat
```

### 🌐 Acesso
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Teste de APIs**: Abra `teste-apis.html` no navegador

---

## 📡 Endpoints da API

### 🏢 Fornecedores (`/api/fornecedores`)
```
GET    /           # Listar todos
POST   /           # Criar novo
GET    /:id        # Buscar por ID
PUT    /:id        # Atualizar
DELETE /:id        # Excluir
```

### 📦 Produtos (`/api/produtos`)
```
GET    /                    # Listar todos
POST   /                    # Criar novo
GET    /:id                 # Buscar por ID
PUT    /:id                 # Atualizar
DELETE /:id                 # Excluir
PUT    /:id/estoque         # Atualizar estoque
POST   /:id/entrada         # Entrada de estoque
POST   /:id/saida           # Saída de estoque
```

### 📊 Associações (`/api/associacoes`)
```
GET    /           # Listar todas
POST   /           # Criar nova
GET    /:id        # Buscar por ID
PUT    /:id        # Atualizar
DELETE /:id        # Excluir
```

### 👥 Usuários (`/api/usuarios`)
```
POST   /registro   # Registrar usuário
POST   /login      # Fazer login
GET    /perfil     # Ver perfil (autenticado)
```

### 📧 Contato (`/api/contato`)
```
POST   /           # Enviar mensagem de contato
```

---

## 🗄️ Estrutura do Banco de Dados

### 🏢 Tabela: fornecedores
```sql
id          INTEGER PRIMARY KEY
cnpj        TEXT UNIQUE
razao_social TEXT
contato     TEXT
telefone    TEXT
email       TEXT
```

### 📦 Tabela: produtos
```sql
id              INTEGER PRIMARY KEY
nome            TEXT
descricao       TEXT
categoria       TEXT
preco           REAL
estoque         INTEGER
fornecedor_id   INTEGER (FK)
```

### 📊 Tabela: associacoes
```sql
id              INTEGER PRIMARY KEY
produto_id      INTEGER (FK)
fornecedor_id   INTEGER (FK)
quantidade      INTEGER
data_associacao DATETIME
```

### 👥 Tabela: usuarios
```sql
id       INTEGER PRIMARY KEY
nome     TEXT
email    TEXT UNIQUE
senha    TEXT (hash)
```

---

## 🎨 Interface do Usuário

### 🏠 Página Inicial
- Dashboard com estatísticas
- Links rápidos para funcionalidades
- Logo Leo Tech integrado

### 🏢 Gestão de Fornecedores
- Lista paginada com busca
- Formulário de cadastro/edição
- Validação em tempo real

### 📦 Gestão de Produtos
- Controle visual de estoque
- Operações de entrada/saída
- Integração com fornecedores

### 📊 Relatórios
- Associações produto-fornecedor
- Gráficos e estatísticas
- Exportação de dados

### 📧 Contato
- Formulário responsivo
- Validação de campos
- Feedback de envio

---

## 🔧 Configuração de Ambiente

### 📧 Configuração de Email (Backend)
```env
# Arquivo: backend/.env
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=suasenhaapp
EMAIL_TO=destinatario@exemplo.com
```

### 🗄️ Configuração do Banco
O banco SQLite é criado automaticamente na primeira execução. Execute os scripts:
```bash
node backend/setup-db.js      # Cria estrutura inicial
node backend/insert-produtos.js  # Dados de exemplo
```

---

## 🧪 Testes

### 🔍 Executar Testes Backend
```bash
cd backend
npm test                    # Todos os testes
npm run test:watch         # Modo watch
npm run test:coverage      # Cobertura
```

### 🌐 Testes Manuais
- Abra `teste-apis.html` para testar endpoints
- Use `test-estoque.html` para testar controle de estoque

---

## 📈 Monitoramento e Logs

### 📊 Sistema de Logs
- **Winston** configurado para diferentes níveis
- Logs salvos em arquivos rotativos
- Console logs para desenvolvimento

### 🔍 Debugging
- ESLint configurado para qualidade de código
- Middleware de tratamento de erros
- Validação robusta de entrada

---

## 🚀 Deploy e Produção

### 📦 Build do Frontend
```bash
cd frontend
npm run build
```

### 🌐 Variáveis de Ambiente
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=./database.sqlite
```

---

## 🤝 Contribuição

### 📋 Padrões de Código
- ESLint configurado
- Comentários em português
- Nomes descritivos de variáveis
- Estrutura modular

### 🔄 Workflow
1. Fork do repositório
2. Branch para feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit das mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push da branch (`git push origin feature/nova-funcionalidade`)
5. Abertura de Pull Request

---

## 📞 Suporte

### 📧 Contato
- Email: leotechjf@gmail.com
- Sistema integrado de contato na aplicação

### 🐛 Relatar Bugs
- Use o sistema de Issues do GitHub
- Inclua logs e steps para reproduzir

---

## 📜 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

---

## 🎯 Próximas Funcionalidades

- [ ] Dashboard com gráficos interativos
- [ ] Sistema de notificações
- [ ] API REST completa com documentação Swagger
- [ ] Testes automatizados E2E
- [ ] Deploy automatizado

---

**Desenvolvido com ❤️ pela equipe Leo Tech**

*Última atualização: Junho 2025*
