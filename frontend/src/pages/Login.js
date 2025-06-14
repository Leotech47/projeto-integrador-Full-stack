import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Página de Login (estrutura inicial)
function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [novoCpf, setNovoCpf] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [mensagemCadastro, setMensagemCadastro] = useState("");
  const [cpfCancelar, setCpfCancelar] = useState("");
  const [mensagemCancelar, setMensagemCancelar] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMensagem("");
    if (!cpf || !senha) {
      setMensagem("Preencha todos os campos.");
      return;
    }
    if (senha.length < 8) {
      setMensagem("Senha deve ter no mínimo 8 caracteres.");
      return;
    }
    fetch("http://localhost:3001/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, senha }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMensagem(data.error);
        } else {
          localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));
          setMensagem("Login realizado com sucesso!");
          setTimeout(() => navigate("/"), 1000);
        }
      })
      .catch(() => setMensagem("Erro ao conectar com o servidor."));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagemCadastro("");
    if (!novoCpf || !novaSenha || !novoEmail) {
      setMensagemCadastro("Preencha todos os campos.");
      return;
    }
    if (novaSenha.length < 8) {
      setMensagemCadastro("Senha deve ter no mínimo 8 caracteres.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: novoCpf, senha: novaSenha, email: novoEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensagemCadastro("Usuário cadastrado! Verifique seu e-mail para confirmar o cadastro.");
      } else {
        setMensagemCadastro(data.error || "Erro ao cadastrar usuário.");
      }
    } catch {
      setMensagemCadastro("Erro de conexão com o servidor.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setMensagem("Logout realizado!");
  };

  const handleCancelar = async (e) => {
    e.preventDefault();
    setMensagemCancelar("");
    if (!cpfCancelar) {
      setMensagemCancelar("Informe o CPF para cancelar o cadastro.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/usuarios/cancelar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: cpfCancelar })
      });
      const data = await res.json();
      if (res.ok) {
        setMensagemCancelar("E-mail de confirmação de cancelamento enviado. Verifique sua caixa de entrada.");
      } else {
        setMensagemCancelar(data.error || "Erro ao solicitar cancelamento.");
      }
    } catch {
      setMensagemCancelar("Erro de conexão com o servidor.");
    }
  };

  const usuarioLogado = localStorage.getItem("usuarioLogado");

  return (
    <div>
      <h2>Login de Funcionário</h2>
      {usuarioLogado && (
        <div>
          <p>Usuário logado: {JSON.parse(usuarioLogado).cpf}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <form onSubmit={handleLogin} style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="CPF do usuário"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          minLength={8}
        />
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <div>{mensagem}</div>}
      <h3>Criar novo usuário</h3>
      <form onSubmit={handleCadastro}>
        <input
          type="text"
          placeholder="CPF do novo usuário"
          value={novoCpf}
          onChange={e => setNovoCpf(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail do novo usuário"
          value={novoEmail}
          onChange={e => setNovoEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha (mínimo 8 caracteres)"
          value={novaSenha}
          onChange={e => setNovaSenha(e.target.value)}
          required
          minLength={8}
        />
        <button type="submit">Cadastrar Usuário</button>
      </form>
      {mensagemCadastro && <div>{mensagemCadastro}</div>}
      <h3>Cancelar inscrição</h3>
      <form onSubmit={handleCancelar} style={{marginBottom: 20}}>
        <input
          type="text"
          placeholder="CPF do usuário para cancelar"
          value={cpfCancelar}
          onChange={e => setCpfCancelar(e.target.value)}
          required
        />
        <button type="submit">Solicitar Cancelamento</button>
      </form>
      {mensagemCancelar && <div>{mensagemCancelar}</div>}
    </div>
  );
}
export default Login;
