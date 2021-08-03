import React, { useState } from 'react';
import './styles.css';
import InputTexto from '../InputTexto';
import Textarea from '../Textarea';
import Toggle from '../Toggle';
import InputValor from '../InputValor';
import InputImagem from '../InputImagem';

export default function Modal({ produto, setModal, setProdutoEditado }) {
  const [nome, setNome] = useState(produto ? produto.nome : '');
  const [descricao, setDescricao] = useState(produto ? produto.descricao : '');
  const [valor, setValor] = useState(produto ? produto.preco : '');
  const [ativar, setAtivar] = useState(produto ? produto.ativo : false);
  const [observacoes, setObservacoes] = useState(produto ? produto.permite_observacoes : false);

  return (
    <>
      <div className="modal">
        <div className="base n-produto">
          <div className="title-box">
            <span className="titulo pagina">{`${produto ? 'Editar' : 'Novo'} produto`}</span>
          </div>
          <form>
            <div className="flex-row">
              <div className="modal-colunas">
                <InputTexto
                  label="Nome"
                  value={nome}
                  setValue={setNome}
                />
                <Textarea
                  label="Descrição"
                  maxLength="80"
                  value={descricao}
                  setValue={setDescricao}
                />
                <InputValor
                  label="Valor"
                  value={valor}
                  setValue={setValor}
                />
                <Toggle
                  label="Ativar"
                  value={ativar}
                  setValue={setAtivar}
                />
                <Toggle
                  label="Permitir observações"
                  value={observacoes}
                  setValue={setObservacoes}
                />

              </div>
              <div className="modal-colunas" />
              <InputImagem />
            </div>
            <div className="produtos-botoes">
              <button
                className="cancelar"
                type="button"
                onClick={() => {
                  setModal(false);
                  setProdutoEditado(null);
                }}
              >
                Cancelar
              </button>
              {produto ? (
                <button
                  className="aceitar"
                  type="button"
                >
                  Salvar alteracoes
                </button>
              ) : (
                <button
                  className="aceitar"
                  type="submit"
                >
                  Adicionar produto ao cardápio
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
