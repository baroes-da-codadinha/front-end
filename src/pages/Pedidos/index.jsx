/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { get } from '../../services/ApiClient';
import './styles.css';
import Cabecalho from '../../components/Cabecalho';
import Snackbar from '../../components/Snackbar';
import Tabela from '../../components/Tabela';
import ModalItens from '../../components/ModalItens';

export default function DashPedidos() {
    const { token } = useAuth();


    const [filtro, setFiltro] = useState(true);
    const [abrirModal, setAbrirModal] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    const [selecionado, setSelecionado] = useState('')
    const [pedidos, setPedidos] = useState([
        {
            id: 1,
            consumidor: {
                nome: "Rodrigo"
            },
            endereco: {
                cep: "37553195",
                endereco: "Rua Arlindo Lopes da Silva",
                complemento: "Ao lado da quitanda"
            },
            itens: [
                {
                    nome: "Pizza",
                    preco: 5000,
                    quantidade: 2,
                    url_imagem: "https://via.placeholder.com/150"
                },
            ],
            restaurante_id: 1,
            subtotal: 50000,
            taxa: 4500,
            total: 54500,
            entregue: false,
            enviado: false,
        },
        {
            id: 2,
            consumidor: {
                nome: "Rodrigo Mais novo"
            },
            endereco: {
                cep: "37553195",
                endereco: "Rua Arlindo Lopes da Silva",
                complemento: "Ao lado da quitanda"
            },
            itens: [
                {
                    nome: "Pizza",
                    preco: 5000,
                    quantidade: 2,
                    url_imagem: "https://via.placeholder.com/150"
                },
                {
                    nome: "Pizza",
                    preco: 5000,
                    quantidade: 2,
                    url_imagem: "https://via.placeholder.com/150"
                },
                {
                    nome: "Pizza",
                    preco: 5000,
                    quantidade: 2,
                    url_imagem: "https://via.placeholder.com/150"
                },
                {
                    nome: "Pizza",
                    preco: 5000,
                    quantidade: 2,
                    url_imagem: "https://via.placeholder.com/150"
                },
                {
                    nome: "Pizza",
                    preco: 5000,
                    quantidade: 2,
                    url_imagem: "https://via.placeholder.com/150"
                },
                {
                    nome: "Pizza",
                    preco: 5000,
                    quantidade: 2,
                    url_imagem: "https://via.placeholder.com/150"
                },
            ],
            restaurante_id: 1,
            subtotal: 50000,
            taxa: 4500,
            total: 54500,
            entregue: false,
            enviado: true,
        },
    ]);

    async function onLoad() {
        try {
            const resposta = await get('pedidos', token);

            if (resposta) {
                const arrayPedidos = await resposta.json();
                console.log(arrayPedidos)
                if (arrayPedidos.length === 0) {
                    setPedidos([]);
                    return;
                }
                setPedidos(arrayPedidos);
                return;
            }
        } catch (error) {
            setMensagem({ texto: error.message, status: 'erro' });
            setOpenSnack(true);
        }
    }
    return (
        <div>
            <ModalItens
                selecionado={selecionado}
                abrirModal={abrirModal}
                setAbrirModal={setAbrirModal}
            />
            <div className={abrirModal && 'blurry'}>
                <Cabecalho
                />
                <div className='sub-cabecalho-pedidos'>
                    <div className={`noselect select left ${filtro && 'ativo'}`}
                        onClick={() => setFiltro(!filtro)}
                    >
                        Não entregues
                    </div>
                    <div className={`noselect select right ${!filtro && 'ativo'}`}
                        onClick={() => setFiltro(!filtro)}
                    >
                        Entregues
                    </div>
                </div>

                <Tabela
                    pedidos={pedidos}
                    setSelecionado={setSelecionado}
                    setAbrirModal={setAbrirModal} />
            </div>
            <Snackbar
                mensagem={mensagem}
                openSnack={openSnack}
                setOpenSnack={setOpenSnack}
            />
        </div>
    );
}
