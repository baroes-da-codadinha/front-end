/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import Illustration from '../../assets/illustration.svg';
import IllustrationTwo from '../../assets/illustration-2.svg';
import InputSenha from '../../components/InputSenha';

export default function Cadastro() {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <div className="img-cadastro">
      <img className="ilustracao 1" src={Illustration} alt="" />
      <img className="ilustracao 2" src={IllustrationTwo} alt="" />
      <div className="base cadastro">
        <span className="titulo pagina">Cadastro</span>
        <form className="formulario">
          <div className="flex-column">
            <label htmlFor="nome">Nome de usuário</label>
            <input id="nome" type="text" />
          </div>
          <div className="flex-column">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" />
          </div>
          <InputSenha
            label="Senha"
            value={senha}
            setValue={setSenha}
          />
          <InputSenha
            label="Repita a senha"
            value={confirmarSenha}
            setValue={setConfirmarSenha}
          />
          <div className="button-box">
            <button className="cancelar" type="button">Anterior</button>
            <button className="aceitar" type="submit">Próximo</button>
          </div>
          <div className="link-box">
            <span>Já tem uma conta? </span>
            <NavLink to="/"> Login</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
