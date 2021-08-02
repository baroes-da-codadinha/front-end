/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './styles.css';
import Cabecalho from '../../components/Cabecalho';
import Modal from '../../components/Modal';
import Card from '../../components/Card';
// import { get } from '../../services/ApiClient';

export default function Dashboard() {
  const [modal, setModal] = useState(false);
  const [produtoEditado, setProdutoEditado] = useState(null);
  const [produtos, setProdutos] = useState([]);

  // async function onLoad() {
  //   try {
  //     const resposta = await get('produtos', token);
  //     setProdutos(await resposta.json());
  //   } catch (error) {
  //     setValues({ ...values, erro: error.message });
  //   }
  // }

  // useEffect(() => {

  // });
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
    </div>
  );
}
