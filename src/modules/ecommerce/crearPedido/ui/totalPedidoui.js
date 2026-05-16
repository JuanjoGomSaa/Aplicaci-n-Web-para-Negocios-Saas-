// import { store } from "../../../../core/store.js";

export function renderTotalPedido(totalPedido){
    const total = document.querySelector('#totalDisplay');
    total.textContent = totalPedido;
 }