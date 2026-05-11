import { store } from '../../../core/store.js';
import { productosActivos, productosTotal } from './localstorage.js';
import { renderProductosBuscados, renderProductosView } from './ui/productosui.js';
import { renderPedidosView } from './ui/pedidosui.js';
import { limpiarRenderSeleccionarProducto, renderSeleccionarProducto } from './ui/seleccionarProductoui.js';

let contador      = 0;
let banderaEditar = false;
let productoAEditar = null;

contador = store.productos.length;

// ── Crear ──────────────────────────────────────────────────────────────────

function handleCrear(e) {
    console.log('handleCrear ejecutado');
    const form = document.getElementById('form-producto');

    e.preventDefault();
    if (!validar()) return;

    const nombre = document.getElementById('nombre-producto').value.trim();
    const precio = parseFloat(document.getElementById('precio-producto').value);
    const stock  = parseInt(document.getElementById('stock-producto').value, 10);

    if (existeProducto(nombre)) {
        alert('Ya existe un producto con ese nombre');
        return;
    }

    contador++;
    const producto = {
        id:        `PROD-${String(contador).padStart(4, '0')}`,
        nombre,
        precio,
        stock,
        createdAt: new Date().toLocaleDateString('es-CO', {
            day: '2-digit', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    };

    addProducto(producto);
    form.reset();

  
}

// ── Editar ─────────────────────────────────────────────────────────────────

function handleEditar(e) {
    const form = document.getElementById('form-producto');
    console.log('handleEditar ejecutado');
    e.preventDefault();

    const nombre = document.getElementById('nombre-producto').value.trim();
    const precio = parseFloat(document.getElementById('precio-producto').value);
    const stock  = parseInt(document.getElementById('stock-producto').value, 10);

    if (!validar()) return;
    if (existeProductoEditado(nombre)) return;

    store.productosFiltrados = store.productosFiltrados.map(p => {
        if (p.id === productoAEditar.id) {
            return { ...p, nombre, precio, stock };
        }
        return p;
    });

    localStorage.setItem("productosActivos", JSON.stringify(store.productosFiltrados));

    renderProductosView();
    form.reset();

    banderaEditar   = false;
    productoAEditar = null;

    setupProductos();
}

// ── Setup principal ────────────────────────────────────────────────────────

export function setupProductos() {
    const form = document.getElementById('form-producto');

    form.removeEventListener('submit', handleCrear);
    form.removeEventListener('submit', handleEditar);

    if (!banderaEditar) {
        console.log('HandleCrear registrado');
        form.addEventListener('submit', handleCrear);
    } else {
        console.log('HandleEditar registrado');
        form.addEventListener('submit', handleEditar);
    }

    const container = document.getElementById('productos-list');
    container.removeEventListener('click', handleClickContainer);
    container.addEventListener('click', handleClickContainer);

    renderProductosView();
    buscarProducto();

    seleccionarProducto();
}

// ── Validación ─────────────────────────────────────────────────────────────

function validar() {
    const nombre = document.getElementById('nombre-producto').value.trim();
    const precio = document.getElementById('precio-producto').value;
    const stock  = document.getElementById('stock-producto').value;

    let ok = true;

    if (nombre.length < 2)          ok = false;
    if (!precio || Number(precio) < 0) ok = false;
    if (!stock  || Number(stock)  < 0) ok = false;

    return ok;
}

function existeProducto(nombreParam) {
    return store.productosFiltrados.some(
        p => p.nombre.toLowerCase() === nombreParam.toLowerCase()
    );
}

function existeProductoEditado(nombreParam) {
    const otros = store.productosFiltrados.filter(p => p.id !== productoAEditar.id);
    const existe = otros.some(
        p => p.nombre.toLowerCase() === nombreParam.toLowerCase()
    );
    if (existe) alert('Ya existe otro producto con ese nombre');
    return existe;
}

// ── Agregar a Store ────────────────────────────────────────────────────────

function addProducto(producto) {
    store.productos.push(producto);
    store.productosFiltrados.push(producto);

    localStorage.setItem("productosActivos", JSON.stringify(store.productosFiltrados));
    localStorage.setItem("productosTotal",   JSON.stringify(store.productos));

    renderProductosView();
    seleccionarProducto();

}

// ── Click delegado (Editar / Eliminar) ────────────────────────────────────

function handleClickContainer(e) {
    // Eliminar
    const btnEliminar = e.target.closest('.btn-delete');
    if (btnEliminar) {
        const id = btnEliminar.dataset.id;
        store.productosFiltrados = store.productosFiltrados.filter(p => p.id !== id);
        localStorage.setItem("productosActivos", JSON.stringify(store.productosFiltrados));
        renderProductosView();
    }

    // Editar
    const btnEditar = e.target.closest('.btn-edit');
    if (btnEditar) {
        banderaEditar   = true;
        const id        = btnEditar.dataset.id;
        productoAEditar = store.productosFiltrados.find(p => p.id === id);

        document.getElementById('nombre-producto').value = productoAEditar.nombre;
        document.getElementById('precio-producto').value = productoAEditar.precio;
        document.getElementById('stock-producto').value  = productoAEditar.stock;

        setupProductos();
    }
}

// ── Búsqueda ───────────────────────────────────────────────────────────────

function buscarProducto() {
    const input = document.getElementById('buscar-producto');

    input.addEventListener('input', (e) => {
        const query = e.target.value;
        store.productosBuscados = store.productosFiltrados.filter(p =>
            p.nombre.toLowerCase().includes(query.toLowerCase())
        );

        if (store.productosBuscados.length === 0) {
            renderProductosView();
        } else {
            renderProductosBuscados();
        }
    });
}

//Seleccionar Productos 
function seleccionarProducto(){
    limpiarRenderSeleccionarProducto();
    store.productosFiltrados.forEach(element => {
        renderSeleccionarProducto(element);
    });
}

