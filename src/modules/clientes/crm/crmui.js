import { store } from '../../../core/store.js';


console.log('Clientes en Store al cargar la vista:', store.clientesFiltrados);

export function renderClientesView() {
    const listCliente = document.getElementById('clientes-list');
    
    let html = '';

    store.clientesFiltrados.forEach(cliente => {
        console.log('Renderizando clientes:', cliente);
        html += `
            <div class="cliente-card">
                <h3>${cliente.id}</h3>
                <h3>${cliente.name}</h3>
                <p>Email: ${cliente.email}</p>
                <p>Cédula: ${cliente.identificator}</p>
                <p>Teléfono: ${cliente.phone}</p>
                <p>Creado el: ${cliente.createdAt}</p>

                <div class="cliente-actions">
                    <button class="btn-edit" data-id="${cliente.id}">Editar</button>
                    <button class="btn-delete" data-id="${cliente.id}">Eliminar</button>
                </div>
            </div>
        `;   
    });

    listCliente.innerHTML = html;
}    

export function renderClientesBuscados (){
    const listCliente = document.getElementById('clientes-list');
    
    let html = '';

    store.clientesBuscados.forEach(cliente =>{
            html += `
                <div class="cliente-card">
                    <h3>${cliente.id}</h3>
                    <h3>${cliente.name}</h3>
                    <p>Email: ${cliente.email}</p>
                    <p>Cédula: ${cliente.identificator}</p>
                    <p>Teléfono: ${cliente.phone}</p>
                    <p>Creado el: ${cliente.createdAt}</p>

                    <div class="cliente-actions">
                        <button class="btn-edit" data-id="${cliente.id}">Editar</button>
                        <button class="btn-delete" data-id="${cliente.id}">Eliminar</button>
                    </div>
                </div>
            `;
    }); 
    
    listCliente.innerHTML = html; 
}
