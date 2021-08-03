import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { get } from '../../services/ApiClient';
import './styles.css';
import Cabecalho from '../../components/Cabecalho';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import Snackbar from '../../components/Snackbar';

export default function Dashboard() {
  const { token } = useAuth();

  const [modal, setModal] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtoEditado, setProdutoEditado] = useState(null);

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function onLoad() {
    try {
      const resposta = await get('produtos', token);

      if (resposta) {
        const arrayProdutos = await resposta.json();
        if (arrayProdutos.length === 0) {
          setProdutos();
          return;
        }
        setProdutos(arrayProdutos);
        return;
      }
    } catch (error) {
      setErro(error.message);
    }
  }

  useEffect(() => {
    onLoad();
  }, [produtos]);

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
