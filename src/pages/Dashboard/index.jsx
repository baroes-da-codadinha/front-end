import React, { useState, useEffect } from 'react';
import './styles.css';
import Cabecalho from '../../components/Cabecalho';
import Modal from '../../components/Modal';
import Card from '../../components/Card';
import useAuth from '../../hooks/useAuth';
import { get } from '../../services/ApiClient';
import Snackbar from '../../components/Snackbar';

export default function Dashboard() {
  const { token } = useAuth();
  const [modal, setModal] = useState(false);
  const [produtoEditado, setProdutoEditado] = useState(null);
  const [produtos, setProdutos] = useState([]);

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function onLoad() {
    try {
      const resposta = await get('produtos', token);
      if (resposta) {
        console.log(await resposta.json());
        setProdutos();
      }
    } catch (error) {
      setErro(error.message);
    }
  }

  useEffect(() => {
    onLoad();
  });
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
            {
              produtos.map((produto) => (
                <Card produto={produto} setModal={setModal} setProdutoEditado={setProdutoEditado} />
              ))
            }
          </div>
        )}
      </div>
      <Snackbar
        erro={erro}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
