import {store} from '../../../../core/store.js'

// misProductos.view.js
export function renderProductosDisponibles() {
    const productList = document.getElementById("products-list");
    productList.innerHTML = store.productosFiltrados.map(producto => `
        <div class="producto-card">
            <h3>${producto.id}</h3>
            <h3>${producto.nombre}</h3>
            <div class="producto-actions">
                <button class="btn-add" data-id="${producto.id}" data-precio="${producto.precio}">Agregar al Carrito</button>
            </div>
        </div>
    `).join('');

}

