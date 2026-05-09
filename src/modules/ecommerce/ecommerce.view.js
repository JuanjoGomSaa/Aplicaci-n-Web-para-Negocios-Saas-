import { setupProductos } from './ecommerce/productos.js';

const content = document.getElementById('content');

export function renderECommerce() {
    content.innerHTML = `
        <h1>E-Commerce</h1>
        <p>Stock y Ventas</p>

        <div class="ecommerce-layout">

            <!-- SECCION 1: Crear Pedido (ancho completo) -->
            <section class="ec-section ec-section--pedido">
                <h2 class="ec-section__title">Crear Pedido</h2>
                <div id="crear-pedido-content" class="ec-section__placeholder">
                    <!-- Aqui va tu flujo de 3 pasos -->
                </div>
            </section>

            <!-- FILA INFERIOR: 2 columnas -->
            <div class="ec-bottom-row">

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

                <!-- SECCION 3: Lista de Pedidos -->
                <section class="ec-section ec-section--pedidos">
                    <h2 class="ec-section__title">Lista de Pedidos</h2>
                    <div id="pedidos-list" class="ec-section__placeholder">
                        <!-- Aqui va tu lista de pedidos -->
                    </div>
                </section>

            </div>
        </div>
    `;

    setupProductos();
}