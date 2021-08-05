import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { get } from '../../services/ApiClient';
import './styles.css';
import Avatar from '../../assets/pizza.png';
import Illustration from '../../assets/illustration-3.svg';
import Snackbar from '../Snackbar';

export default function Cabecalho() {
  const history = useHistory();
  const { token, deslogar } = useAuth();

  const [info, setInfo] = useState('');

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  function logout() {
    history.push('/');
    deslogar();
  }

  async function onLoad() {
    try {
      const resposta = await get('usuarios', token);
      setInfo(await resposta.json());
      console.log(info);
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      {
        info && (
          <>
            <div
              className="imagem-cabecalho"
              style={{ backgroundImage: `url(${info.categoria.url_imagem})` }}
            />
            <img className="dash-ilustracao" src={Illustration} alt="" />
            <div className="avatar-borda">
              <img src={Avatar} alt="avatar" />
            </div>
            <div className="localizar-titulo">
              <span className="titulo sombreado">
                {info.restaurante.nome}
              </span>
              <button
                className="botao-logout sombreado"
                type="button"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          </>
        )
      }
      <Snackbar
        erro={erro}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
