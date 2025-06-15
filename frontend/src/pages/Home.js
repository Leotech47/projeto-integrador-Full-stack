import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsappIcon from '../components/WhatsappIcon';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Header />
      <main>
        <h2>Bem-vindo à Leo Tech</h2>
        <section>
          <h3>Sanduíches</h3>
          <ul>
            <li>X-Burguer</li>
            <li>X-Salada</li>
            <li>X-Bacon</li>
          </ul>
          <h3>Bebidas</h3>
          <ul>
            <li>Refrigerante</li>
            <li>Suco</li>
            <li>Água</li>
          </ul>
        </section>
        <Link to="/login">
          <button style={{ marginTop: 20 }}>Login de Funcionário</button>
        </Link>
        <WhatsappIcon />
      </main>
      <Footer />
    </div>
  );
}
export default Home;
