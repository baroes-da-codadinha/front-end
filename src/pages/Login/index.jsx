import React, { useState } from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import IllustrationLogin from '../../assets/illustration-comp.svg';
import Snackbar from '../../components/Snackbar';
import api from '../../services/api';
import useAuthProvider from '../../hooks/useAuthProvider';

export default function Login() {
  const [openSnack, setOpenSnack] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const login = {
      email,
      senha,
    };
    console.log(login);
    try {
      const response = await api.post('/api/usuarios/login', { email, senha });
      useAuthProvider.login(response.data.token);
    } catch (err) {
      console.log(err);
    }
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
      <Snackbar
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
