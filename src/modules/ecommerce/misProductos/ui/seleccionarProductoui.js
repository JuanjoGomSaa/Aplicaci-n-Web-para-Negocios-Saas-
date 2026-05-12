import { store } from "../../../../core/store.js";



export function  renderSeleccionarProducto(producto) {
    const contenedorProductos = document.getElementById('crear-pedido-content');
           contenedorProductos.innerHTML +=  `
            <div class="pedido-card" data-id="${producto.id}">
                <h3>${producto.nombre}</h3>
                <h3>${producto.precio}</h3>
            </div>
            <button class="agregarProducto" data-id="${producto.id}">Agregar Producto</button>
        `;
    
};

export function limpiarRenderSeleccionarProducto() {
    const contenedorProductos = document.getElementById('crear-pedido-content');
    contenedorProductos.innerHTML ='';
}
