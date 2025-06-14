import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsappIcon from '../components/WhatsappIcon';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState('');
  const [editPreco, setEditPreco] = useState('');
  const [editFornecedor, setEditFornecedor] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => {
        setProdutos(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch(err => {
        setErro('Erro ao buscar produtos');
        setLoading(false);
      });
    // Buscar fornecedores para o dropdown
    fetch('http://localhost:3001/fornecedores')
      .then(res => res.json())
      .then(data => setFornecedores(Array.isArray(data) ? data : [data]))
      .catch(() => setFornecedores([]));
  }, [mensagem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, preco, fornecedor })
    })
      .then(res => res.json())
      .then(data => {
        setMensagem('Produto cadastrado!');
        setNome('');
        setPreco('');
        setFornecedor('');
      })
      .catch(() => setMensagem('Erro ao cadastrar produto.'));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/produtos/${id}`, { method: 'DELETE' })
      .then(() => setMensagem('Produto removido!'))
      .catch(() => setMensagem('Erro ao remover produto.'));
  };

  const handleEdit = (produto) => {
    setEditId(produto.id);
    setEditNome(produto.nome);
    setEditPreco(produto.preco);
    setEditFornecedor(produto.fornecedor);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/produtos/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: editNome, preco: editPreco, fornecedor: editFornecedor })
    })
      .then(res => res.json())
      .then(() => {
        setMensagem('Produto atualizado!');
        setEditId(null);
        setEditNome('');
        setEditPreco('');
        setEditFornecedor('');
      })
      .catch(() => setMensagem('Erro ao atualizar produto.'));
  };

  if (loading) return <div>Carregando produtos...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div>
      <Header />
      <main>
        <h2>Página de Produto</h2>
        <Link to="/">Voltar para Home</Link>
        <form onSubmit={handleSubmit} style={{margin:'20px 0'}}>
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={e => setPreco(e.target.value)}
            required
          />
          <select
            value={fornecedor}
            onChange={e => setFornecedor(e.target.value)}
            required
          >
            <option value="">Selecione o fornecedor</option>
            {fornecedores.map(f => (
              <option key={f.id} value={f.nome}>{f.nome}</option>
            ))}
          </select>
          <button type="submit">Cadastrar Produto</button>
        </form>
        {mensagem && <div>{mensagem}</div>}
        <h3>Produtos cadastrados</h3>
        <ul style={{marginTop: 20}}>
          {produtos.map((produto, idx) => (
            <li key={produto.id || idx} style={{padding: 8, borderBottom: '1px solid #ccc'}}>
              {editId === produto.id ? (
                <form onSubmit={handleUpdate} style={{display:'inline'}}>
                  <input value={editNome} onChange={e => setEditNome(e.target.value)} required />
                  <input value={editPreco} onChange={e => setEditPreco(e.target.value)} required type="number" />
                  <select value={editFornecedor} onChange={e => setEditFornecedor(e.target.value)} required>
                    <option value="">Selecione o fornecedor</option>
                    {fornecedores.map(f => (
                      <option key={f.id} value={f.nome}>{f.nome}</option>
                    ))}
                  </select>
                  <button type="submit">Salvar</button>
                  <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
                </form>
              ) : (
                <>
                  {produto.nome} | Preço: {produto.preco} | Fornecedor: {produto.fornecedor}
                  <button onClick={() => handleEdit(produto)}>Editar</button>
                  <button onClick={() => handleDelete(produto.id)}>Excluir</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <WhatsappIcon />
      </main>
      <Footer />
    </div>
  );
}
export default Produto;
