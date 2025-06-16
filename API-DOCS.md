# 📡 API Documentation - Leo Tech

## 🌐 Base URL
```
http://localhost:3001/api
```

## 🔐 Autenticação
Algumas rotas requerem autenticação JWT. Inclua o token no header:
```
Authorization: Bearer <seu_jwt_token>
```

---

## 🏢 Fornecedores

### Listar Todos os Fornecedores
```http
GET /fornecedores
```

**Response:**
```json
[
  {
    "id": 1,
    "cnpj": "12.345.678/0001-90",
    "razao_social": "Empresa Exemplo LTDA",
    "contato": "João da Silva",
    "telefone": "(11) 99999-9999",
    "email": "contato@empresa.com"
  }
]
```

### Buscar Fornecedor por ID
```http
GET /fornecedores/:id
```

**Response:**
```json
{
  "id": 1,
  "cnpj": "12.345.678/0001-90",
  "razao_social": "Empresa Exemplo LTDA",
  "contato": "João da Silva",
  "telefone": "(11) 99999-9999",
  "email": "contato@empresa.com"
}
```

### Criar Novo Fornecedor
```http
POST /fornecedores
```

**Request Body:**
```json
{
  "cnpj": "12.345.678/0001-90",
  "razao_social": "Nova Empresa LTDA",
  "contato": "Maria Santos",
  "telefone": "(11) 88888-8888",
  "email": "maria@novaempresa.com"
}
```

**Response:**
```json
{
  "id": 2,
  "cnpj": "12.345.678/0001-90",
  "razao_social": "Nova Empresa LTDA",
  "contato": "Maria Santos",
  "telefone": "(11) 88888-8888",
  "email": "maria@novaempresa.com"
}
```

### Atualizar Fornecedor
```http
PUT /fornecedores/:id
```

**Request Body:**
```json
{
  "razao_social": "Empresa Atualizada LTDA",
  "contato": "João Silva Junior",
  "telefone": "(11) 77777-7777",
  "email": "novo@empresa.com"
}
```

### Excluir Fornecedor
```http
DELETE /fornecedores/:id
```

**Response:**
```json
{
  "message": "Fornecedor excluído com sucesso"
}
```

---

## 📦 Produtos

### Listar Todos os Produtos
```http
GET /produtos
```

**Response:**
```json
[
  {
    "id": 1,
    "nome": "Notebook Dell",
    "descricao": "Notebook para uso profissional",
    "categoria": "Eletrônicos",
    "preco": 2500.99,
    "estoque": 10,
    "fornecedor_id": 1
  }
]
```

### Buscar Produto por ID
```http
GET /produtos/:id
```

### Criar Novo Produto
```http
POST /produtos
```

**Request Body:**
```json
{
  "nome": "Mouse Wireless",
  "descricao": "Mouse sem fio ergonômico",
  "categoria": "Periféricos",
  "preco": 89.90,
  "estoque": 25,
  "fornecedor_id": 1
}
```

### Atualizar Produto
```http
PUT /produtos/:id
```

### Excluir Produto
```http
DELETE /produtos/:id
```

### Atualizar Estoque
```http
PUT /produtos/:id/estoque
```

**Request Body:**
```json
{
  "novoEstoque": 15
}
```

### Entrada de Estoque
```http
POST /produtos/:id/entrada
```

**Request Body:**
```json
{
  "quantidade": 5
}
```

**Response:**
```json
{
  "message": "Entrada de estoque realizada com sucesso",
  "produto": {
    "id": 1,
    "nome": "Notebook Dell",
    "estoque": 15
  }
}
```

### Saída de Estoque
```http
POST /produtos/:id/saida
```

**Request Body:**
```json
{
  "quantidade": 3
}
```

---

## 📊 Associações

### Listar Todas as Associações
```http
GET /associacoes
```

**Response:**
```json
[
  {
    "id": 1,
    "produto_id": 1,
    "fornecedor_id": 1,
    "quantidade": 10,
    "data_associacao": "2024-01-15T10:30:00Z"
  }
]
```

### Buscar Associação por ID
```http
GET /associacoes/:id
```

### Criar Nova Associação
```http
POST /associacoes
```

