import React, { useState } from 'react';
import './styles.css';
import Cabecalho from '../../components/Cabecalho';
import Modal from '../../components/Modal';
import Card from '../../components/Card';

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const [produtoEditado, setProdutoEditado] = useState(null);
  const produtos = true; // apenas p/ teste
  const produto = {
    nome: 'É um nome',
    descricao: 'Pula boi, pula cavalo, pula cavalo e boi',
    preco: '25000',
    ativo: false,
    permite_observacoes: true,
  }; // apenas p/ teste
  return (
    <div>
      {modal && (
      <Modal
        produto={produtoEditado}
        setModal={setModal}
        setProdutoEditado={setProdutoEditado}
      />
      )}
      <div className={modal && 'blurry'}>
        <Cabecalho />
        <div className={`sub-cabecalho ${!produtos && 'vazio'}`}>
          <div>
            <span>
              Você ainda não tem nenhum produto no seu cardápio.
              <br />
              Gostaria de adicionar um novo produto?
            </span>
          </div>
          <button
            className="aceitar"
            type="button"
            onClick={() => setModal(true)}
          >
            Adicionar produto ao cardápio
          </button>
        </div>
        {produtos && (
          <div className="container-produtos">
            <Card produto={produto} setModal={setModal} setProdutoEditado={setProdutoEditado} />
            <Card produto={produto} />
            <Card produto={produto} />
            <Card produto={produto} />
          </div>
        )}
      </div>
    </div>
  );
}
