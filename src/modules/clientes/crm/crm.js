import {store} from '../../../core/store.js';
import { renderClientesView } from './crmui.js';

console.log('CRM Module Loaded');

let contador = 0; //persiste entre llamadas
let bandera = false; 

export function setupCRM() {

    const formCrearCliente = document.getElementById('form-cliente');

    formCrearCliente.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validar()) return; // si algo falla, para aquí
       
        const nombre   = document.getElementById('nombre-cliente').value.trim();
        const email    = document.getElementById('email-cliente').value.trim();
        const cedula = document.getElementById('identificator-cliente').value.trim();
        const telefono = document.getElementById('telefono-cliente').value.trim();

        if (existeCliente(cedula)) {
            alert('Ya existe un cliente con esta cédula');
            return;
        }

            contador++;

            const cliente = {
                id: `CLI-${String(contador).padStart(4, '0')}`,
                name: nombre,
                email: email,
                identificator: cedula,
                phone: telefono,
                createdAt: new Date().toLocaleDateString('es-CO', {
                    day: '2-digit', month: 'long', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                })
            };
            
            addCLiente(cliente);
            

            console.log('Cliente creado:', cliente);
    
    });
}

function validar() {
    const nombre   = document.getElementById('nombre-cliente').value.trim();
    const email    = document.getElementById('email-cliente').value.trim();
    const cedula = document.getElementById('identificator-cliente').value.trim();
    const telefono = document.getElementById('telefono-cliente').value.trim();

    let ok = true;

    if (nombre.length < 2) ok = false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) ok = false;
    if (cedula.length < 7) ok = false;
    const digits = telefono.replace(/\D/g, '');
    if (digits.length < 7) ok = false;

    return ok;
}

function existeCliente (cedulaParam) {
    return store.clientesFiltrados.some(c => c.identificator === cedulaParam);
}

function addCLiente(cliente) {
    // Agregar clientes a Store
    store.clientes.push(cliente);
    store.clientesFiltrados.push(cliente); // Si quieres mantener una lista filtrada también actualizada

    console.log('Clientes en Store:', store.clientes); 
    
    
    //Envio datos al cliente despues de agregarlo a Store
    renderClientesView();
 
}

//Esta funcion recibe los clientes desde la Store y los envía a la vista para renderizarlos
// function enviarClientes(clientes) {
//     // Lógica para enviar clientes a la vista
   
//     clientes.forEach(element => {
//         renderClientesView(element);
//     });
// }

export function eliminarCliente() {
    //Lógica para eliminar cliente de la Store y actualizar la vista
    console.log('Eliminando cliente...');
    const container = document.getElementById('clientes-list');


    container.addEventListener('click', (e) => {
    
           const btnEliminar = e.target.closest('.btn-delete');
            if (!btnEliminar) return; // Si no se hizo clic en un botón de eliminar, salir

            const id = btnEliminar.dataset.id;
            console.log(id);

            store.clientesFiltrados.forEach(cliente => {
                console.log(cliente);
                const newStore = store.clientes.filter(cliente => cliente.id !== id);
                store.clientesFiltrados = newStore; // Actualizar la lista filtrada también
                console.log('Clientes después de eliminar:', newStore);
                renderClientesView(); // Volver a renderizar la vista con la lista actualizada
            });

    }); 


}