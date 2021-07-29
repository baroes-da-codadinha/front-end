import React from 'react';
import './styles.css';
import Cabecalho from '../../components/Cabecalho';
import Modal from '../../components/Modal';

export default function Dashboard() {
  const criarNovoProduto = false; // apenas p/ teste
  const produto = ''; // apenas p/ teste
  return (
    <div>
      {criarNovoProduto && <Modal produto={produto ?? null} />}
      <div className={criarNovoProduto && 'blurry'}>
        <Cabecalho />
        <div className="container-produtos">
          ok
        </div>
      </div>
    </div>
  );
}
