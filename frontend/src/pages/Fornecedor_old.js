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
  };setMensagem('Fornecedor cadastrado com sucesso!');
      setNome('');
      setCnpj('');
      setEndereco('');
      setTelefone('');
      setEmail('');
      setSite('');
      
      // Atualizar lista
      setFornecedores(fornecedoresLocal);
    } catch (err) {
      console.error('Erro ao cadastrar fornecedor:', err);
      setErro('Erro ao cadastrar fornecedor: ' + err.message);
    }
  };
  const handleDelete = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      return;
    }
    
    setErro('');
    setMensagem('');
    
    try {
      // Simular exclusão usando localStorage
      const fornecedoresLocal = JSON.parse(localStorage.getItem('fornecedores') || '[]');
      const fornecedoresAtualizados = fornecedoresLocal.filter(f => f.id !== id);
      localStorage.setItem('fornecedores', JSON.stringify(fornecedoresAtualizados));
      
      setMensagem('Fornecedor removido com sucesso!');
      setFornecedores(fornecedoresAtualizados);
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
  };  const handleUpdate = (e) => {
    e.preventDefault();
    
    try {
      // Simular atualização usando localStorage
      const fornecedoresLocal = JSON.parse(localStorage.getItem('fornecedores') || '[]');
      const fornecedoresAtualizados = fornecedoresLocal.map(f => 
        f.id === editId 
          ? { ...f, nome: editNome, cnpj: editCnpj, endereco: editEndereco, telefone: editTelefone, email: editEmail, site: editSite }
          : f
      );
      
      localStorage.setItem('fornecedores', JSON.stringify(fornecedoresAtualizados));
      
      setMensagem('Fornecedor atualizado com sucesso!');
      setEditId(null);
      setEditNome('');
      setEditCnpj('');
      setEditEndereco('');
      setEditTelefone('');
      setEditEmail('');
      setEditSite('');
      
      setFornecedores(fornecedoresAtualizados);
    } catch (err) {
      setErro('Erro ao atualizar fornecedor: ' + err.message);
    }
  };
  if (loading) return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      fontSize: '1.2rem'
    }}>
      Carregando fornecedores...
    </div>
  );
  
  if (erro) return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      fontSize: '1.2rem'
    }}>
      {erro}
    </div>
  );
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <ProfessionalHeader />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)'
        }}></div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            GERENCIAR FORNECEDORES
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#fff',
            opacity: 0.9,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Cadastre, edite e gerencie todos os fornecedores da Leo Tech
          </p>
        </div>
      </section>
      
      {/* Conteúdo Principal */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '50px 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <Link 
            to="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(108, 117, 125, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#5a6268';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#6c757d';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ← Voltar para Home
          </Link>
        </div>

        {/* Formulário de Cadastro */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#343a40',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Cadastrar Novo Fornecedor
          </h2>
          
          <form onSubmit={handleSubmit} style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <input
              type="text"
              placeholder="Nome completo do fornecedor"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              style={{
                padding: '15px 20px',
                border: '2px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <input
              type="text"
              placeholder="CNPJ"
              value={cnpj}
              onChange={e => setCnpj(e.target.value)}
              style={{
                padding: '15px 20px',
                border: '2px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <input
              type="text"
              placeholder="Endereço completo"
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              style={{
                padding: '15px 20px',
                border: '2px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <input
              type="text"
              placeholder="Telefone de contato"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
              style={{
                padding: '15px 20px',
                border: '2px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: '15px 20px',
                border: '2px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <input
              type="url"
              placeholder="Site (ex: https://www.empresa.com)"
              value={site}
              onChange={e => setSite(e.target.value)}
              style={{
                padding: '15px 20px',
                border: '2px solid #e9ecef',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <button 
              type="submit"
              style={{
                gridColumn: '1 / -1',
                padding: '15px 30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                marginTop: '20px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              Cadastrar Fornecedor
            </button>
          </form>
        </div>

        {/* Mensagem de Feedback */}
        {mensagem && (
          <div style={{
            backgroundColor: '#d1edff',
            color: '#0c5460',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '30px',
            border: '1px solid #bee5eb',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {mensagem}
          </div>
        )}

        {/* Lista de Fornecedores */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#343a40',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Fornecedores Cadastrados ({fornecedores.length})
          </h3>
          
          <div style={{ 
            display: 'grid',
            gap: '20px'
          }}>
            {fornecedores.length === 0 ? (
              <p style={{
                textAlign: 'center',
                color: '#6c757d',
                fontSize: '1.1rem',
                padding: '40px'
              }}>
                Nenhum fornecedor cadastrado ainda.
              </p>
            ) : (
              fornecedores.map((fornecedor, idx) => (
                <div key={fornecedor.id || idx} style={{ 
                  backgroundColor: '#f8f9fa',
                  borderRadius: '15px',
                  padding: '30px',
                  border: '1px solid #dee2e6',
                  transition: 'all 0.3s ease'
                }}>
                  {editId === fornecedor.id ? (
                    <form onSubmit={handleUpdate} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '15px'
                    }}>
                      <input 
                        value={editNome} 
                        onChange={e => setEditNome(e.target.value)} 
                        placeholder="Nome completo"
                        required 
                        style={{
                          padding: '12px 15px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                      <input 
                        value={editCnpj} 
                        onChange={e => setEditCnpj(e.target.value)} 
                        placeholder="CNPJ"
                        style={{
                          padding: '12px 15px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                      <input 
                        value={editEndereco} 
                        onChange={e => setEditEndereco(e.target.value)} 
                        placeholder="Endereço completo"
                        style={{
                          padding: '12px 15px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                      <input 
                        value={editTelefone} 
                        onChange={e => setEditTelefone(e.target.value)} 
                        placeholder="Telefone"
                        style={{
                          padding: '12px 15px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                      <input 
                        value={editEmail} 
                        onChange={e => setEditEmail(e.target.value)} 
                        placeholder="E-mail"
                        type="email"
                        style={{
                          padding: '12px 15px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                      <input 
                        value={editSite} 
                        onChange={e => setEditSite(e.target.value)} 
                        placeholder="Site"
                        type="url"
                        style={{
                          padding: '12px 15px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                      />
                      <div style={{ 
                        gridColumn: '1 / -1',
                        display: 'flex', 
                        gap: '15px',
                        justifyContent: 'center',
                        marginTop: '20px'
                      }}>
                        <button 
                          type="submit"
                          style={{
                            padding: '12px 25px',
                            backgroundColor: '#28a745',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '25px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Salvar
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setEditId(null)}
                          style={{
                            padding: '12px 25px',
                            backgroundColor: '#6c757d',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '25px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <h4 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#343a40',
                        marginBottom: '20px'
                      }}>
                        {fornecedor.nome}
                      </h4>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '15px',
                        marginBottom: '25px'
                      }}>
                        {fornecedor.cnpj && (
                          <p style={{ margin: 0, color: '#6c757d' }}>
                            <strong style={{ color: '#343a40' }}>CNPJ:</strong> {fornecedor.cnpj}
                          </p>
                        )}
                        {fornecedor.endereco && (
                          <p style={{ margin: 0, color: '#6c757d' }}>
                            <strong style={{ color: '#343a40' }}>Endereço:</strong> {fornecedor.endereco}
                          </p>
                        )}
                        {fornecedor.telefone && (
                          <p style={{ margin: 0, color: '#6c757d' }}>
                            <strong style={{ color: '#343a40' }}>Telefone:</strong> {fornecedor.telefone}
                          </p>
                        )}
                        {fornecedor.email && (
                          <p style={{ margin: 0, color: '#6c757d' }}>
                            <strong style={{ color: '#343a40' }}>E-mail:</strong> {fornecedor.email}
                          </p>
                        )}
                        {fornecedor.site && (
                          <p style={{ margin: 0, color: '#6c757d' }}>
                            <strong style={{ color: '#343a40' }}>Site:</strong> 
                            <a 
                              href={fornecedor.site} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{
                                color: '#667eea',
                                textDecoration: 'none',
                                marginLeft: '5px'
                              }}
                            >
                              {fornecedor.site}
                            </a>
                          </p>
                        )}
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        gap: '15px',
                        justifyContent: 'center'
                      }}>
                        <button 
                          onClick={() => handleEdit(fornecedor)}
                          style={{
                            padding: '12px 25px',
                            backgroundColor: '#667eea',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '25px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#5a6fd8';
                            e.target.style.transform = 'translateY(-2px)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#667eea';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(fornecedor.id)}
                          style={{
                            padding: '12px 25px',
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '25px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(220, 53, 69, 0.3)'
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#c82333';
                            e.target.style.transform = 'translateY(-2px)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#dc3545';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        <WhatsappIcon />
      </main>
      <Footer />
    </div>
  );
}

export default Fornecedor;
