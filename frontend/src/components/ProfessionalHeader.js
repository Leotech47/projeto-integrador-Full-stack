import React, { useState } from 'react';

const ProfessionalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Header Principal */}
      <header style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        borderBottom: '3px solid #e74c3c'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              background: '#fff'
            }}>
              <img 
                src="/logo-leotech.png" 
                alt="Leo Tech Logo" 
                style={{
                  width: '45px',
                  height: '45px',
                  objectFit: 'contain',
                  borderRadius: '50%'
                }}
                onError={(e) => {
                  // Fallback caso a imagem não carregue
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `
                    <div style="
                      width: 50px;
                      height: 50px;
                      background: linear-gradient(45deg, #e74c3c, #c0392b);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: white;
                      font-size: 24px;
                      font-weight: bold;
                    ">LT</div>
                  `;
                }}
              />
            </div>
            <div>              <h1 style={{
                color: '#ecf0f1',
                fontSize: '28px',
                fontWeight: 'bold',
                margin: 0,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                Leo Tech
              </h1>
              <p style={{
                color: '#bdc3c7',
                fontSize: '14px',
                margin: 0,
                fontStyle: 'italic'
              }}>
                Sistema de Gestão Empresarial
              </p>
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav style={{
            display: window.innerWidth > 768 ? 'flex' : 'none',
            gap: '30px',
            alignItems: 'center'
          }}>            <a href="/" style={{
              color: '#ecf0f1',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              padding: '10px 15px',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(236, 240, 241, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
              Home
            </a>
            <a href="/quem-somos" style={{
              color: '#ecf0f1',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              padding: '10px 15px',
              borderRadius: '25px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(236, 240, 241, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';            }}>
              Quem Somos
            </a>
            <a href="/cardapio" style={{
              color: '#ecf0f1',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              padding: '10px 15px',
              borderRadius: '25px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(236, 240, 241, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
              Módulos
            </a>
            <a href="/contato" style={{
              color: '#ecf0f1',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              padding: '10px 15px',
              borderRadius: '25px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(236, 240, 241, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}>
              Contato
            </a>
          </nav>

          {/* Menu Mobile Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: window.innerWidth <= 768 ? 'block' : 'none',
              background: 'none',
              border: 'none',
              color: '#ecf0f1',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div style={{
            background: '#34495e',
            padding: '20px',
            display: window.innerWidth <= 768 ? 'block' : 'none'
          }}>
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>              <a href="/" style={{
                color: '#ecf0f1',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                padding: '10px 0'
              }}>Home</a>
              <a href="/quem-somos" style={{
                color: '#ecf0f1',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                padding: '10px 0'
              }}>Quem Somos</a>
              <a href="/cardapio" style={{
                color: '#ecf0f1',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                padding: '10px 0'
              }}>Módulos</a>
              <a href="/contato" style={{
                color: '#ecf0f1',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',                padding: '10px 0'
              }}>Contato</a>
            </nav>
          </div>
        )}
      </header>

      {/* Espaçador para compensar o header fixo */}
      <div style={{ height: '80px' }}></div>
    </>
  );
};

export default ProfessionalHeader;
