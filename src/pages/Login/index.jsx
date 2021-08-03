import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { post } from '../../services/ApiClient';
import './styles.css';
import IllustrationLogin from '../../assets/illustration-comp.svg';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import Snackbar from '../../components/Snackbar';

export default function Login() {
  const { logar } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

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
