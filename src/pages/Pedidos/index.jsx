/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { get } from '../../services/ApiClient';
import './styles.css';
import Cabecalho from '../../components/Cabecalho';
import Snackbar from '../../components/Snackbar';
import Tabela from '../../components/Tabela';

export default function DashPedidos() {
    const { token } = useAuth();

    const [pedidos, setPedidos] = useState([]);
    const [filtro, setFiltro] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    async function onLoad() {
        try {
            const resposta = await get('pedidos', token);

            if (resposta) {
                const arrayPedidos = await resposta.json();
                if (arrayPedidos.length === 0) {
                    setPedidos();
                    return;
                }
                setPedidos(arrayPedidos);
                return;
            }
        } catch (error) {
            setMensagem({ texto: error.message, status: 'erro' });
        }
    }


    return (
        <div>
            {/* modal ver produto */}
            <div className={false && 'blurry'}>
                <Cabecalho />
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

                <Tabela />
            </div>
            <Snackbar
                mensagem={mensagem}
                openSnack={openSnack}
                setOpenSnack={setOpenSnack}
            />
        </div>
    );
}
