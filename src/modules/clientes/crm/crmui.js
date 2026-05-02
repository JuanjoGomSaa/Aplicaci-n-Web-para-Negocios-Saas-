import {store} from '../../../core/store.js';



export function renderClientesView(clientes) {
    const listCliente = document.getElementById('clientes-list');
    console.log('Renderizando clientes:', clientes);
    listCliente.innerHTML += `
        <div class="cliente-card">
            <h3>${clientes.id}</h3>
            <h3>${clientes.name}</h3>
            <p>Email: ${clientes.email}</p>
            <p>Cédula: ${clientes.identificator}</p>
            <p>Teléfono: ${clientes.phone}</p>
            <p>Creado el: ${clientes.createdAt}</p>
        </div>
        <div class="cliente-actions">
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">Eliminar</button>
        </div>
    `;
}