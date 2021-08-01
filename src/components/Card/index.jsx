/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import './styles.css';
import Pizza from '../../assets/pizza.png';
import editarPreco from '../../functions/editarPreco';

export default function Card({ produto, setModal, setProdutoEditado }) {
  const [editando, setEditando] = useState(false);
  const { nome, preco, descricao } = produto;
  return (
    <>
      <div style={{ position: 'relative' }}>
        {editando && (
        <div className="botoes-edicao">
          <button
            className="excluir"
            type="button"
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
            <div className="card-preco">{editarPreco(preco, true)}</div>
          </div>
          <div className="flex-column">
            <img src={Pizza} alt={nome} />
          </div>
        </div>
      </div>
    </>
  );
}
