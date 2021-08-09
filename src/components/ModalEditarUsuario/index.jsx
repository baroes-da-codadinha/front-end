/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState } from 'react';
import imageToBase64 from 'image-to-base64/browser';
import useAuth from '../../hooks/useAuth';
import { put } from '../../services/ApiClient';
import './styles.css';
import categorias from '../../assets/categorias';
import editarValorMinimo from '../../functions/editarValorMinimo';
// import conferirValorMinimo from '../../functions/conferirValorMinimo';
import guardarValorMinimo from '../../functions/guardarValorMinimo';
import editarTaxaEntrega from '../../functions/editarTaxaEntrega';
import guardarTaxaEntrega from '../../functions/guardarTaxaEntrega';
import uploadImagem from '../../functions/uploadImagem';
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

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [taxaEntrega, setTaxaEntrega] = useState('');
  const [tempoEntrega, setTempoEntrega] = useState('');
  const [valorMinimo, setValorMinimo] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaRepetida, setSenhaRepetida] = useState('');
  const [urlImagem, setUrlImagem] = useState('');

  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  async function atualizarusuario(event) {
    event.preventDefault();

    // if (!conferirValorMinimo(valorMinimo)) {
    //   setMensagem({ texto: 'Valor inválido. Os valor informados deve ter o formato: R$ XX,XX', status: 'erro' });
    //   setOpenSnack(true);
    //   return;
    // }

    const editarUsuario = {
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
        urlImagem,
      },
    };

    try {
      if (editarUsuario.urlImagem) {
        const base64Imagem = await imageToBase64(urlImagem);

        const idImagem = Math.floor(Math.random() * 10000);

        const imagemSalva = {
          nome: `restaurantes/${idImagem}`,
          imagem: base64Imagem,
        };

        const novaUrl = await uploadImagem(imagemSalva, token);

        editarUsuario.urlImagem = novaUrl;
      }

      const resposta = await put(`usuarios/${dadosUsuario.usuario.id}`, editarUsuario, token);

      if (!resposta.ok) {
        const msg = await resposta.json();

        setMensagem({ texto: msg, status: 'erro' });
        setOpenSnack(true);
        return;
      }

      setMensagem({ texto: 'Usuário atualizado com sucesso!', status: 'sucesso' });
      setOpenSnack(true);
      // setModalEditarUsuario(false);
      // window.location.reload();
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
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
                  placeholder={dadosUsuario.usuario.nome}
                  value={nome}
                  setValue={setNome}
                />
                <InputTexto
                  label="Email"
                  placeholder={dadosUsuario.usuario.email}
                  value={email}
                  setValue={setEmail}
                />
                <InputTexto
                  label="Nome do restaurante"
                  placeholder={dadosUsuario.restaurante.nome}
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
                  placeholder={dadosUsuario.restaurante.descricao}
                  value={descricao}
                  setValue={setDescricao}
                />
                <InputValor
                  label="Taxa de entrega"
                  placeholder={taxaEntregaEditado}
                  value={taxaEntrega}
                  setValue={setTaxaEntrega}
                />
                <InputTexto
                  label="Tempo estimado de entrega"
                  placeholder={dadosUsuario.restaurante.tempo_entrega}
                  value={tempoEntrega}
                  setValue={setTempoEntrega}
                />
                <InputValor
                  label="Valor minimo do pedido"
                  placeholder={valorMinimoEditado}
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
          mensagem={mensagem}
          openSnack={openSnack}
          setOpenSnack={setOpenSnack}
        />
      </div>
    </>
  );
}
