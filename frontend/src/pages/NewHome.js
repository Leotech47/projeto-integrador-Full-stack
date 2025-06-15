import React from 'react';
import ProfessionalHeader from '../components/ProfessionalHeader';
import Footer from '../components/Footer';

const NewHome = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <ProfessionalHeader />
      
      {/* Hero Section */}
      <section id="home" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '600px',
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
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Conteúdo Principal */}
          <div>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              lineHeight: '1.2'
            }}>
              SISTEMA DE
            </h1>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#f39c12',
              marginBottom: '30px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              GESTÃO EMPRESARIAL
            </h2>
            <p style={{
              fontSize: '1.3rem',
              color: '#ecf0f1',
              marginBottom: '40px',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}>
              Solução completa para gerenciamento de fornecedores, produtos e relatórios empresariais.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <button style={{
                background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                color: '#fff',
                border: 'none',
                padding: '15px 30px',
                fontSize: '1.1rem',
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
              
              <button style={{
                background: 'transparent',
                color: '#fff',
                border: '2px solid #fff',
                padding: '15px 30px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
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
                Saiba Mais
              </button>
            </div>
          </div>

          {/* Painel de Acesso Rápido */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '25px',
              textAlign: 'center'
            }}>
              Acesso Rápido
            </h3>
            
            <div style={{
              display: 'grid',
              gap: '15px'
            }}>              <a href="/fornecedores" style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                background: 'linear-gradient(45deg, #3498db, #2980b9)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateX(10px)';
                e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateX(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
              }}>
                <span style={{ fontSize: '1.2rem', marginRight: '15px' }}>👥</span>
                <span style={{ fontWeight: '600' }}>Gerenciar Fornecedores</span>
              </a>
                <a href="/produtos" style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                background: 'linear-gradient(45deg, #27ae60, #229954)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateX(10px)';
                e.target.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateX(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.3)';
              }}>
                <span style={{ fontSize: '1.2rem', marginRight: '15px' }}>📦</span>
                <span style={{ fontWeight: '600' }}>Gerenciar Produtos</span>
              </a>
                <a href="/associacoes" style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                background: 'linear-gradient(45deg, #9b59b6, #8e44ad)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(155, 89, 182, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateX(10px)';
                e.target.style.boxShadow = '0 6px 20px rgba(155, 89, 182, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateX(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.3)';
              }}>
                <span style={{ fontSize: '1.2rem', marginRight: '15px' }}>📊</span>
                <span style={{ fontWeight: '600' }}>Relatórios</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="about" style={{
        padding: '80px 20px',
        background: '#fff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '20px'
          }}>
            NOSSA HISTÓRIA
          </h2>
          
          <div style={{
            width: '80px',
            height: '4px',
            background: '#e74c3c',
            margin: '0 auto 40px',
            borderRadius: '2px'
          }}></div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            marginTop: '60px'
          }}>
            <div>              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: '#555',
                textAlign: 'left'
              }}>
                A Leo Tech desenvolve soluções inovadoras para gestão empresarial desde 2025. 
                Nosso sistema integrado foi criado para otimizar o gerenciamento de fornecedores, 
                produtos e relatórios.
              </p>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: '#555',
                textAlign: 'left',
                marginTop: '20px'
              }}>
                Com foco na praticidade e eficiência, oferecemos uma plataforma completa 
                que atende às necessidades do mercado moderno.
              </p>
              
              <button style={{
                background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                color: '#fff',
                border: 'none',
                padding: '12px 25px',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '25px',
                cursor: 'pointer',
                marginTop: '30px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                Saiba Mais
              </button>
            </div>
            
            <div style={{
              background: '#f8f9fa',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '20px'
              }}>
                Por que escolher nosso sistema?
              </h3>
              
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <span style={{ color: '#555' }}>Interface intuitiva e moderna</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <span style={{ color: '#555' }}>Gestão completa de estoque</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <span style={{ color: '#555' }}>Relatórios detalhados</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <span style={{ color: '#555' }}>Suporte técnico especializado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Módulos */}
      <section id="menu" style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '20px'
          }}>
            MÓDULOS
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            {/* Card Fornecedores */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
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
                👥
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '15px'
              }}>
                Gestão de Fornecedores
              </h3>
              <p style={{
                color: '#555',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Cadastre, edite e gerencie seus fornecedores com informações completas: CNPJ, endereço, contato e muito mais.
              </p>
              <a href="/fornecedores" style={{
                color: '#3498db',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Acessar Módulo →
              </a>
            </div>

            {/* Card Produtos */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
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
                📦
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '15px'
              }}>
                Controle de Produtos
              </h3>
              <p style={{
                color: '#555',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Gerencie seu inventário com controle total de estoque, preços e informações detalhadas dos produtos.
              </p>
              <a href="/produtos" style={{
                color: '#27ae60',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Acessar Módulo →
              </a>
            </div>

            {/* Card Relatórios */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #9b59b6, #8e44ad)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '2rem'
              }}>
                📊
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '15px'
              }}>
                Relatórios e Análises
              </h3>
              <p style={{
                color: '#555',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Gere relatórios completos, exporte para PDF/CSV e tenha insights valiosos sobre seu negócio.
              </p>
              <a href="/associacoes" style={{
                color: '#9b59b6',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Acessar Módulo →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section id="contact" style={{
        padding: '80px 20px',
        background: '#2c3e50',
        color: '#fff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            ENTRE EM CONTATO
          </h2>
          
          <div style={{
            width: '80px',
            height: '4px',
            background: '#e74c3c',
            margin: '0 auto 40px',
            borderRadius: '2px'
          }}></div>
          
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '60px',
            color: '#bdc3c7'
          }}>
            Fale conosco e tire suas dúvidas sobre nosso sistema de gestão empresarial.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginTop: '40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#e74c3c',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '1.5rem'
              }}>
                📞
              </div>              <h3 style={{ marginBottom: '10px' }}>Telefone</h3>
              <p style={{ color: '#bdc3c7' }}>(32) 99199-2575</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#e74c3c',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '1.5rem'
              }}>
                ✉️
              </div>
              <h3 style={{ marginBottom: '10px' }}>E-mail</h3>
              <p style={{ color: '#bdc3c7' }}>contato@leotech.com.br</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#e74c3c',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                fontSize: '1.5rem'
              }}>
                📍
              </div>              <h3 style={{ marginBottom: '10px' }}>Endereço</h3>
              <p style={{ color: '#bdc3c7' }}>Avenida Presidente Costa e Silva, 1755<br />São Pedro, Juiz de Fora - MG<br />CEP: 36037-000</p>
            </div>
          </div>

          <div style={{
            marginTop: '60px',
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ marginBottom: '30px' }}>Envie uma Mensagem</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <input 
                type="text" 
                placeholder="Seu Nome"
                style={{
                  padding: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '1rem'
                }}
              />
              <input 
                type="email" 
                placeholder="Seu E-mail"
                style={{
                  padding: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '1rem'
                }}
              />
            </div>
            <textarea 
              placeholder="Sua Mensagem"
              rows="4"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                marginBottom: '20px',
                resize: 'vertical'
              }}
            ></textarea>
            <button style={{
              background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
              color: '#fff',
              border: 'none',
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              Enviar Mensagem
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewHome;
