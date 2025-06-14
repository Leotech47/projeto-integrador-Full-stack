import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsappIcon from '../components/WhatsappIcon';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Fornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/fornecedores')
      .then(res => res.json())
      .then(data => {
        setFornecedores(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch(err => {
        setErro('Erro ao buscar fornecedores');
        setLoading(false);
      });
  }, [mensagem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/fornecedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    })
      .then(res => res.json())
      .then(data => {
        setMensagem('Fornecedor cadastrado!');
        setNome('');
      })
      .catch(() => setMensagem('Erro ao cadastrar fornecedor.'));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/fornecedores/${id}`, { method: 'DELETE' })
      .then(() => setMensagem('Fornecedor removido!'))
      .catch(() => setMensagem('Erro ao remover fornecedor.'));
  };

  const handleEdit = (fornecedor) => {
    setEditId(fornecedor.id);
    setEditNome(fornecedor.nome);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/fornecedores/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: editNome })
    })
      .then(res => res.json())
      .then(() => {
        setMensagem('Fornecedor atualizado!');
        setEditId(null);
        setEditNome('');
      })
      .catch(() => setMensagem('Erro ao atualizar fornecedor.'));
  };

  if (loading) return <div>Carregando fornecedores...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div>
      <Header />
      <main>
        <h2>Página de Fornecedor</h2>
        <Link to="/">Voltar para Home</Link>
        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Nome do fornecedor"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <button type="submit">Cadastrar Fornecedor</button>
        </form>
        {mensagem && <div>{mensagem}</div>}
        <h3>Fornecedores cadastrados</h3>
        <ul style={{ marginTop: 20 }}>
          {fornecedores.map((fornecedor, idx) => (
            <li key={fornecedor.id || idx} style={{ padding: 8, borderBottom: '1px solid #ccc' }}>
              {editId === fornecedor.id ? (
                <form onSubmit={handleUpdate} style={{ display: 'inline' }}>
                  <input value={editNome} onChange={e => setEditNome(e.target.value)} required />
                  <button type="submit">Salvar</button>
                  <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
                </form>
              ) : (
                <>
                  {fornecedor.nome}
                  <button onClick={() => handleEdit(fornecedor)}>Editar</button>
                  <button onClick={() => handleDelete(fornecedor.id)}>Excluir</button>
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

export default Fornecedor;
