import './styles.css';
import editarId from '../../functions/editarId';
import editarPreco from '../../functions/editarPreco';

export default function Tabela({ pedidos, setSelecionado, setAbrirModal }) {
    function selecionarItem(item) {
        setSelecionado(item);
        setAbrirModal(true)
    }
    return (
        <div className="tabela-box">
            <div className="tabela-head">
                <div>
                    Pedido
                </div>
                <div>
                    Items
                </div>
                <div>
                    Endereço
                </div>
                <div>
                    Cliente
                </div>
                <div>
                    Total
                </div>
            </div>
            {pedidos.map((item) => (
                <div
                    onClick={() => selecionarItem(item)}
                    className="tabela-item"
                    key={item.id}
                >
                    <div>{item && editarId(item.id)}
                    </div>
                    <div className="flex-column">
                        {item.itens[0].nome}
                        <br />
                        {item.itens[1] && item.itens[1].nome}
                        <br />
                        {item.itens[2] && 'Ver mais'}
                    </div>
                    <div>
                        {item.endereco.endereco + item.endereco.complemento + item.endereco.cep}
                    </div>
                    <div>{item.consumidor.nome}</div>
                    <div>{item && editarPreco(item.total, true)}</div>
                </div>
            ))}
        </div>
    )
}