/* eslint-disable max-len */
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { put } from '../../services/ApiClient';
import './styles.css';
import guardarPreco from '../../functions/guardarPreco';
import InputImagem from '../InputImagem';
import InputTexto from '../InputTexto';
import InputValor from '../InputValor';
import Textarea from '../Textarea';
import Toggle from '../Toggle';
import Snackbar from '../Snackbar';

export default function ModalEditarProduto({ produto, setModalEditarProduto, setProdutoEditado }) {
  const { token } = useAuth();

  const [nome, setNome] = useState(produto ? produto.nome : '');
  const [descricao, setDescricao] = useState(produto ? produto.descricao : '');
  const [preco, setPreco] = useState(produto ? produto.preco : '');
  const [ativo, setAtivo] = useState(produto ? produto.ativo : false);
  const [permiteObservacoes, setPermiteObservacoes] = useState(produto ? produto.permite_observacoes : false);

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function atualizarProduto(event) {
    event.preventDefault();
    const editarProduto = {
      nome,
      descricao,
      preco: guardarPreco(preco),
      ativo,
      permiteObservacoes,
    };

    // eslint-disable-next-line no-console
    console.log(editarProduto);

    try {
      const resposta = await put('produtos', editarProduto, token);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }

      setModalEditarProduto(false);
      setProdutoEditado(false);
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }
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
                onClick={() => setModalEditarProduto(false)}
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
