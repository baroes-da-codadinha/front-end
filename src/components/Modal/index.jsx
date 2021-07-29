import React, { useState } from 'react';
import './styles.css';
import InputTexto from '../InputTexto';
import Textarea from '../Textarea';
import Toggle from '../Toggle';
import InputValor from '../InputValor';
import InputImagem from '../InputImagem';

export default function Modal({ produto }) {
  const [nome, setNome] = useState(produto.nome ?? '');
  const [descricao, setDescricao] = useState(produto.descricao ?? '');
  const [valor, setValor] = useState(produto.preco ?? '');
  const [ativar, setAtivar] = useState(produto.ativo ?? false);
  const [observacoes, setObservacoes] = useState(produto.permite_observacoes ?? false);

  return (
    <>
      <div className="modal">
        <div className="base n-produto">
          <div className="title-box">
            <span className="titulo pagina">Cadastro</span>
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
                  type="button"
                >
                  Adicionar produto ao cardápio
                </button>
              ) }

            </div>
          </form>
        </div>
      </div>
    </>
  );
}
