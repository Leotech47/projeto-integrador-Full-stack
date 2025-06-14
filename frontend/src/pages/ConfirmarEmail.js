import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function ConfirmarEmail() {
  const [searchParams] = useSearchParams();
  const [mensagem, setMensagem] = useState('Confirmando e-mail...');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setMensagem('Token inválido.');
      return;
    }
    fetch(`http://localhost:3001/usuarios/confirmar-email?token=${token}`)
      .then(res => res.text())
      .then(msg => {
        setMensagem(msg);
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(() => setMensagem('Erro ao confirmar e-mail.'));
  }, [searchParams, navigate]);

  return (
    <div>
      <h2>Confirmação de E-mail</h2>
      <p>{mensagem}</p>
    </div>
  );
}
export default ConfirmarEmail;
