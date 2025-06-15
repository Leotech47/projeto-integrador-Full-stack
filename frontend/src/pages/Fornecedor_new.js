import ProfessionalHeader from '../components/ProfessionalHeader';
import Footer from '../components/Footer';
import WhatsappIcon from '../components/WhatsappIcon';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Fornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState('');
  const [editCnpj, setEditCnpj] = useState('');
  const [editEndereco, setEditEndereco] = useState('');
  const [editTelefone, setEditTelefone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editSite, setEditSite] = useState('');

  // Função para buscar fornecedores do backend
  const buscarFornecedores = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/fornecedores');
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setFornecedores(Array.isArray(data) ? data : []);
      setErro(null);
    } catch (err) {
      console.error('Erro ao buscar fornecedores:', err);
      setErro('Erro ao carregar fornecedores: ' + err.message);
      setFornecedores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarFornecedores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    
    if (!nome.trim()) {
      setErro('Nome é obrigatório');
      return;
    }
    
    try {
      const novoFornecedor = {
        nome: nome.trim(),
        cnpj: cnpj.trim(),
        endereco: endereco.trim(),
        telefone: telefone.trim(),
        email: email.trim(),
        site: site.trim()
      };
      
      const response = await fetch('http://localhost:3001/fornecedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoFornecedor)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}`);
      }
      
      setMensagem('Fornecedor cadastrado com sucesso!');
      setNome('');
      setCnpj('');
      setEndereco('');
      setTelefone('');
      setEmail('');
      setSite('');
      
      // Recarregar a lista de fornecedores
      await buscarFornecedores();
      
    } catch (err) {
      console.error('Erro ao cadastrar fornecedor:', err);
      setErro('Erro ao cadastrar fornecedor: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este fornecedor?')) {
      return;
    }
    
    setErro('');
    setMensagem('');
    
    try {
      const response = await fetch(`http://localhost:3001/fornecedores/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}`);
      }
      
      setMensagem('Fornecedor removido com sucesso!');
      await buscarFornecedores();
      
    } catch (err) {
      console.error('Erro ao remover fornecedor:', err);
      setErro('Erro ao remover fornecedor: ' + err.message);
    }
  };

  const handleEdit = (fornecedor) => {
    setEditId(fornecedor.id);
    setEditNome(fornecedor.nome);
    setEditCnpj(fornecedor.cnpj || '');
    setEditEndereco(fornecedor.endereco || '');
    setEditTelefone(fornecedor.telefone || '');
    setEditEmail(fornecedor.email || '');
    setEditSite(fornecedor.site || '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    
    if (!editNome.trim()) {
      setErro('Nome é obrigatório');
      return;
    }
    
    try {
      const fornecedorAtualizado = {
        nome: editNome.trim(),
        cnpj: editCnpj.trim(),
        endereco: editEndereco.trim(),
        telefone: editTelefone.trim(),
        email: editEmail.trim(),
        site: editSite.trim()
      };
      
      const response = await fetch(`http://localhost:3001/fornecedores/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fornecedorAtualizado)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}`);
      }
      
      setMensagem('Fornecedor atualizado com sucesso!');
      setEditId(null);
      setEditNome('');
      setEditCnpj('');
      setEditEndereco('');
      setEditTelefone('');
      setEditEmail('');
      setEditSite('');
      
      await buscarFornecedores();
      
    } catch (err) {
      console.error('Erro ao atualizar fornecedor:', err);
      setErro('Erro ao atualizar fornecedor: ' + err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <ProfessionalHeader />
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          borderRadius: '20px', 
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              background: 'linear-gradient(135deg, #667eea, #764ba2)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              Gestão de Fornecedores
            </h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Gerencie seus fornecedores de forma eficiente
            </p>
          </div>

          {/* Navigation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            flexWrap: 'wrap',
            marginBottom: '1.5rem'
          }}>
            <Link to="/produtos" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              fontWeight: 'bold'
            }}>
              📦 Produtos
            </Link>
            <Link to="/associacoes" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              fontWeight: 'bold'
            }}>
              🔗 Associações
            </Link>
            <Link to="/" style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #fa709a, #fee140)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              fontWeight: 'bold'
            }}>
              🏠 Home
            </Link>
          </div>
        </div>

        {/* Messages */}
        {erro && (
          <div style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            color: 'white',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            ❌ {erro}
          </div>
        )}
        
        {mensagem && (
          <div style={{
            background: 'linear-gradient(135deg, #00b894, #00cec9)',
            color: 'white',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            ✅ {mensagem}
          </div>
        )}

        {/* Form Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            color: '#333', 
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '1.8rem'
          }}>
            {editId ? '✏️ Editar Fornecedor' : '➕ Novo Fornecedor'}
          </h2>
          
          <form onSubmit={editId ? handleUpdate : handleSubmit} style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                Nome *
              </label>
              <input
                type="text"
                value={editId ? editNome : nome}
                onChange={(e) => editId ? setEditNome(e.target.value) : setNome(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                CNPJ
              </label>
              <input
                type="text"
                value={editId ? editCnpj : cnpj}
                onChange={(e) => editId ? setEditCnpj(e.target.value) : setCnpj(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                Endereço
              </label>
              <input
                type="text"
                value={editId ? editEndereco : endereco}
                onChange={(e) => editId ? setEditEndereco(e.target.value) : setEndereco(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                Telefone
              </label>
              <input
                type="text"
                value={editId ? editTelefone : telefone}
                onChange={(e) => editId ? setEditTelefone(e.target.value) : setTelefone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                Email
              </label>
              <input
                type="email"
                value={editId ? editEmail : email}
                onChange={(e) => editId ? setEditEmail(e.target.value) : setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                Site
              </label>
              <input
                type="url"
                value={editId ? editSite : site}
                onChange={(e) => editId ? setEditSite(e.target.value) : setSite(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                type="submit"
                style={{
                  background: editId ? 'linear-gradient(135deg, #ffa726, #fb8c00)' : 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '12px 30px',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  minWidth: '150px'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                {editId ? '✏️ Atualizar' : '➕ Cadastrar'}
              </button>
              
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setEditNome('');
                    setEditCnpj('');
                    setEditEndereco('');
                    setEditTelefone('');
                    setEditEmail('');
                    setEditSite('');
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #95a5a6, #7f8c8d)',
                    color: 'white',
                    padding: '12px 30px',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    minWidth: '150px'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  ❌ Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Fornecedores */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            color: '#333', 
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '1.8rem'
          }}>
            📋 Lista de Fornecedores
          </h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '1rem', color: '#666' }}>Carregando fornecedores...</p>
            </div>
          ) : fornecedores.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#666'
            }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>📭 Nenhum fornecedor cadastrado</p>
              <p>Cadastre o primeiro fornecedor usando o formulário acima!</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
            }}>
              {fornecedores.map((fornecedor) => (
                <div
                  key={fornecedor.id}
                  style={{
                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                    border: '2px solid #e1e5e9',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{ 
                    color: '#333', 
                    marginBottom: '1rem',
                    fontSize: '1.3rem',
                    borderBottom: '2px solid #667eea',
                    paddingBottom: '0.5rem'
                  }}>
                    🏢 {fornecedor.nome}
                  </h3>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    {fornecedor.cnpj && (
                      <p style={{ margin: '0.25rem 0', color: '#666' }}>
                        <strong>CNPJ:</strong> {fornecedor.cnpj}
                      </p>
                    )}
                    {fornecedor.endereco && (
                      <p style={{ margin: '0.25rem 0', color: '#666' }}>
                        <strong>Endereço:</strong> {fornecedor.endereco}
                      </p>
                    )}
                    {fornecedor.telefone && (
                      <p style={{ margin: '0.25rem 0', color: '#666' }}>
                        <strong>Telefone:</strong> {fornecedor.telefone}
                      </p>
                    )}
                    {fornecedor.email && (
                      <p style={{ margin: '0.25rem 0', color: '#666' }}>
                        <strong>Email:</strong> {fornecedor.email}
                      </p>
                    )}
                    {fornecedor.site && (
                      <p style={{ margin: '0.25rem 0', color: '#666' }}>
                        <strong>Site:</strong> 
                        <a 
                          href={fornecedor.site} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#667eea', marginLeft: '0.5rem' }}
                        >
                          {fornecedor.site}
                        </a>
                      </p>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(fornecedor)}
                      style={{
                        background: 'linear-gradient(135deg, #ffa726, #fb8c00)',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                        flex: 1
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      ✏️ Editar
                    </button>
                    
                    <button
                      onClick={() => handleDelete(fornecedor.id)}
                      style={{
                        background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                        flex: 1
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsappIcon />
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Fornecedor;
