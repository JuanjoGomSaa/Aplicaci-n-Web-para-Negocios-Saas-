import {store} from '../../../core/store.js'
import { renderProductosDisponibles } from './ui/seleccionarPedidoui.js';
import { renderExiste, renderCarritoPedido } from './ui/carritoPedido.ui.js';
let ultimoAnuncioId = null;

export function seleccionarProducto(){
    renderProductosDisponibles();
    const productList = document.getElementById("products-list");

    productList.removeEventListener('click', handleAgregarCarrito);
    productList.addEventListener('click', handleAgregarCarrito);
}

function handleAgregarCarrito(e) {
    const btn = e.target.closest('.btn-add');
    if (!btn) return;
    
    const id = btn.dataset.id;
    const existeEnCarrito = store.carrito.find(p => p.id === id);
    
    if (existeEnCarrito) {
        if (ultimoAnuncioId !== id) {
            ultimoAnuncioId = id;
            renderExiste();       // solo pinta, sin lógica
            closeAdvertencia();
        }
        return;
    }

    ultimoAnuncioId = null;
    const producto = store.productos.find(p => p.id === id);
    store.carrito.push(producto);  
    renderCarritoPedido();
}

function closeAdvertencia() {
    const anuncioCard = document.querySelector('.anuncio-card');
    anuncioCard.addEventListener('click', (e) => {
        const btnClose = e.target.closest('.btn-close');
        if (!btnClose) return;
        ultimoAnuncioId = null;
        renderCarritoPedido();
    });
}