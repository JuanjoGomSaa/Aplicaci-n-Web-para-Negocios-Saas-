import { store } from '../../../core/store.js';

export function renderProductosView() {
    const listProducto = document.getElementById('productos-list');

    let html = '';

    store.productosFiltrados.forEach(producto => {
        html += `
            <div class="producto-card">
                <h3>${producto.id}</h3>
                <h3>${producto.nombre}</h3>
                <p>Precio: $${Number(producto.precio).toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
                <p>Stock: ${producto.stock}</p>
                <p>Creado el: ${producto.createdAt}</p>

                <div class="producto-actions">
                    <button class="btn-edit"   data-id="${producto.id}">Editar</button>
                    <button class="btn-delete" data-id="${producto.id}">Eliminar</button>
                </div>
            </div>
        `;
    });

    listProducto.innerHTML = html;
}

export function renderProductosBuscados() {
    const listProducto = document.getElementById('productos-list');

    let html = '';

    store.productosBuscados.forEach(producto => {
        html += `
            <div class="producto-card">
                <h3>${producto.id}</h3>
                <h3>${producto.nombre}</h3>
                <p>Precio: $${Number(producto.precio).toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
                <p>Stock: ${producto.stock}</p>
                <p>Creado el: ${producto.createdAt}</p>

                <div class="producto-actions">
                    <button class="btn-edit"   data-id="${producto.id}">Editar</button>
                    <button class="btn-delete" data-id="${producto.id}">Eliminar</button>
                </div>
            </div>
        `;
    });

    listProducto.innerHTML = html;
}