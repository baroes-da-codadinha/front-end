/* eslint-disable no-console */
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { put } from '../../services/ApiClient';
import './styles.css';
import categorias from '../../assets/categorias';
import editarValorMinimo from '../../functions/editarValorMinimo';
import conferirValorMinimo from '../../functions/conferirValorMinimo';
import guardarValorMinimo from '../../functions/guardarValorMinimo';
import editarTaxaEntrega from '../../functions/editarTaxaEntrega';
import guardarTaxaEntrega from '../../functions/guardarTaxaEntrega';
import InputImagem from '../InputImagem';
import InputSenha from '../InputSenha';
import InputSelect from '../InputSelect';
import InputTexto from '../InputTexto';
import InputValor from '../InputValor';
import Textarea from '../Textarea';
import Snackbar from '../Snackbar';

export default function ModalEditarUsuario({ dadosUsuario, setModalEditarUsuario }) {
  const { token } = useAuth();
  const valorMinimoEditado = editarValorMinimo(dadosUsuario.restaurante.valor_minimo_pedido);
  const taxaEntregaEditado = editarTaxaEntrega(dadosUsuario.restaurante.taxa_entrega);
  const indexCategoria = dadosUsuario.restaurante.categoria_id - 1;
  const categoriaEditada = categorias[indexCategoria];

  const [nome, setNome] = useState(dadosUsuario.usuario.nome);
  const [email, setEmail] = useState(dadosUsuario.usuario.email);
  const [nomeRestaurante, setNomeRestaurante] = useState(dadosUsuario.restaurante.nome);
  const [idCategoria, setIdCategoria] = useState(categoriaEditada);
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
        idCategoria: (categorias.indexOf(idCategoria) + 1),
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
      <div className="modal-plus">
        <div className="base n-cadastro">
          <div className="title-box">
            <span className="titulo pagina">Editar Perfil</span>
          </div>
          <form onSubmit={(event) => atualizarusuario(event)}>
            <div className="flex-row">
              <div className="modal-colunas maior">
                <InputTexto
                  label="Nome de usuário"
                  value={nome}
                  setValue={setNome}
                />
                <InputTexto
                  label="Email"
                  value={email}
                  setValue={setEmail}
                />
                <InputTexto
                  label="Nome do restaurante"
                  value={nomeRestaurante}
                  setValue={setNomeRestaurante}
                />
                <InputSelect
                  label="Categoria do restaurante"
                  placeholder="Selecione a categoria"
                  value={idCategoria}
                  setValue={setIdCategoria}
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
                <InputTexto
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
              <div className="modal-colunas menor" />
              <InputImagem
                value={urlImagem}
                setValue={setUrlImagem}
              />
            </div>
            <div className="cadastro-botoes">
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
