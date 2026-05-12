import { store } from "../../../../core/store.js";

export function renderCarritoPedido() {
    const productList = document.getElementById("cart-list");
    productList.innerHTML = store.carrito.map(producto => ` 
        <div class="producto-card">
            <h3>${producto.id}</h3>
            <h3>${producto.nombre}</h3>
            <input id="cantidad-producto" type="number" placeholder="Cantidad" min="1" step="1">
            <div class="producto-actions">
                <button class="btn-delete" data-id="${producto.id}">Eliminar del Carrito</button>
            </div>
        </div>
    `).join('');
}

export function renderExiste() {
    // Elimina anuncio previo si existe antes de pintar uno nuevo
    const anuncioExistente = document.querySelector('.anuncio-card');
    if (anuncioExistente) anuncioExistente.remove();

    const productList = document.getElementById("cart-list");
    const anuncio = document.createElement('div');
    anuncio.className = 'anuncio-card';
    anuncio.innerHTML = `
        <h3>El producto ya está en el carrito</h3>
        <button class="btn-close">Cerrar</button>
    `;
    productList.prepend(anuncio);
}