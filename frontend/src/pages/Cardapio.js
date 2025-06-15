import React from 'react';
import ProfessionalHeader from '../components/ProfessionalHeader';
import Footer from '../components/Footer';

const Cardapio = () => {
  const modulos = [
    {
      id: 1,
      nome: 'Gestão de Fornecedores',
      descricao: 'Sistema completo para cadastro, edição e gerenciamento de fornecedores',
      recursos: ['Cadastro completo com CNPJ', 'Histórico de compras', 'Avaliações de desempenho', 'Contratos e documentos'],
      icone: '👥',
      cor: '#3498db',
      link: '/fornecedores'
    },
    {
      id: 2,
      nome: 'Controle de Produtos',
      descricao: 'Gerencie seu inventário com total controle de estoque e preços',
      recursos: ['Controle de estoque em tempo real', 'Gestão de preços', 'Categorização avançada', 'Alertas de baixo estoque'],
      icone: '📦',
      cor: '#27ae60',
      link: '/produtos'
    },
    {
      id: 3,
      nome: 'Relatórios e Análises',
      descricao: 'Relatórios detalhados e análises para tomada de decisões',
      recursos: ['Dashboards interativos', 'Exportação PDF/CSV', 'Gráficos e métricas', 'Análises preditivas'],
      icone: '📊',
      cor: '#9b59b6',
      link: '/associacoes'
    },
    {
      id: 4,
      nome: 'Gestão Financeira',
      descricao: 'Controle financeiro integrado com contas a pagar e receber',
      recursos: ['Fluxo de caixa', 'Conciliação bancária', 'Controle de inadimplência', 'Projeções financeiras'],
      icone: '💰',
      cor: '#f39c12',
      link: '#'
    },
    {
      id: 5,
      nome: 'CRM Avançado',
      descricao: 'Sistema de relacionamento com clientes e gestão de vendas',
      recursos: ['Pipeline de vendas', 'Histórico de interações', 'Automação de marketing', 'Análise de comportamento'],
      icone: '🤝',
      cor: '#e74c3c',
      link: '#'
    },
    {
      id: 6,
      nome: 'Integração API',
      descricao: 'Conecte-se com outros sistemas e plataformas facilmente',
      recursos: ['APIs RESTful', 'Webhooks em tempo real', 'Sincronização automática', 'Documentação completa'],
      icone: '🔗',
      cor: '#34495e',
      link: '#'
    }
  ];

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
            NOSSOS MÓDULOS
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#ecf0f1',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Descubra todas as funcionalidades da nossa plataforma
          </p>
        </div>
      </section>

      {/* Seção de Módulos */}
      <section style={{
        padding: '80px 20px',
        background: '#fff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '20px'
            }}>
              FUNCIONALIDADES COMPLETAS
            </h2>
            
            <div style={{
              width: '80px',
              height: '4px',
              background: '#e74c3c',
              margin: '0 auto 30px',
              borderRadius: '2px'
            }}></div>
            
            <p style={{
              fontSize: '1.2rem',
              color: '#555',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Nossa plataforma oferece uma gama completa de módulos integrados para 
              atender todas as necessidades da sua empresa.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px'
          }}>
            {modulos.map((modulo) => (
              <div key={modulo.id} style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                border: `3px solid ${modulo.cor}15`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = modulo.cor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = `${modulo.cor}15`;
              }}>
                
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: `linear-gradient(45deg, ${modulo.cor}, ${modulo.cor}dd)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 25px',
                  fontSize: '2.5rem',
                  boxShadow: `0 8px 20px ${modulo.cor}40`
                }}>
                  {modulo.icone}
                </div>
                
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  {modulo.nome}
                </h3>
                
                <p style={{
                  color: '#555',
                  lineHeight: '1.6',
                  marginBottom: '25px',
                  textAlign: 'center'
                }}>
                  {modulo.descricao}
                </p>
                
                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '15px'
                  }}>
                    Principais Recursos:
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {modulo.recursos.map((recurso, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                        color: '#555'
                      }}>
                        <span style={{
                          color: modulo.cor,
                          marginRight: '10px',
                          fontSize: '1.2rem'
                        }}>
                          ✓
                        </span>
                        {recurso}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <a href={modulo.link} style={{
                    background: `linear-gradient(45deg, ${modulo.cor}, ${modulo.cor}dd)`,
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '12px 25px',
                    borderRadius: '25px',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 4px 15px ${modulo.cor}40`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = `0 6px 20px ${modulo.cor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = `0 4px 15px ${modulo.cor}40`;
                  }}>
                    {modulo.link === '#' ? 'Em Breve' : 'Acessar Módulo'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Call to Action */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            PRONTO PARA COMEÇAR?
          </h2>
          
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '40px',
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            Transforme a gestão da sua empresa com nossa plataforma completa. 
            Comece hoje mesmo e veja a diferença!
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
              color: '#fff',
              border: 'none',
              padding: '15px 35px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(231, 76, 60, 0.4)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
            }}>
              Começar Agora
            </button>
            
            <a href="/contato" style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              padding: '15px 35px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#667eea';
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(0)';
            }}>
              Fale Conosco
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cardapio;
