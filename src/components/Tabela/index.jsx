import './styles.css';

const pedidos = [
    {
        consumidor_id: 1,
        restaurante_id: 1,
        endereco_id: 1,
        subtotal: 50000,
        taxa: 4500,
        total: 54500
    }
]

export default function Tabela() {
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
            {/* {[].map((item) => (
                        <div key={item.id}>
                            <div>{item.id}</div>
                            <div>{item.carrinho}</div>
                            <div>{item.endereco}</div>
                            <div>{item.cliente}</div>
                            <div>{item.total}</div>
                        </div>
                    ))} */}
        </div>
    )
}