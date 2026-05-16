import {seleccionarProducto} from './seleccionarProducto.js';
import { store } from '../../../core/store.js';
import { carritoTotal } from './seleccionarProducto.js';

// misProductos.view.js
export function renderCrearPedido() {
    // Reset al montar la vista
    store.carrito = [];
    carritoTotal();

    const content = document.getElementById("content");
    content.innerHTML = `    
    <div class="crearPedido"> 
        <section class="products-section">

        <h2>Productos Disponibles</h2>
        <div id="products-list" class="products-list"></div>
        </section>

        <section class="cart-section">
            <h2>Tu Carrito</h2>
            <div id = "contenedor-estable">
                <div id="cart-list" class="cart-list">
                    <p class="empty-cart">El carrito está vacío.</p>
                </div>
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

                <button id="applyDiscountBtn">Crear Pedido</button>
            </div>
        </section>
    <div/>  
    `;


    seleccionarProducto();
}

