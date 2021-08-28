/* eslint-disable no-console */
import React, { useState } from 'react';
import './styles.css';
import editarPreco from '../../functions/editarPreco';
import editarId from '../../functions/editarId';
import IconFechar from '../../assets/x.svg';
import Snackbar from '../Snackbar';
import editarEndereco from '../../functions/editarEndereco';

export default function ModalItens({ selecionado, setAbrirModal, abrirModal }) {
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState('');


  async function enviarPedido(selecionado) {
    console.log(selecionado)
  }

  return (
    <>
      {abrirModal &&
        <div className="modal">
          <div className="base n-pedido">
            <img
              className="fechar"
              src={IconFechar}
              alt='fechar'
              onClick={() => setAbrirModal(false)} />
            <div className="cart-titulo">
              {selecionado && editarId(selecionado.id)}
            </div>
            <div className="area-endereco">
              <div>
                <span className="txt-end-entrega">Endereco de entrega:</span>
                <span className="text-endereco">
                  {selecionado && editarEndereco(selecionado.endereco)}
                </span>
              </div>
            </div>
            <div className="cartbox">
              {selecionado.itens.map((item) => (
                <div className="mini-card">
                  <img src={item.url_imagem} alt={item.nome} />
                  <div className="mini-detalhes">
                    <div className="mini-nome">{item.nome}</div>
                    <div className="mini-quantidade">{item.quantidade} unidade{item.quantidade > 1 && "s"}</div>
                    <div className="mini-preco">{item && editarPreco((item.preco*item.quantidade), true)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="fim-pedido">
              <div className="txt-fim">
                Total
              </div>
              <div className="txt-total">
                {selecionado && editarPreco(selecionado.total, true)}
              </div>
            </div>
            <div className="center-this-button">
              <button
                onClick={() => enviarPedido(selecionado)}
                className="aceitar">
                Enviar pedido
              </button>
            </div>
          </div>
          <Snackbar
            mensagem={mensagem}
            openSnack={openSnack}
            setOpenSnack={setOpenSnack}
          />
        </div>
      }

    </>
  );
}
