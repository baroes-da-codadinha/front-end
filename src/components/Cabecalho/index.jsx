import React from 'react';
import './styles.css';
import Illustration from '../../assets/illustration-3.svg';
import Avatar from '../../assets/pizza.png';

export default function Cabecalho() {
  return (
    <div>
      <div className="imagem-cabecalho" />
      <img className="dash-ilustracao" src={Illustration} alt="" />
      <div className="avatar-borda">
        <img src={Avatar} alt="avatar" />
      </div>
      <div className="localizar-titulo">
        <span className="titulo">
          Nome da pizzaria
        </span>
        <button
          className="botao-logout"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
