import {store } from '../../../core/store.js'

// 1. Al cargar la página, leer lo que ya había guardado
export let clientesActivos = JSON.parse(
  localStorage.getItem("clientesActivos")
) ?? [];

export let clientesTotal = JSON.parse(
  localStorage.getItem("clientesTotal")
) ?? [];

localStorage.setItem("clientesActivos", JSON.stringify(store.clientesFiltrados));
localStorage.setItem("clientesTotal", JSON.stringify(store.clientes)); 


//Mandar al render 
// renderClientesView(JSON.parse(localStorage.getItem("clientesActivos")));



