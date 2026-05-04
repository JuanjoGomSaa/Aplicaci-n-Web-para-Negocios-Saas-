import {store} from '../../../core/store.js';
import { eliminarCliente } from './crm.js';


export function renderClientesView(cliente) {
    const listCliente = document.getElementById('clientes-list');
    console.log('Renderizando clientes:', cliente);
    listCliente.innerHTML += `
        <div class="cliente-card">
            <h3>${cliente.id}</h3>
            <h3>${cliente.name}</h3>
            <p>Email: ${cliente.email}</p>
            <p>Cédula: ${cliente.identificator}</p>
            <p>Teléfono: ${cliente.phone}</p>
            <p>Creado el: ${cliente.createdAt}</p>
        </div>
        <div class="cliente-actions" id ="bttnContainer">
            <button class="btn-edit">Editar</button>
            <button class="btn-delete" id="btn-eliminar" data-id="${cliente.id}">Eliminar</button>
        </div>
    `;
    eliminarCliente();

}    
