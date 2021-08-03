/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import './styles.css';
import Pizza from '../../assets/pizza.png';
import Snackbar from '../Snackbar';
import editarPreco from '../../functions/editarPreco';
import { del } from '../../services/ApiClient';
import useAuth from '../../hooks/useAuth';

export default function Card({ produto, setModal, setProdutoEditado }) {
  const { token } = useAuth();
  const { nome, preco, descricao } = produto;
  const [editando, setEditando] = useState(false);
  const novoPreco = preco.toString();
  const precoFormatado = useRef(editarPreco(novoPreco, true));

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function excluirProduto() {
    const { id } = produto;
    try {
      const resposta = await del(`produtos/${id}`, token);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }
  }
  return (
    <>
      <div style={{ position: 'relative' }}>
        {editando && (
        <div className="botoes-edicao">
          <button
            className="excluir"
            type="button"
            onClick={() => excluirProduto(produto)}
          >
            Excluir produto do catálogo
          </button>
          <button
            className="aceitar"
            type="button"
            onClick={() => {
              setModal(true);
              setProdutoEditado(produto);
            }}
          >
            Editar produto
          </button>
        </div>
        )}
        <div
          className={editando ? 'card blur' : 'card'}
          onClick={() => setEditando(!editando)}
        >
          <div className="flex-column">
            <span className="card-titulo">{nome}</span>
            <span className="card-texto">{descricao}</span>
            <div className="card-preco">{precoFormatado.current}</div>
          </div>
          <div className="flex-column">
            <img src={Pizza} alt={nome} />
          </div>
        </div>
      </div>
      <Snackbar
        erro={erro}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </>
  );
}
