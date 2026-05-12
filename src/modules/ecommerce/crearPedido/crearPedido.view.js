import {seleccionarProducto} from './seleccionarProducto.js';
// misProductos.view.js
export function renderCrearPedido() {
    const content = document.getElementById("content");
    content.innerHTML = `    
        <div class="crearPedido">     
            <section class="products-section">

            <h2>Productos Disponibles</h2>
            <div id="products-list" class="products-list"></div>
            </section>

            <section class="cart-section">
                <h2>Tu Carrito</h2>
                <div id="cart-list" class="cart-list">
                    <p class="empty-cart">El carrito está vacío.</p>
                </div>

                <div class="cart-summary">
                    <label for="discountCode">Código de descuento:</label>
                    <input type="text" id="discountCode" placeholder="Ej: DESCUENTO10" maxlength="10" />
                    <button id="applyDiscountBtn">Aplicar Descuento</button>

                    <div class="totals">
                    <p>Subtotal: <span id="subtotalDisplay">$0.00</span></p>
                    <p>Descuento: <span id="discountDisplay">-$0.00</span></p>
                    <p><strong>Total: <span id="totalDisplay">$0.00</span></strong></p>
                    </div>
                </div>
            </section>
        <div/>  
        `;
    seleccionarProducto();
}

