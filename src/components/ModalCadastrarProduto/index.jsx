/* eslint-disable max-len */
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { post } from '../../services/ApiClient';
import conferirPreco from '../../functions/conferirPreco';
import './styles.css';
import guardarPreco from '../../functions/guardarPreco';
import InputImagem from '../InputImagem';
import InputTexto from '../InputTexto';
import InputValor from '../InputValor';
import Textarea from '../Textarea';
import Toggle from '../Toggle';
import Snackbar from '../Snackbar';

export default function ModalCadastrarProduto({ setModalCadastrarProduto, setCadastroProduto }) {
  const { token } = useAuth();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [ativo, setAtivo] = useState(false);
  const [permiteObservacoes, setPermiteObservacoes] = useState(false);

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function criarProduto(event) {
    event.preventDefault();

    if (!conferirPreco(preco)) {
      setErro('Valores inválidos. Os valores informados devem ter o formato: R$ XX,XX');
      setOpenSnack(true);
      return;
    }

    const novoProduto = {
      nome,
      descricao,
      preco: guardarPreco(preco),
      ativo,
      permiteObservacoes,
    };

    try {
      const resposta = await post('produtos', novoProduto, token);

      // eslint-disable-next-line no-console
      console.log(resposta.ok);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }

      setModalCadastrarProduto(false);
      setCadastroProduto(false);
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }
  }

  // async function atualizarProduto(event) {
  //   event.preventDefault();
  //   const editarProduto = {
  //     nome,
  //     descricao,
  //     preco: guardarPreco(preco),
  //     ativar,
  //     permiteObservacoes,
  //   };

  //   // eslint-disable-next-line no-console
  //   console.log(editarProduto);

  //   try {
  //     const resposta = await put('produtos', editarProduto, token);

  //     if (!resposta.ok) {
  //       const mensagem = await resposta.json();

  //       setErro(mensagem);
  //       setOpenSnack(true);
  //       return;
  //     }

  //     setModal(false);
  //     setProdutoEditado(false);
  //   } catch (error) {
  //     setErro(error.message);
  //     setOpenSnack(true);
  //   }
  // }

  return (
    <>
      <div className="modal">
        <div className="base n-produto">
          <div className="title-box">
            <span className="titulo pagina">Novo produto</span>
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
                onClick={() => {
                  setModalCadastrarProduto(false);
                  setCadastroProduto(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="aceitar"
                type="submit"
              >
                Adicionar produto ao cardápio
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
