import React from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';
import Illustration from '../../assets/illustration-3.svg';
import Avatar from '../../assets/pizza.png';
import useAuth from '../../hooks/useAuth';

export default function Cabecalho() {
  const history = useHistory();
  const { deslogar } = useAuth();

  function logout() {
    history.push('/');
    deslogar();
  }
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
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
