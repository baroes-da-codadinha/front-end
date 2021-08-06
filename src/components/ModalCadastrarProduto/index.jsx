/* eslint-disable max-len */
import React, { useState } from 'react';
import imageToBase64 from 'image-to-base64/browser';
import useAuth from '../../hooks/useAuth';
import { get, post } from '../../services/ApiClient';
import conferirPreco from '../../functions/conferirPreco';
import './styles.css';
import uploadImagem from '../../functions/uploadImagem';
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
  const [preco, setPreco] = useState('00,00');
  const [ativo, setAtivo] = useState(true);
  const [permiteObservacoes, setPermiteObservacoes] = useState(false);
  const [urlImagem, setUrlImagem] = useState('');

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function criarProduto(event) {
    event.preventDefault();

    if (!conferirPreco(preco)) {
      setErro('Valor inválido. Os valor informados deve ter o formato: R$ XX,XX');
      setOpenSnack(true);
      return;
    }

    if (!nome) {
      setErro('Nome é um campo obrigatório.');
      setOpenSnack(true);
      return;
    }

    try {
      const resposta = await (await get('usuarios', token)).json();

      const base64Imagem = await imageToBase64(urlImagem);

      const imagemSalva = {
        nome: `produtos/${resposta.restaurante.id}/${nome}`,
        imagem: base64Imagem,
      };

      const novaUrl = uploadImagem(imagemSalva, token);
      console.log(novaUrl);
      setUrlImagem(novaUrl);
      // salvando a imagem, sem mandar no set;
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }

    const novoProduto = {
      nome,
      descricao,
      preco: guardarPreco(preco),
      ativo,
      permiteObservacoes,
      urlImagem,
    };

    try {
      const resposta = await post('produtos', novoProduto, token);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }

      setModalCadastrarProduto(false);
      setCadastroProduto(false);
      // window.location.reload();
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
              <InputImagem
                value={urlImagem}
                setValue={setUrlImagem}
              />
            </div>
            <div className="produtos-botoes">
              <button
                className="cancelar"
                type="button"
                onClick={() => setModalCadastrarProduto(false)}
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
