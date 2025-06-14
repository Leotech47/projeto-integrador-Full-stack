const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database/db');

describe('API de Produtos', () => {
  beforeAll(async () => {
    // Limpa o banco de dados antes dos testes
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM produtos', [], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });

  describe('GET /produtos', () => {
    it('deve retornar uma lista vazia de produtos', async () => {
      const res = await request(app)
        .get('/produtos')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(0);
    });
  });

  describe('POST /produtos', () => {
    it('deve criar um novo produto com dados válidos', async () => {
      const novoProduto = {
        nome: 'Produto Teste',
        preco: 10.99,
        fornecedor_id: 1
      };

      const res = await request(app)
        .post('/produtos')
        .send(novoProduto)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.nome).toBe(novoProduto.nome);
      expect(res.body.preco).toBe(novoProduto.preco);
    });

    it('deve retornar erro ao criar produto com dados inválidos', async () => {
      const produtoInvalido = {
        nome: '',
        preco: -10
      };

      await request(app)
        .post('/produtos')
        .send(produtoInvalido)
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });

  describe('PUT /produtos/:id', () => {
    let produtoId;

    beforeAll(async () => {
      const res = await request(app)
        .post('/produtos')
        .send({
          nome: 'Produto para Atualizar',
          preco: 20.00,
          fornecedor_id: 1
        });
      produtoId = res.body.id;
    });

    it('deve atualizar um produto existente', async () => {
      const dadosAtualizados = {
        nome: 'Produto Atualizado',
        preco: 25.00,
        fornecedor_id: 1
      };

      const res = await request(app)
        .put(`/produtos/${produtoId}`)
        .send(dadosAtualizados)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.nome).toBe(dadosAtualizados.nome);
      expect(res.body.preco).toBe(dadosAtualizados.preco);
    });

    it('deve retornar 404 para produto inexistente', async () => {
      await request(app)
        .put('/produtos/999999')
        .send({
          nome: 'Produto Inexistente',
          preco: 30.00
        })
        .expect(404);
    });
  });

  afterAll(async () => {
    // Fecha a conexão com o banco de dados
    await new Promise((resolve) => {
      db.close(() => resolve());
    });
  });
});
