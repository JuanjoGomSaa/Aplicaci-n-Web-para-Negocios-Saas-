import {store } from '../../../core/store.js'

// 1. Al cargar la página, leer lo que ya había guardado
const clientesGuardados = JSON.parse(localStorage.getItem("clientesActivos")) ?? [];
const clientesTotalGuardados = JSON.parse(localStorage.getItem("clientesTotal")) ?? [];




//Inicializar la store con los dataos persistidos
store.clientesFiltrados = clientesGuardados;
store.clientes = clientesTotalGuardados;

localStorage.setItem("clientesActivos", JSON.stringify(store.clientesFiltrados));
localStorage.setItem("clientesTotal", JSON.stringify(store.clientes)); 


export { clientesGuardados as clientesActivos, clientesTotalGuardados as clientesTotal };