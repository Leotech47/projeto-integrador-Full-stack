import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsappIcon from '../components/WhatsappIcon';

// Página de Associação Produto/Fornecedor (estrutura inicial)
function Associacao() {
  const [associacoes, setAssociacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroProduto, setFiltroProduto] = useState('');
  const [filtroFornecedor, setFiltroFornecedor] = useState('');
  const relatorioRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3001/associacoes')
      .then(res => res.json())
      .then(data => {
        setAssociacoes(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch(err => {
        setErro('Erro ao buscar associações');
        setLoading(false);
      });
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(Array.isArray(data) ? data : [data]))
      .catch(() => setProdutos([]));
    fetch('http://localhost:3001/fornecedores')
      .then(res => res.json())
      .then(data => setFornecedores(Array.isArray(data) ? data : [data]))
      .catch(() => setFornecedores([]));
  }, []);

  const handleExportCSV = () => {
    const header = 'Produto,Fornecedor\n';
    const rows = filteredAssociacoes.map(a => `${a.produto_nome},${a.fornecedor_nome}`).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_associacoes.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    import('jspdf').then(jsPDF => {
      const doc = new jsPDF.jsPDF();
      doc.text('Relatório de Associação Produto x Fornecedor', 10, 10);
      let y = 20;
      filteredAssociacoes.forEach((a, idx) => {
        doc.text(`${idx + 1}. Produto: ${a.produto_nome} | Fornecedor: ${a.fornecedor_nome}`, 10, y);
        y += 10;
      });
      doc.save('relatorio_associacoes.pdf');
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredAssociacoes = associacoes.filter(a =>
    (filtroProduto ? a.produto_nome === filtroProduto : true) &&
    (filtroFornecedor ? a.fornecedor_nome === filtroFornecedor : true)
  );

  if (loading) return <div>Carregando associações...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div>
      <Header />
      <main>
        <h2>Relatório de Associação Produto x Fornecedor</h2>
        <Link to="/">Voltar para Home</Link>
        <div style={{ margin: '20px 0', display: 'flex', gap: 16, alignItems: 'center' }}>
          <label>
            Produto:
            <select value={filtroProduto} onChange={e => setFiltroProduto(e.target.value)}>
              <option value="">Todos</option>
              {produtos.map(p => (
                <option key={p.id} value={p.nome}>{p.nome}</option>
              ))}
            </select>
          </label>
          <label>
            Fornecedor:
            <select value={filtroFornecedor} onChange={e => setFiltroFornecedor(e.target.value)}>
              <option value="">Todos</option>
              {fornecedores.map(f => (
                <option key={f.id} value={f.nome}>{f.nome}</option>
              ))}
            </select>
          </label>
          <button onClick={handleExportCSV}>Exportar CSV</button>
          <button onClick={handleExportPDF}>Exportar PDF</button>
          <button onClick={handlePrint}>Imprimir Relatório</button>
        </div>
        <h3>Associações cadastradas</h3>
        <ul style={{ marginTop: 20 }} ref={relatorioRef}>
          {filteredAssociacoes.map((assoc, idx) => (
            <li key={assoc.id || idx} style={{ padding: 8, borderBottom: '1px solid #ccc' }}>
              Produto: <b>{assoc.produto_nome}</b> | Fornecedor: <b>{assoc.fornecedor_nome}</b>
            </li>
          ))}
        </ul>
        <WhatsappIcon />
      </main>
      <Footer />
    </div>
  );
}
export default Associacao;
