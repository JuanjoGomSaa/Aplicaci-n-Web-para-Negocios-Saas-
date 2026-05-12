// misProductos.view.js
export function renderListaPedidos() {
    const content = document.getElementById("content");
    content.innerHTML = `
                <!-- SECCION 3: Lista de Pedidos -->
                <section class="ec-section ec-section--pedidos">
                    <h2 class="ec-section__title">Lista de Pedidos</h2>
                    <div id="pedidos-list" class="ec-section__placeholder">
                        <!-- Aqui va tu lista de pedidos -->
                    </div>
                </section>`;
}