import React, { useState } from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import IllustrationLogin from '../../assets/illustration-comp.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const login = {
      email,
      senha,
    };
    console.log(login);
  }

  return (
    <div className="img-login">
      <img className="ilustracao" src={IllustrationLogin} alt="" />
      <div className="base login">
        <div className="title-box">
          <span className="titulo pagina">Login</span>
        </div>
        <form>
          <InputTexto
            label="Email"
            value={email}
            setValue={setEmail}
          />
          <InputSenha
            label="Senha"
            value={senha}
            setValue={setSenha}
          />
          <div className="button-box">
            <button
              className="aceitar"
              type="submit"
              onClick={(event) => handleSubmit(event)}
            >
              Entrar
            </button>
          </div>
          <div className="link-box">
            <span>Ainda não tem uma conta? </span>
            <NavLink to="/cadastro"> Cadastre-se</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
