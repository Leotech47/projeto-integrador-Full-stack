import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessionalHeader from '../components/ProfessionalHeader';
import Footer from '../components/Footer';

// Página de Login (estrutura inicial)
function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [novoCpf, setNovoCpf] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [mensagemCadastro, setMensagemCadastro] = useState("");
  const [cpfCancelar, setCpfCancelar] = useState("");
  const [mensagemCancelar, setMensagemCancelar] = useState("");
  const [emailReenvio, setEmailReenvio] = useState("");
  const [mensagemReenvio, setMensagemReenvio] = useState("");
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [mensagemRecuperacao, setMensagemRecuperacao] = useState("");
  const [mostrarReenvio, setMostrarReenvio] = useState(false);
  const [mostrarRecuperacao, setMostrarRecuperacao] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMensagem("");
    if (!cpf || !senha) {
      setMensagem("Preencha todos os campos.");
      return;
    }
    if (senha.length < 8) {
      setMensagem("Senha deve ter no mínimo 8 caracteres.");
      return;
    }
    fetch("http://localhost:3001/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, senha }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
        } else {
          localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));
          setMensagem("Login realizado com sucesso!");
          setTimeout(() => navigate("/"), 1000);
        }
      })
      .catch(() => setMensagem("Erro ao conectar com o servidor."));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagemCadastro("");
    if (!novoCpf || !novaSenha || !novoEmail) {
      setMensagemCadastro("Preencha todos os campos.");
      return;
    }
    if (novaSenha.length < 8) {
      setMensagemCadastro("Senha deve ter no mínimo 8 caracteres.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: novoCpf, senha: novaSenha, email: novoEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensagemCadastro("Usuário cadastrado! Verifique seu e-mail para confirmar o cadastro.");
      } else {
        setMensagemCadastro(data.error || "Erro ao cadastrar usuário.");
      }
    } catch {
      setMensagemCadastro("Erro de conexão com o servidor.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setMensagem("Logout realizado!");
  };

  const handleCancelar = async (e) => {
    e.preventDefault();
    setMensagemCancelar("");
    if (!cpfCancelar) {
      setMensagemCancelar("Informe o CPF para cancelar o cadastro.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/usuarios/cancelar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: cpfCancelar })
      });
      const data = await res.json();
      if (res.ok) {
        setMensagemCancelar("E-mail de confirmação de cancelamento enviado. Verifique sua caixa de entrada.");
      } else {
        setMensagemCancelar(data.error || "Erro ao solicitar cancelamento.");
      }
    } catch {
      setMensagemCancelar("Erro de conexão com o servidor.");
    }
  };

  const handleReenviarEmail = async (e) => {
    e.preventDefault();
    setMensagemReenvio("");
    if (!emailReenvio) {
      setMensagemReenvio("Informe o email para reenviar a confirmação.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/usuarios/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailReenvio }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensagemReenvio("Email de confirmação reenviado! Verifique sua caixa de entrada.");
      } else {
        setMensagemReenvio(data.error || "Erro ao reenviar email.");
      }
    } catch {
      setMensagemReenvio("Erro de conexão com o servidor.");
    }
  };

  const handleRecuperarSenha = async (e) => {
    e.preventDefault();
    setMensagemRecuperacao("");
    if (!emailRecuperacao) {
      setMensagemRecuperacao("Informe o email para recuperar a senha.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/usuarios/recuperar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailRecuperacao }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensagemRecuperacao("Email de recuperação enviado! Verifique sua caixa de entrada.");
      } else {
        setMensagemRecuperacao(data.error || "Erro ao solicitar recuperação de senha.");
      }
    } catch {
      setMensagemRecuperacao("Erro de conexão com o servidor.");
    }
  };
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <ProfessionalHeader />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            ACESSO AO SISTEMA
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#ecf0f1',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Entre na sua conta ou crie uma nova para acessar nossa plataforma
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
            {/* Seção de Login */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '2px solid #3498db15'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(45deg, #3498db, #2980b9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2rem'
                }}>
                  🔐
                </div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>
                  Fazer Login
                </h2>
                <p style={{
                  color: '#555',
                  fontSize: '1rem'
                }}>
                  Acesse sua conta existente
                </p>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    CPF:
                  </label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
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
                    placeholder="Digite seu CPF"
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    Senha:
                  </label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
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
                    placeholder="Digite sua senha"
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(45deg, #3498db, #2980b9)',
                    color: '#fff',
                    border: 'none',
                    padding: '18px 40px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '10px',
                    textTransform: 'uppercase',
                    boxShadow: '0 6px 20px rgba(52, 152, 219, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
                  }}
                >
                  Entrar
                </button>

                {mensagem && (
                  <div style={{
                    padding: '15px',
                    borderRadius: '10px',
                    background: mensagem.includes('sucesso') ? '#d4edda' : '#f8d7da',
                    color: mensagem.includes('sucesso') ? '#155724' : '#721c24',
                    border: `1px solid ${mensagem.includes('sucesso') ? '#c3e6cb' : '#f5c6cb'}`,
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    {mensagem}
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '20px'
                }}>
                  <button
                    type="button"
                    onClick={() => setMostrarReenvio(!mostrarReenvio)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3498db',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textDecoration: 'underline'
                    }}
                  >
                    Reenviar email de confirmação
                  </button>
                  <button
                    type="button"
                    onClick={() => setMostrarRecuperacao(!mostrarRecuperacao)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3498db',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textDecoration: 'underline'
                    }}
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </form>

              {/* Formulário de Reenvio de Email */}
              {mostrarReenvio && (
                <div style={{
                  marginTop: '30px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  border: '2px solid #e1e8ed'
                }}>
                  <h4 style={{
                    color: '#2c3e50',
                    marginBottom: '20px',
                    fontSize: '1.2rem'
                  }}>
                    Reenviar Email de Confirmação
                  </h4>
                  <form onSubmit={handleReenviarEmail} style={{ display: 'grid', gap: '15px' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        color: '#2c3e50',
                        fontWeight: '600'
                      }}>
                        Email:
                      </label>
                      <input
                        type="email"
                        value={emailReenvio}
                        onChange={(e) => setEmailReenvio(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e1e8ed',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        placeholder="Digite seu email"
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        background: 'linear-gradient(45deg, #27ae60, #229954)',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 25px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Reenviar
                    </button>
                    {mensagemReenvio && (
                      <div style={{
                        padding: '10px',
                        borderRadius: '8px',
                        background: '#d4edda',
                        color: '#155724',
                        border: '1px solid #c3e6cb',
                        fontSize: '0.9rem'
                      }}>
                        {mensagemReenvio}
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* Formulário de Recuperação de Senha */}
              {mostrarRecuperacao && (
                <div style={{
                  marginTop: '30px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  border: '2px solid #e1e8ed'
                }}>
                  <h4 style={{
                    color: '#2c3e50',
                    marginBottom: '20px',
                    fontSize: '1.2rem'
                  }}>
                    Recuperar Senha
                  </h4>
                  <form onSubmit={handleRecuperarSenha} style={{ display: 'grid', gap: '15px' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        color: '#2c3e50',
                        fontWeight: '600'
                      }}>
                        Email:
                      </label>
                      <input
                        type="email"
                        value={emailRecuperacao}
                        onChange={(e) => setEmailRecuperacao(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e1e8ed',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                        placeholder="Digite seu email"
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        background: 'linear-gradient(45deg, #f39c12, #e67e22)',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 25px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Recuperar
                    </button>
                    {mensagemRecuperacao && (
                      <div style={{
                        padding: '10px',
                        borderRadius: '8px',
                        background: '#d4edda',
                        color: '#155724',
                        border: '1px solid #c3e6cb',
                        fontSize: '0.9rem'
                      }}>
                        {mensagemRecuperacao}
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Seção de Cadastro */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '2px solid #27ae6015'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(45deg, #27ae60, #229954)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2rem'
                }}>
                  👤
                </div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>
                  Novo Cadastro
                </h2>
                <p style={{
                  color: '#555',
                  fontSize: '1rem'
                }}>
                  Crie sua conta gratuita
                </p>
              </div>

              <form onSubmit={handleCadastro} style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    CPF:
                  </label>
                  <input
                    type="text"
                    value={novoCpf}
                    onChange={(e) => setNovoCpf(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                    onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                    placeholder="Digite seu CPF"
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    Email:
                  </label>
                  <input
                    type="email"
                    value={novoEmail}
                    onChange={(e) => setNovoEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                    onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                    placeholder="Digite seu email"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#2c3e50',
                    fontWeight: '600'
                  }}>
                    Senha:
                  </label>
                  <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                    onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(45deg, #27ae60, #229954)',
                    color: '#fff',
                    border: 'none',
                    padding: '18px 40px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '10px',
                    textTransform: 'uppercase',
                    boxShadow: '0 6px 20px rgba(39, 174, 96, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(39, 174, 96, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
                  }}
                >
                  Cadastrar
                </button>

                {mensagemCadastro && (
                  <div style={{
                    padding: '15px',
                    borderRadius: '10px',
                    background: mensagemCadastro.includes('cadastrado') ? '#d4edda' : '#f8d7da',
                    color: mensagemCadastro.includes('cadastrado') ? '#155724' : '#721c24',
                    border: `1px solid ${mensagemCadastro.includes('cadastrado') ? '#c3e6cb' : '#f5c6cb'}`,
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    {mensagemCadastro}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Seção Cancelar Cadastro */}
          <div style={{
            marginTop: '60px',
            background: '#fff',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            border: '2px solid #e74c3c15',
            maxWidth: '600px',
            margin: '60px auto 0'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '2rem'
              }}>
                ⚠️
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '10px'
              }}>
                Cancelar Cadastro
              </h2>
              <p style={{
                color: '#555',
                fontSize: '1rem'
              }}>
                Solicite o cancelamento da sua conta
              </p>
            </div>

            <form onSubmit={handleCancelar} style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#2c3e50',
                  fontWeight: '600'
                }}>
                  CPF:
                </label>
                <input
                  type="text"
                  value={cpfCancelar}
                  onChange={(e) => setCpfCancelar(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e8ed'}
                  placeholder="Digite seu CPF"
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                  color: '#fff',
                  border: 'none',
                  padding: '18px 40px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: '10px',
                  textTransform: 'uppercase',
                  boxShadow: '0 6px 20px rgba(231, 76, 60, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
                }}
              >
                Solicitar Cancelamento
              </button>

              {mensagemCancelar && (
                <div style={{
                  padding: '15px',
                  borderRadius: '10px',
                  background: mensagemCancelar.includes('enviado') ? '#d4edda' : '#f8d7da',
                  color: mensagemCancelar.includes('enviado') ? '#155724' : '#721c24',
                  border: `1px solid ${mensagemCancelar.includes('enviado') ? '#c3e6cb' : '#f5c6cb'}`,
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  {mensagemCancelar}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
export default Login;
