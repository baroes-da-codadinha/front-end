/* eslint-disable max-len */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { post } from '../../services/ApiClient';
import './styles.css';
import InputImagem from '../InputImagem';
import InputTexto from '../InputTexto';
import InputValor from '../InputValor';
import Textarea from '../Textarea';
import Toggle from '../Toggle';
import Snackbar from '../Snackbar';

export default function Modal({ produto, setModal, setProdutoEditado }) {
  const history = useHistory();
  const [nome, setNome] = useState(produto ? produto.nome : '');
  const [descricao, setDescricao] = useState(produto ? produto.descricao : '');
  const [valor, setValor] = useState(produto ? produto.preco : '');
  const [ativar, setAtivar] = useState(produto ? produto.ativo : false);
  const [observacoes, setObservacoes] = useState(produto ? produto.permite_observacoes : false);
  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function criarProduto(event) {
    event.preventDefault();
    const novoProduto = {
      nome,
      descricao,
      valor,
      ativar,
      observacoes,
    };

    try {
      const resposta = await post('produtos', novoProduto);

      // eslint-disable-next-line no-console
      console.log(resposta.ok);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }

      history.push('/produtos');
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }
  }

  // async function atualizarProduto(event) {
  //   event.preventDefault();
  // }

  return (
    <>
      <div className="modal">
        <div className="base n-produto">
          <div className="title-box">
            <span className="titulo pagina">{`${produto ? 'Editar' : 'Novo'} produto`}</span>
          </div>
          <form onSubmit={(event) => criarProduto(event)}>
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
        <Snackbar
          erro={erro}
          openSnack={openSnack}
          setOpenSnack={setOpenSnack}
        />
      </div>
    </>
  );
}
