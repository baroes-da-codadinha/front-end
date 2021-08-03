import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { post } from '../../services/ApiClient';
import './styles.css';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import InputValor from '../../components/InputValor';
import Snackbar from '../../components/Snackbar';
import Stepper from '../../components/Stepper';
import Textarea from '../../components/Textarea';

export default function Cadastro() {
  const history = useHistory();
  const [step, setStep] = useState([{
    valor: '1',
    status: 'editando',
  }, {
    valor: '2',
    status: '',
  }, {
    valor: '3',
    status: '',
  },
  ]);
  const [erro, setErro] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nomeDoRestaurante, setNomeDoRestaurante] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [taxaEntrega, setTaxaEntrega] = useState('');
  const [tempoEntregaMinutos, setTempoEntregaMinutos] = useState('');
  const [valorMinimoPedido, setValorMinimoPedido] = useState('');

  async function handleCriarconta(event) {
    event.preventDefault();
    const cadastro = {
      nome,
      email,
      senha,
      restaurante: {
        nome: nomeDoRestaurante,
        descricao,
        idCategoria,
        taxaEntrega,
        tempoEntregaMinutos,
        valorMinimoPedido,
      },
    };

    try {
      const resposta = await post('usuarios', cadastro);

      if (!resposta.ok) {
        const mensagem = await resposta.json();

        setErro(mensagem);
        setOpenSnack(true);
        return;
      }

      history.push('/');
    } catch (error) {
      setErro(error.message);
      setOpenSnack(true);
    }
  }

  function handleAvançarStep() {
    let mensagem = 'Preencha todos os itens para continuar';
    const newStep = [...step];
    for (let i = 0; i < newStep.length; i++) {
      if (newStep[i].status === 'editando') {
        if (!nome || !email || !senha || !confirmarSenha) {
          setErro(mensagem);
          setOpenSnack(true);
          break;
        }

        if (senha.length < 5) {
          setErro('A senha deve ter mais de cinco caracteres.');
          setOpenSnack(true);
          return;
        }

        if (senha !== confirmarSenha) {
          setErro('As senhas digitadas devem ser iguais');
          setOpenSnack(true);
          return;
        }

        if (newStep[0].status === 'concluido') {
          if (!nomeDoRestaurante || !idCategoria) {
            mensagem = 'Nome de restaurante e categoria são campos obrigatórios';
            setErro(mensagem);
            setOpenSnack(true);
            break;
          }
        }

        newStep[i].status = 'concluido';
      }
      if (newStep[i].status === '') {
        newStep[i].status = 'editando';
        break;
      }
    }
    setStep(newStep);
  }

  function handleVoltarStep() {
    const newStep = [...step];
    for (let i = 2; i >= 0; i--) {
      if (newStep[i].status === 'editando') {
        newStep[i].status = '';
      }
      if (newStep[i].status === 'concluido') {
        newStep[i].status = 'editando';
        break;
      }
    }
    setStep(newStep);
  }

  return (
    <div className="img-cadastro">
      <div className="base cadastro">
        <div className="title-box">
          <span className="titulo pagina">Cadastro</span>
          <Stepper step={step} />
        </div>
        <form
          className="formulario"
          onSubmit={(event) => handleCriarconta(event)}
        >
          {step[0].status === 'editando' && (
            <div className="form-um">
              <InputTexto
                label="Nome do usuário"
                value={nome}
                setValue={setNome}
              />
              <InputTexto
                label="Email"
                value={email}
                setValue={setEmail}
              />
              <InputSenha
                label="Senha"
                value={senha}
                setValue={setSenha}
              />
              <InputSenha
                label="Repita a senha"
                value={confirmarSenha}
                setValue={setConfirmarSenha}
              />
            </div>
          )}
          {step[1].status === 'editando' && (
            <div className="form-dois">
              <InputTexto
                label="Nome do restaurante"
                value={nomeDoRestaurante}
                setValue={setNomeDoRestaurante}
              />
              <InputTexto
                label="Categoria do restaurante"
                value={idCategoria}
                setValue={setIdCategoria}
              />
              <Textarea
                label="Descrição"
                maxLength="50"
                value={descricao}
                setValue={setDescricao}
              />
            </div>
          )}
          {step[2].status === 'editando' && (
            <div className="form-tres">
              <InputValor
                label="Taxa de entrega"
                value={taxaEntrega}
                setValue={setTaxaEntrega}
              />
              <InputTexto
                label="Tempo estimado de entrega (em minutos)"
                value={tempoEntregaMinutos}
                setValue={setTempoEntregaMinutos}
              />
              <InputValor
                label="Valor mínimo do pedido"
                value={valorMinimoPedido}
                setValue={setValorMinimoPedido}
              />
            </div>
          )}
          <div className="button-box">
            <button
              className="cancelar"
              type="button"
              onClick={() => handleVoltarStep()}
              disabled={!step[1].status}
            >
              Anterior
            </button>
            {step[2].status ? (
              <button
                className="aceitar"
                type="submit"
              >
                Criar conta
              </button>
            ) : (
              <button
                className="aceitar"
                type="button"
                onClick={() => handleAvançarStep()}
              >
                Próximo
              </button>
            )}
          </div>
          <div className="link-box">
            <span>Já tem uma conta? </span>
            <NavLink to="/"> Login</NavLink>
          </div>
        </form>
      </div>
      <div className="ilustracao" />
      <Snackbar
        erro={erro}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
