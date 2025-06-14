import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function ConfirmarCancelamento() {
  const [searchParams] = useSearchParams();
  const [mensagem, setMensagem] = useState('Confirmando cancelamento...');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setMensagem('Token inválido.');
      return;
    }
    fetch(`http://localhost:3001/usuarios/confirmar-cancelamento?token=${token}`)
      .then(res => res.text())
      .then(msg => {
        setMensagem(msg);
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(() => setMensagem('Erro ao confirmar cancelamento.'));
  }, [searchParams, navigate]);

  return (
    <div>
      <h2>Cancelamento de Cadastro</h2>
      <p>{mensagem}</p>
    </div>
  );
}
export default ConfirmarCancelamento;
