import { store } from '../../../core/store.js';

export function renderPedidosView() {
    console.log("hola desde epdidos")
    const listPedidos = document.getElementById('pedidos-list');

    let html = '';

    store.pedidos.forEach(pedidos => {
        html +=  `
            <div class="pedido-card">
                <h3>${pedidos.producto}</h3>
                <h3>${pedidos.cliente}</h3>
                <h3>${pedidos.cantidad}</h3>

            </div>
        `;
    });

    listPedidos.innerHTML = html;
}