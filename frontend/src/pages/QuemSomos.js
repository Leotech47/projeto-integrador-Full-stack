import React from 'react';
import ProfessionalHeader from '../components/ProfessionalHeader';
import Footer from '../components/Footer';

const QuemSomos = () => {
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
            NOSSA HISTÓRIA
          </h1>          <p style={{
            fontSize: '1.3rem',
            color: '#ecf0f1',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Conheça a trajetória da Leo Tech e nossa missão
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
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            <div>              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '30px'
              }}>
                A Leo Tech
              </h2>              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: '#555',
                marginBottom: '25px'
              }}>
                A Leo Tech está situada na cidade de Juiz de Fora - MG. Nossa instituição foi fundada 
                em 2025 com o objetivo de revolucionar a gestão empresarial através de soluções 
                tecnológicas inovadoras.
              </p>
              
              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: '#555',
                marginBottom: '25px'
              }}>
                Fomos pioneiros no desenvolvimento de sistemas integrados para pequenas e médias empresas, 
                oferecendo uma plataforma completa que unifica o gerenciamento de fornecedores, 
                produtos e relatórios em uma única solução.
              </p>
              
              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: '#555'
              }}>
                Em poucos meses de lançamento, nossa plataforma se tornou referência no mercado, 
                sendo reconhecida pela sua interface intuitiva e funcionalidades robustas.
              </p>
            </div>
            
            <div style={{
              background: '#f8f9fa',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px',
                fontSize: '2.5rem'
              }}>
                🎯
              </div>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Nossa Missão
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#555',
                textAlign: 'center'
              }}>
                Simplificar e otimizar a gestão empresarial através de tecnologia acessível, 
                proporcionando eficiência e crescimento sustentável para nossos clientes.
              </p>
            </div>
          </div>

          {/* Seção Valores */}
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
              NOSSOS VALORES
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
              gap: '40px'
            }}>
              <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(45deg, #3498db, #2980b9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2rem'
                }}>
                  💡
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '15px'
                }}>
                  Inovação
                </h3>
                <p style={{
                  color: '#555',
                  lineHeight: '1.6'
                }}>
                  Constantemente buscamos novas formas de melhorar nossos serviços e 
                  atender às necessidades em evolução do mercado.
                </p>
              </div>

              <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(45deg, #27ae60, #229954)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2rem'
                }}>
                  🤝
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '15px'
                }}>
                  Compromisso
                </h3>
                <p style={{
                  color: '#555',
                  lineHeight: '1.6'
                }}>
                  Nosso compromisso com a excelência garante que cada cliente receba 
                  o melhor suporte e as melhores soluções.
                </p>
              </div>

              <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(45deg, #9b59b6, #8e44ad)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2rem'
                }}>
                  🌟
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '15px'
                }}>
                  Qualidade
                </h3>
                <p style={{
                  color: '#555',
                  lineHeight: '1.6'
                }}>
                  Mantemos os mais altos padrões de qualidade em todos os aspectos 
                  do nosso trabalho e produtos.
                </p>
              </div>
            </div>
          </div>

          {/* Seção Timeline */}
          <div style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '20px',
            padding: '60px 40px',
            marginTop: '60px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              NOSSA EVOLUÇÃO
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
              gap: '40px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '15px',
                padding: '30px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#e74c3c',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  2025
                </div>
                <div>                  <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Fundação da Leo Tech</h3>
                  <p style={{ color: '#555', margin: 0 }}>
                    Início das atividades com foco em soluções tecnológicas para gestão empresarial.
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '15px',
                padding: '30px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#3498db',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  2025
                </div>
                <div>
                  <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Lançamento da Plataforma</h3>
                  <p style={{ color: '#555', margin: 0 }}>
                    Primeiro sistema integrado de gestão com módulos de fornecedores e produtos.
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '15px',
                padding: '30px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#27ae60',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  2025
                </div>
                <div>
                  <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Expansão dos Recursos</h3>
                  <p style={{ color: '#555', margin: 0 }}>
                    Adição de relatórios avançados e funcionalidades de análise de dados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuemSomos;
