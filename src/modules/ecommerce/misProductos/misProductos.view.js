import { setupProductos } from './productos.js';


export function renderMisProductos() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h1>E-Commerce</h1>
        <p>Stock y Ventas</p>

        <!-- SECCION 2: CRUD Productos -->
        <section class="ec-section ec-section--productos">
            <h2 class="ec-section__title">Productos</h2>
            <input id="buscar-producto" type="text" placeholder="Buscar producto por nombre">
            <form id="form-producto" class="form-editar-producto">
                <input id="nombre-producto"  type="text"   placeholder="Nombre del producto">
                <input id="precio-producto"  type="number" placeholder="Precio"       min="0" step="0.01">
                <input id="stock-producto"   type="number" placeholder="Stock inicial" min="0" step="1">
                <button id="btn-submit-producto" type="submit">Crear Producto</button>
            </form>
            <div id="productos-list"></div>
        </section>
    `;
 setupProductos();
}