/* eslint-disable max-len */
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { put } from '../../services/ApiClient';
import './styles.css';
import editarPreco from '../../functions/editarPreco';
import conferirPreco from '../../functions/conferirPreco';
import guardarPreco from '../../functions/guardarPreco';
import InputImagem from '../InputImagem';
import InputTexto from '../InputTexto';
import InputValor from '../InputValor';
import Textarea from '../Textarea';
import Toggle from '../Toggle';
import Snackbar from '../Snackbar';

export default function ModalEditarProduto({ produto, setModalEditarProduto, setProdutoEditado }) {
  const { token } = useAuth();
  let precoEditado = produto.preco.toString();
  precoEditado = editarPreco(precoEditado);

  const [nome, setNome] = useState(produto.nome);
  const [descricao, setDescricao] = useState(produto.descricao);
  const [preco, setPreco] = useState(precoEditado);
  const [ativo, setAtivo] = useState(produto.ativo);
  const [permiteObservacoes, setPermiteObservacoes] = useState(produto.permite_observacoes);

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function atualizarProduto(event) {
    event.preventDefault();

    if (!conferirPreco(preco)) {
      setErro('Valores inválidos. Os valores informados devem ter o formato: R$ XX,XX');
      setOpenSnack(true);
      return;
    }

    const editarProduto = {
      nome,
      descricao,
      preco: guardarPreco(preco),
      ativo,
      permiteObservacoes,
    };

    try {
      const resposta = await put('produtos', editarProduto, token);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }

      setModalEditarProduto(false);
      setProdutoEditado(null);
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }
  }

  function cancelar() {
    setModalEditarProduto(false);
    setProdutoEditado(null);
  }

  return (
    <>
      <div className="modal">
        <div className="base n-produto">
          <div className="title-box">
            <span className="titulo pagina">Editar produto</span>
          </div>
          <form onSubmit={(event) => atualizarProduto(event)}>
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
                  value={preco}
                  setValue={setPreco}
                />
                <Toggle
                  label="Ativar"
                  value={ativo}
                  setValue={setAtivo}
                />
                <Toggle
                  label="Permitir observações"
                  value={permiteObservacoes}
                  setValue={setPermiteObservacoes}
                />

              </div>
              <div className="modal-colunas" />
              <InputImagem />
            </div>
            <div className="produtos-botoes">
              <button
                className="cancelar"
                type="button"
                onClick={() => cancelar()}
              >
                Cancelar
              </button>
              <button
                className="aceitar"
                type="submit"
              >
                Salvar alterações
              </button>
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
