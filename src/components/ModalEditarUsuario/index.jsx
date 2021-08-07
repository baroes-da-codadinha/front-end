/* eslint-disable no-console */
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { put } from '../../services/ApiClient';
import './styles.css';
import editarValorMinimo from '../../functions/editarValorMinimo';
import conferirValorMinimo from '../../functions/conferirValorMinimo';
import guardarValorMinimo from '../../functions/guardarValorMinimo';
import editarTaxaEntrega from '../../functions/editarTaxaEntrega';
import guardarTaxaEntrega from '../../functions/guardarTaxaEntrega';
import InputImagem from '../InputImagem';
import InputSenha from '../InputSenha';
import InputTexto from '../InputTexto';
import InputValor from '../InputValor';
import Textarea from '../Textarea';
import Snackbar from '../Snackbar';

export default function ModalEditarUsuario({ dadosUsuario, setModalEditarUsuario }) {
  const { token } = useAuth();
  const valorMinimoEditado = editarValorMinimo(dadosUsuario.restaurante.valor_minimo_pedido);
  const taxaEntregaEditado = editarTaxaEntrega(dadosUsuario.restaurante.taxa_entrega);

  const [nome, setNome] = useState(dadosUsuario.usuario.nome);
  const [email, setEmail] = useState(dadosUsuario.usuario.email);
  const [nomeRestaurante, setNomeRestaurante] = useState(dadosUsuario.restaurante.nome);
  const [descricao, setDescricao] = useState(dadosUsuario.restaurante.descricao);
  const [taxaEntrega, setTaxaEntrega] = useState(taxaEntregaEditado);
  const [tempoEntrega, setTempoEntrega] = useState(dadosUsuario.restaurante.tempo_entrega);
  const [valorMinimo, setValorMinimo] = useState(valorMinimoEditado);
  const [senha, setSenha] = useState('');
  const [senhaRepetida, setSenhaRepetida] = useState('');
  const [urlImagem, setUrlImagem] = useState(dadosUsuario.usuario.url_imagem);

  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function atualizarusuario(event) {
    event.preventDefault();

    if (!conferirValorMinimo(valorMinimo)) {
      setErro('Valor inválido. Os valor informados deve ter o formato: R$ XX,XX');
      setOpenSnack(true);
      return;
    }

    if (!nome) {
      setErro('Nome é um campo obrigatório.');
      setOpenSnack(true);
      return;
    }

    const editarusuario = {
      nome,
      email,
      senha,
      restaurante: {
        nome: nomeRestaurante,
        descricao,
        taxaEntrega: guardarTaxaEntrega(taxaEntrega),
        tempoEntregaEmMinutos: tempoEntrega,
        valorMinimoPedido: guardarValorMinimo(valorMinimo),
      },
    };

    try {
      const resposta = await put(`usuarios/${dadosUsuario.usuario.id}`, editarusuario, token);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }

      console.log(resposta);

      setModalEditarUsuario(false);
      window.location.reload();
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }
  }

  function cancelar() {
    setModalEditarUsuario(false);
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
                  label="Taxa de entrega"
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
