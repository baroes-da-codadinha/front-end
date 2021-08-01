/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import Textarea from '../../components/Textarea';
import InputValor from '../../components/InputValor';
import Stepper from '../../components/Stepper';
import api from '../../services/api';

export default function Cadastro() {
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
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [restaurante, setRestaurante] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [taxa, setTaxa] = useState('');
  const [tempo, setTempo] = useState('');
  const [minimo, setMinimo] = useState('');

  async function handleCriarconta() {
    const cadastro = {
      nome,
      email,
      senha,
      restaurante: {
        nome: restaurante,
        descricao,
        categoria,
        taxaEntrega: taxa,
        tempoEntregaEmMinutos: tempo,
        valorMinimoPedido: minimo,
      },
    };
    console.log(cadastro);
    try {
      const response = await api.post('api/usuarios/cadastrarUsuario', {
        nome,
        email,
        senha,
        restaurante,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleIr() {
    const newStep = [...step];
    for (let i = 0; i < newStep.length; i++) {
      if (newStep[i].status === 'editando') {
        newStep[i].status = 'concluido';
      }
      if (newStep[i].status === '') {
        newStep[i].status = 'editando';
        break;
      }
    }
    setStep(newStep);
  }

  function handleVoltar() {
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
        <form className="formulario">
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
                value={restaurante}
                setValue={setRestaurante}
              />
              <InputTexto
                label="Categoria do restaurante"
                value={categoria}
                setValue={setCategoria}
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
                value={taxa}
                setValue={setTaxa}
              />
              <InputTexto
                label="Tempo estimado de entrega (em minutos)"
                value={tempo}
                setValue={setTempo}
              />
              <InputValor
                label="Valor mínimo do pedido"
                value={minimo}
                setValue={setMinimo}
              />
            </div>
          )}
          <div className="button-box">
            <button
              className="cancelar"
              type="button"
              onClick={() => handleVoltar()}
              disabled={!step[1].status}
            >
              Anterior
            </button>
            {step[2].status ? (
              <button
                className="aceitar"
                type="button"
                onClick={() => handleCriarconta()}
              >
                Criar conta
              </button>
            ) : (
              <button
                className="aceitar"
                type="button"
                onClick={() => handleIr()}
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
    </div>
  );
}
