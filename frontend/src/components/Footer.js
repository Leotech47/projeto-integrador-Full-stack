import React from 'react';

// Componente Footer Moderno
function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: '#fff',
      padding: '60px 20px 30px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Coluna 1 - Informações da Empresa */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
              }}>
                LT
              </div>
              <div>
                <h3 style={{
                  color: '#ecf0f1',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  Leo Tech
                </h3>
                <p style={{
                  color: '#bdc3c7',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  Sistema de Gestão Empresarial
                </p>
              </div>
            </div>
            <p style={{
              color: '#bdc3c7',
              lineHeight: '1.6',
              margin: 0
            }}>
              Soluções inovadoras para gestão empresarial. Transformando a maneira como sua empresa gerencia fornecedores, produtos e relatórios.
            </p>
          </div>

          {/* Coluna 2 - Contato */}
          <div>
            <h4 style={{
              color: '#ecf0f1',
              fontSize: '1.2rem',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              Contato
            </h4>
            <div style={{
              display: 'grid',
              gap: '10px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#bdc3c7'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📞</span>
                <span>(32) 99199-2575</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#bdc3c7'
              }}>
                <span style={{ fontSize: '1.2rem' }}>✉️</span>
                <span>contato@leotech.com.br</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#bdc3c7'
              }}>
                <span style={{ fontSize: '1.2rem' }}>💬</span>
                <span>(32) 99199-2575</span>
              </div>
            </div>
          </div>

          {/* Coluna 3 - Endereço */}
          <div>
            <h4 style={{
              color: '#ecf0f1',
              fontSize: '1.2rem',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              Endereço
            </h4>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              color: '#bdc3c7'
            }}>
              <span style={{ fontSize: '1.2rem', marginTop: '2px' }}>📍</span>
              <div>
                <p style={{ margin: 0, lineHeight: '1.4' }}>
                  Avenida Presidente Costa e Silva, 1755<br />
                  São Pedro, Juiz de Fora - MG<br />
                  CEP: 36037-000
                </p>
              </div>
            </div>
          </div>

          {/* Coluna 4 - Links Rápidos */}
          <div>
            <h4 style={{
              color: '#ecf0f1',
              fontSize: '1.2rem',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              Links Rápidos
            </h4>
            <div style={{
              display: 'grid',
              gap: '8px'
            }}>
              <a href="/" style={{
                color: '#bdc3c7',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#3498db'}
              onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                Home
              </a>
              <a href="/quem-somos" style={{
                color: '#bdc3c7',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#3498db'}
              onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                Quem Somos
              </a>
              <a href="/cardapio" style={{
                color: '#bdc3c7',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#3498db'}
              onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                Módulos
              </a>
              <a href="/contato" style={{
                color: '#bdc3c7',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#3498db'}
              onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}>
                Contato
              </a>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #bdc3c7, transparent)',
          margin: '40px 0 30px'
        }}></div>

        {/* Copyright */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{
            color: '#95a5a6',
            margin: 0,
            fontSize: '0.9rem'
          }}>
            © 2025 Leo Tech. Todos os direitos reservados.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '15px'
          }}>
            <a href="#" style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#bdc3c7',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#3498db';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#bdc3c7';
              e.target.style.transform = 'translateY(0)';
            }}>
              📘
            </a>
            <a href="#" style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#bdc3c7',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#E4405F';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#bdc3c7';
              e.target.style.transform = 'translateY(0)';
            }}>
              📷
            </a>
            <a href="#" style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#bdc3c7',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#0077B5';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#bdc3c7';
              e.target.style.transform = 'translateY(0)';
            }}>
              💼
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
