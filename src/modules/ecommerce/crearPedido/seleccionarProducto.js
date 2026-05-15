import {store} from '../../../core/store.js'
import { renderProductosDisponibles } from './ui/seleccionarPedidoui.js';
import { renderExiste, renderCarritoPedido } from './ui/carritoPedidoui.js';
import { renderTotalPedido } from './ui/totalPedidoui.js';

let ultimoAnuncioId = null;
let total = 0;

function eliminarProductoCarrito(){
    const divCarrito = document.getElementById('contenedor-estable');

    divCarrito.removeEventListener('click', handleEliminarProductoCarrito);
    divCarrito.addEventListener('click', handleEliminarProductoCarrito);
} 


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

    total = total + parseFloat(btn.dataset.precio);
    precioTotal(); 
    

    ultimoAnuncioId = null;
    const producto = store.productos.find(p => p.id === id);
    store.carrito.push(producto);  

    renderCarritoPedido();
    eliminarProductoCarrito();
}

function handleEliminarProductoCarrito (e){
    const btnEliminarCarrito = e.target.closest('.btn-delete');

    if(!btnEliminarCarrito){
        return;
    }
    

    const id = btnEliminarCarrito.dataset.id;
    total =  total - parseFloat(btnEliminarCarrito.dataset.precio);
    
    precioTotal(); 
    
    store.carrito = store.carrito.filter(c => c.id !== id);

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

function precioTotal() {
    renderTotalPedido(total);
}

export function resetCarrito() {
    total = 0;
}