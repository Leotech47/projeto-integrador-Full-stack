import React, { useState } from 'react';
import ProfessionalHeader from '../components/ProfessionalHeader';
import Footer from '../components/Footer';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    mensagem: ''
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpar mensagens ao digitar
    if (erro) setErro('');
    if (mensagem) setMensagem('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setMensagem('');

    try {
      const response = await fetch('http://localhost:3001/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          empresa: '',
          assunto: '',
          mensagem: ''
        });
      } else {
        if (data.errors && data.errors.length > 0) {
          setErro(data.errors.map(err => err.msg).join(', '));
        } else {
          setErro(data.message || 'Erro ao enviar mensagem');
        }
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setErro('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <ProfessionalHeader />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        minHeight: '400px',
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
            ENTRE EM CONTATO
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#ecf0f1',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Estamos aqui para ajudar você a transformar sua gestão empresarial
          </p>
        </div>
      </section>

      {/* Seção Principal */}
      <section style={{
        padding: '80px 20px',
        background: '#fff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'start'
          }}>
            {/* Informações de Contato */}
            <div>
              <h2 style={{
                fontSize: '2.2rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '30px'
              }}>
                Fale Conosco
              </h2>
              
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#555',
                marginBottom: '40px'
              }}>
                Nossa equipe está pronta para atender suas necessidades e esclarecer 
                todas as dúvidas sobre nossa plataforma de gestão empresarial.
              </p>

              <div style={{
                display: 'grid',
                gap: '30px',
                marginBottom: '40px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  border: '2px solid #e74c3c15'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: '#fff',
                    flexShrink: 0
                  }}>
                    📞
                  </div>                  <div>
                    <h3 style={{ color: '#2c3e50', marginBottom: '5px' }}>Telefone</h3>
                    <p style={{ color: '#555', margin: 0 }}>(32) 99199-2575</p>
                    <p style={{ color: '#777', margin: 0, fontSize: '0.9rem' }}>
                      Seg à Sex: 8h às 18h
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  border: '2px solid #3498db15'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(45deg, #3498db, #2980b9)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: '#fff',
                    flexShrink: 0
                  }}>
                    ✉️
                  </div>                  <div>
                    <h3 style={{ color: '#2c3e50', marginBottom: '5px' }}>E-mail</h3>
                    <p style={{ color: '#555', margin: 0 }}>leotechjf@gmail.com</p>
                    <p style={{ color: '#777', margin: 0, fontSize: '0.9rem' }}>
                      Resposta em até 24h
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  border: '2px solid #27ae6015'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(45deg, #27ae60, #229954)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: '#fff',
                    flexShrink: 0
                  }}>
                    📍
                  </div>                  <div>
                    <h3 style={{ color: '#2c3e50', marginBottom: '5px' }}>Endereço</h3>
                    <p style={{ color: '#555', margin: 0 }}>
                      Avenida Presidente Costa e Silva, 1755<br />
                      São Pedro, Juiz de Fora - MG<br />
                      CEP: 36037-000
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  border: '2px solid #9b59b615'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(45deg, #9b59b6, #8e44ad)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: '#fff',
                    flexShrink: 0
                  }}>
                    💬
                  </div>                  <div>
                    <h3 style={{ color: '#2c3e50', marginBottom: '5px' }}>WhatsApp</h3>
                    <p style={{ color: '#555', margin: 0 }}>(32) 99199-2575</p>
                    <p style={{ color: '#777', margin: 0, fontSize: '0.9rem' }}>
                      Atendimento rápido
                    </p>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '20px'
                }}>
                  Siga-nos nas Redes Sociais
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '15px'
                }}>
                  <a href="#" style={{
                    width: '50px',
                    height: '50px',
                    background: '#3b5998',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                    📘
                  </a>
                  <a href="#" style={{
                    width: '50px',
                    height: '50px',
                    background: '#E4405F',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                    📷
                  </a>
                  <a href="#" style={{
                    width: '50px',
                    height: '50px',
                    background: '#0077B5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                    💼
                  </a>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '2px solid #f1f2f6'
            }}>              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                Envie sua Mensagem
              </h2>

              {/* Mensagem de Erro */}
              {erro && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  borderRadius: '8px',
                  color: '#721c24',
                  marginBottom: '20px'
                }}>
                  <strong>Erro:</strong> {erro}
                </div>
              )}

              {/* Mensagem de Sucesso */}
              {mensagem && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#d4edda',
                  border: '1px solid #c3e6cb',
                  borderRadius: '8px',
                  color: '#155724',
                  marginBottom: '20px'
                }}>
                  <strong>Sucesso:</strong> {mensagem}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#2c3e50',
                      fontWeight: '600'
                    }}>
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e1e8ed',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3498db'}
                      onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#2c3e50',
                      fontWeight: '600'
                    }}>
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e1e8ed',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3498db'}
                      onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#2c3e50',
                      fontWeight: '600'
                    }}>
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e1e8ed',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3498db'}
                      onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#2c3e50',
                      fontWeight: '600'
                    }}>
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '15px',
                        border: '2px solid #e1e8ed',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3498db'}
                      onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    Assunto *
                  </label>
                  <select
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3498db'}
                    onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="demonstracao">Solicitar Demonstração</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="vendas">Informações de Vendas</option>
                    <option value="parceria">Proposta de Parceria</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    Mensagem *
                  </label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      resize: 'vertical',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3498db'}
                    onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                    placeholder="Conte-nos mais sobre como podemos ajudar..."
                  />
                </div>                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading 
                      ? 'linear-gradient(45deg, #95a5a6, #7f8c8d)' 
                      : 'linear-gradient(45deg, #e74c3c, #c0392b)',
                    color: '#fff',
                    border: 'none',
                    padding: '18px 40px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '20px',
                    textTransform: 'uppercase',
                    boxShadow: loading 
                      ? '0 6px 20px rgba(149, 165, 166, 0.4)'
                      : '0 6px 20px rgba(231, 76, 60, 0.4)',
                    opacity: loading ? 0.8 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
                    }
                  }}
                >
                  {loading ? '⏳ Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '20px'
          }}>
            PERGUNTAS FREQUENTES
          </h2>
          
          <div style={{
            width: '80px',
            height: '4px',
            background: '#e74c3c',
            margin: '0 auto 60px',
            borderRadius: '2px'
          }}></div>

          <div style={{
            display: 'grid',
            gap: '20px',
            textAlign: 'left'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
              padding: '25px',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>
                Como posso começar a usar a plataforma?
              </h3>
              <p style={{ color: '#555', margin: 0 }}>
                Entre em contato conosco para uma demonstração gratuita. Nossa equipe 
                irá apresentar todas as funcionalidades e ajudar na configuração inicial.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
              padding: '25px',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>
                A plataforma oferece suporte técnico?
              </h3>
              <p style={{ color: '#555', margin: 0 }}>
                Sim! Oferecemos suporte técnico completo através de telefone, e-mail e chat online. 
                Nossa equipe está disponível de segunda a sexta, das 8h às 18h.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
              padding: '25px',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>
                É possível integrar com outros sistemas?
              </h3>
              <p style={{ color: '#555', margin: 0 }}>
                Sim, nossa plataforma oferece APIs RESTful e webhooks para integração 
                com diversos sistemas externos, como ERPs, e-commerce e ferramentas de contabilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
