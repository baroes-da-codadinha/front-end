import React, { useState } from 'react';
import './styles.css';
import { NavLink, useHistory } from 'react-router-dom';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import IllustrationLogin from '../../assets/illustration-comp.svg';
import Snackbar from '../../components/Snackbar';
import { post } from '../../services/ApiClient';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const { logar } = useAuth();
  const history = useHistory();

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const login = {
      email,
      senha,
    };

    if (!email || !senha) {
      setErro('Todos os dados devem ser preenchidos');
      setOpenSnack(true);
    }
    try {
      const resposta = await post('login', login);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }

      const { token } = await resposta.json();

      logar(token);

      history.push('/produtos');
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
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
        erro={erro}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
