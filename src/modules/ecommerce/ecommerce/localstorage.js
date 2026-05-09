import { store } from '../../../core/store.js';

// Al cargar la página, leer lo que ya había guardado
const productosGuardados      = JSON.parse(localStorage.getItem("productosActivos")) ?? [];
const productosTotalGuardados = JSON.parse(localStorage.getItem("productosTotal"))   ?? [];

// Inicializar la store con los datos persistidos
store.productosFiltrados = productosGuardados;
store.productos          = productosTotalGuardados;

localStorage.setItem("productosActivos", JSON.stringify(store.productosFiltrados));
localStorage.setItem("productosTotal",   JSON.stringify(store.productos));

export { productosGuardados as productosActivos, productosTotalGuardados as productosTotal };