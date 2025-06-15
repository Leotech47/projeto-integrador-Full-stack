import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NewHome from './pages/NewHome';
import QuemSomos from './pages/QuemSomos';
import Cardapio from './pages/Cardapio';
import Contato from './pages/Contato';
import Produto from './pages/Produto';
import Fornecedor from './pages/Fornecedor';
import Associacao from './pages/Associacao';
import Login from './pages/Login';
import ConfirmarEmail from './pages/ConfirmarEmail';
import ConfirmarCancelamento from './pages/ConfirmarCancelamento';

function isAuthenticated() {
  return !!localStorage.getItem('usuarioLogado');
}

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewHome />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/produtos" element={<PrivateRoute><Produto /></PrivateRoute>} />
        <Route path="/fornecedores" element={<PrivateRoute><Fornecedor /></PrivateRoute>} />
        <Route path="/associacoes" element={<Associacao />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmar-email" element={<ConfirmarEmail />} />
        <Route path="/confirmar-cancelamento" element={<ConfirmarCancelamento />} />
      </Routes>
    </Router>
  );
}
export default App;
