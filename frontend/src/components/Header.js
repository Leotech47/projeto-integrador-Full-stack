import { Link } from 'react-router-dom';

// Componente Header
function Header() {
  return (
    <header>
      <h1>Garagem Hamburgueria</h1>
      {/* Atalhos para páginas com alinhamento personalizado */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, margin: '20px 0' }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <Link to="/fornecedores">Página de Fornecedor</Link>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Link to="/produtos">Página de Produto</Link>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <Link to="/associacoes">Associação Produto/Fornecedor</Link>
        </div>
      </nav>
    </header>
  );
}
export default Header;
