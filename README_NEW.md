# 🚀 Leo Tech - Sistema de Gestão Full Stack

![Leo Tech Logo](frontend/public/logo-leotech.png)

Um sistema completo de gestão desenvolvido em arquitetura Full Stack para gerenciar fornecedores, produtos, associações e facilitar o contato com clientes.

## 🎯 Principais Funcionalidades

- 🏢 **Gestão de Fornecedores** - Cadastro completo com validação de CNPJ
- 📦 **Controle de Produtos** - Gerenciamento de estoque com entrada/saída
- 📊 **Sistema de Associações** - Relatórios e relacionamentos
- 📧 **Contato Integrado** - Envio automático de emails
- 🔒 **Segurança** - Autenticação JWT e criptografia

## 🛠️ Tecnologias

**Backend:** Node.js, Express, SQLite, JWT, Nodemailer  
**Frontend:** React 18, React Router, jsPDF  
**Ferramentas:** ESLint, Jest, Winston, Concurrently

## ⚡ Início Rápido

### 🔧 Instalação Automática
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd projeto-integrador-Full-stack

# Instale todas as dependências
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
- **Teste APIs**: Abrir `teste-apis.html` no navegador

## 📡 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/fornecedores` | Listar fornecedores |
| POST | `/api/produtos` | Criar produto |
| PUT | `/api/produtos/:id/estoque` | Atualizar estoque |
| GET | `/api/associacoes` | Relatórios de associações |
| POST | `/api/contato` | Enviar mensagem |

## 📋 Estrutura do Projeto

```
projeto-integrador-Full-stack/
├── 🖥️ backend/          # Servidor Node.js + Express
│   ├── src/
│   │   ├── controllers/ # Lógica de negócio
│   │   ├── models/      # Modelos de dados
│   │   ├── routes/      # Rotas da API
│   │   └── utils/       # Utilitários
│   └── tests/           # Testes unitários
├── 🌐 frontend/         # Interface React
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   └── pages/       # Páginas da aplicação
│   └── public/          # Arquivos estáticos
└── 🔧 Scripts automação # .bat files para Windows
```

## 📧 Configuração de Email

Crie o arquivo `backend/.env`:
```env
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=suasenhaapp
EMAIL_TO=destinatario@exemplo.com
```

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Testes manuais
# Abrir teste-apis.html no navegador
```

## 📖 Documentação Completa

Para documentação detalhada, consulte: [DOCUMENTACAO.md](DOCUMENTACAO.md)

## 🏫 Informações Acadêmicas

**Instituição:** FACULDADE GRAN  
**Aluno:** Leonardo da Silva  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Período:** 4º semestre  
**Professor:** Francisco Marcelo Marques Lima  
**Disciplina:** Projeto Integrador 4 – TI

## 🤝 Contribuição

1. Fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Suporte

- 📧 Email: leotechjf@gmail.com
- 🌐 Sistema de contato integrado na aplicação

## 📜 Licença

Este projeto está sob a licença ISC.

---

**Desenvolvido com ❤️ pela equipe Leo Tech**

*Sistema completo, moderno e escalável para gestão empresarial.*
