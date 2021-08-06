/* eslint-disable no-console */
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { put } from '../../services/ApiClient';
import './styles.css';
import editarPreco from '../../functions/editarPreco';
import conferirPreco from '../../functions/conferirPreco';
import guardarPreco from '../../functions/guardarPreco';
import InputImagem from '../InputImagem';
import InputSenha from '../InputSenha';
import InputTexto from '../InputTexto';
import InputValor from '../InputValor';
import Textarea from '../Textarea';
import Snackbar from '../Snackbar';

export default function ModalEditarUsuario({ usuario, setModalEditarUsuario, setUsuarioEditado }) {
  const { token } = useAuth();
  const valorMinimoEditado = editarPreco(usuario.valorMinimo);

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.nome);
  const [nomeRestaurante, setNomeRestaurante] = useState(usuario.nome);
  const [descricao, setDescricao] = useState(usuario.descricao);
  const [taxaEntrega, setTaxaEntrega] = useState(usuario.nome);
  const [tempoEntrega, setTempoEntrega] = useState(usuario.nome);
  const [valorMinimo, setValorMinimo] = useState(valorMinimoEditado);
  const [senha, setSenha] = useState('');
  const [senhaRepetida, setSenhaRepetida] = useState('');
  const [urlImagem, setUrlImagem] = useState(usuario.url_imagem);

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function atualizarusuario(event) {
    event.preventDefault();

    if (!conferirPreco(valorMinimo)) {
      setErro('Valor inválido. Os valor informados deve ter o formato: R$ XX,XX');
      setOpenSnack(true);
      return;
    }

    if (!nome) {
      setErro('Nome é um campo obrigatório.');
      setOpenSnack(true);
      return;
    }

    const editarUsuario = {
      nome,
      email,
      nomeRestaurante,
      descricao,
      taxaEntrega,
      tempoEntrega,
      valorMinimo: guardarPreco(valorMinimo),
      senha,
      urlImagem,
    };

    try {
      const resposta = await put(`usuarios/${usuario.id}`, editarUsuario, token);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }

      console.log(resposta);

      setModalEditarUsuario(false);
      setUsuarioEditado(null);
      window.location.reload();
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }
  }

  function cancelar() {
    setModalEditarUsuario(false);
    setUsuarioEditado(null);
  }

  return (
    <>
      <div className="modal">
        <div className="base n-usuario">
          <div className="title-box">
            <span className="titulo pagina">Editar Perfil</span>
          </div>
          <form onSubmit={(event) => atualizarusuario(event)}>
            <div className="flex-row">
              <div className="modal-colunas">
                <InputTexto
                  label="Nome de usuário"
                  value={nome}
                  setValue={setNome}
                />
                <Textarea
                  label="Email"
                  value={email}
                  setValue={setEmail}
                />
                <Textarea
                  label="Nome do restaurante"
                  value={nomeRestaurante}
                  setValue={setNomeRestaurante}
                />
                <Textarea
                  label="Descrição"
                  maxLength="80"
                  value={descricao}
                  setValue={setDescricao}
                />
                <InputValor
                  label="Valor minimo do pedido"
                  value={taxaEntrega}
                  setValue={setTaxaEntrega}
                />
                <Textarea
                  label="Tempo estimado de entrega"
                  value={tempoEntrega}
                  setValue={setTempoEntrega}
                />
                <InputValor
                  label="Valor minimo do pedido"
                  value={valorMinimo}
                  setValue={setValorMinimo}
                />
                <InputSenha
                  label="Senha"
                  value={senha}
                  setValue={setSenha}
                />
                <InputSenha
                  label="Repita a senha"
                  value={senhaRepetida}
                  setValue={setSenhaRepetida}
                />
              </div>
              <div className="modal-colunas" />
              <InputImagem
                value={urlImagem}
                setValue={setUrlImagem}
              />
            </div>
            <div className="usuarios-botoes">
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
