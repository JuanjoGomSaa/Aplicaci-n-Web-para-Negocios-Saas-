import { setupCRM } from './crm/crm.js';
const content = document.getElementById('content');


export function renderClientes() {
    content.innerHTML = `
        <h1>Clientes</h1>
        <p>Lista de tus clientes.</p>
        <form id="form-cliente">
            <input id="nombre-cliente" type="text" placeholder="Nombre del cliente">
            <input id="email-cliente" type="email" placeholder="Email del cliente">
            <input id="identificator-cliente" type="text" placeholder="Cedula del cliente">
            <input id="telefono-cliente" type="tel" placeholder="Teléfono del cliente">
            <button>Crear Cliente</button>
        </form>
        
        <div id="clientes-list"></div>
        
    `;
  
};
 