**Request Body:**
```json
{
  "produto_id": 1,
  "fornecedor_id": 1,
  "quantidade": 10
}
```

### Atualizar Associação
```http
PUT /associacoes/:id
```

### Excluir Associação
```http
DELETE /associacoes/:id
```

---

## 👥 Usuários

### Registrar Usuário
```http
POST /usuarios/registro
```

**Request Body:**
```json
{
  "nome": "João da Silva",
  "email": "joao@exemplo.com",
  "senha": "minhasenha123"
}
```

**Response:**
```json
{
  "message": "Usuário registrado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "João da Silva",
    "email": "joao@exemplo.com"
  }
}
```

### Login
```http
POST /usuarios/login
```

**Request Body:**
```json
{
  "email": "joao@exemplo.com",
  "senha": "minhasenha123"
}
```

**Response:**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "João da Silva",
    "email": "joao@exemplo.com"
  }
}
```

### Ver Perfil (Requer Autenticação)
```http
GET /usuarios/perfil
Authorization: Bearer <token>
```

---

## 📧 Contato

### Enviar Mensagem de Contato
```http
POST /contato
```

**Request Body:**
```json
{
  "nome": "Maria Santos",
  "email": "maria@exemplo.com",
  "telefone": "(11) 99999-9999",
  "assunto": "Dúvida sobre produtos",
  "mensagem": "Gostaria de saber mais sobre os produtos disponíveis."
}
```

**Response:**
```json
{
  "message": "Mensagem enviada com sucesso!",
  "status": "success"
}
```

---

## ⚠️ Códigos de Erro

### HTTP Status Codes

| Código | Descrição |
|--------|-----------|
| 200 | OK - Sucesso |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado |
| 403 | Forbidden - Não autorizado |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (ex: CNPJ duplicado) |
| 422 | Unprocessable Entity - Erro de validação |
| 500 | Internal Server Error - Erro interno |

### Exemplos de Erros

**Erro de Validação:**
```json
{
  "error": "Dados inválidos",
  "details": [
    {
      "field": "cnpj",
      "message": "CNPJ é obrigatório"
    },
    {
      "field": "email",
      "message": "Email deve ter formato válido"
    }
  ]
}
```

**Erro de Não Encontrado:**
```json
{
  "error": "Fornecedor não encontrado",
  "code": "FORNECEDOR_NAO_ENCONTRADO"
}
```

**Erro de Conflito:**
```json
{
  "error": "CNPJ já cadastrado",
  "code": "CNPJ_DUPLICADO"
}
```

---

## 🧪 Testando a API

### Com cURL

**Listar fornecedores:**
```bash
curl -X GET http://localhost:3001/api/fornecedores
```

**Criar fornecedor:**
```bash
curl -X POST http://localhost:3001/api/fornecedores \
  -H "Content-Type: application/json" \
  -d '{
    "cnpj": "12.345.678/0001-90",
    "razao_social": "Teste LTDA",
    "contato": "João",
    "telefone": "(11) 99999-9999",
    "email": "joao@teste.com"
  }'
```

### Com Insomnia/Postman

1. Importe a collection ou configure manualmente
2. Configure a base URL: `http://localhost:3001/api`
3. Para rotas autenticadas, adicione o header Authorization

### Interface de Teste

Abra o arquivo `teste-apis.html` no navegador para uma interface gráfica de testes.

---

## 📝 Notas Importantes

1. **Validação:** Todos os campos obrigatórios são validados no backend
2. **CNPJ:** Deve estar no formato válido (XX.XXX.XXX/XXXX-XX)
3. **Email:** Validação de formato de email
4. **Estoque:** Não pode ser negativo
5. **Relacionamentos:** Produtos devem ter fornecedor_id válido
6. **Autenticação:** JWT expira em 24 horas por padrão

---

## 🔄 Rate Limiting

Atualmente não há rate limiting implementado, mas recomenda-se para produção:
- 100 requests/minuto por IP
- 1000 requests/hora por usuário autenticado

---

## 📈 Logs

Todas as requisições são logadas no backend com:
- Timestamp
- IP do cliente  
- Método HTTP
- URL
- Status Code
- Tempo de resposta
