import {store} from '../../../core/store.js'
import { renderProductosDisponibles } from './ui/seleccionarPedidoui.js';
import { renderExiste, renderCarritoPedido } from './ui/carritoPedidoui.js';
import { renderTotalPedido } from './ui/totalPedidoui.js';

let ultimoAnuncioId = null;
let total;


function eliminarProductoCarrito(){
    const divCarrito = document.getElementById('contenedor-estable');

    divCarrito.removeEventListener('click', handleEliminarProductoCarrito);
    divCarrito.addEventListener('click', handleEliminarProductoCarrito);
}


function escucharCantidades() {
    const divCarrito = document.getElementById('contenedor-estable');
    divCarrito.removeEventListener('input', handleCantidad);
    divCarrito.addEventListener('input', handleCantidad);
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

    ultimoAnuncioId = null;
    const producto = store.productos.find(p => p.id === id);
    store.carrito.push(producto);  

    renderCarritoPedido();    
    eliminarProductoCarrito();

    escucharCantidades(); 
    totalPedido();

}

function handleEliminarProductoCarrito (e){
    const btnEliminarCarrito = e.target.closest('.btn-delete');

    if(!btnEliminarCarrito){
        return;
    }
    
    const id = btnEliminarCarrito.dataset.id;
    store.carrito = store.carrito.filter(c => c.id !== id);

    renderCarritoPedido();
    totalPedido();
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


export function carritoTotal (){
    total = 0;
}


function totalPedido() {
    total = 0;
    store.carrito.forEach(producto => {
        const input = document.querySelector(`.cantidad-producto[data-id="${producto.id}"]`);
        const cantidad = input ? parseFloat(input.value) || 1 : 1;
        total += parseFloat(producto.precio) * cantidad;
    });

    renderTotalPedido(total);
}

function handleCantidad(e) {
    if (!e.target.classList.contains('cantidad-producto')) return;
    totalPedido();
}