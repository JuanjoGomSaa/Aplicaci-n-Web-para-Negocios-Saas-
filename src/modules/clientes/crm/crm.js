import {store} from '../../../core/store.js';
import { renderClientesBuscados, renderClientesView } from './crmui.js';
import { clientesActivos, clientesTotal } from './localstorage.js';

let contador = 0; //persiste entre llamadas
let banderaEditar = false; 
let clienteAEditar = null; // Variable para almacenar el cliente que se va a editar


//Función crear

function handleCrear(e) {
    console.log('handleCrear ejecutado');
    const formCrearCliente = document.getElementById('form-cliente');
  
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
    formCrearCliente.reset();
}

//Funcion Editar

function handleEditar(e) {
    const formCrearCliente = document.getElementById('form-cliente');
    console.log('handleEditar ejecutado');
    e.preventDefault();

    const nombre   = document.getElementById('nombre-cliente').value.trim();
    const email    = document.getElementById('email-cliente').value.trim();
    const cedula = document.getElementById('identificator-cliente').value.trim();
    const telefono = document.getElementById('telefono-cliente').value.trim();
    
    if(!validar()) return;

    if(existeClienteEditado(cedula)) return; 

    store.clientesFiltrados = store.clientesFiltrados.map(c => {
        if(c.id === clienteAEditar.id){
            return{
                ...c,
                name: nombre,
                email: email,
                identificator: cedula,
                phone: telefono,
            };
        }
        return c;
    });

    renderClientesView();

    formCrearCliente.reset();

    banderaEditar = false;
    clienteAEditar = null;

    setupCRM();
}


export function setupCRM() {
    const form = document.getElementById('form-cliente');

    // Primero limpias los dos posibles listeners
    form.removeEventListener('submit', handleCrear);
    form.removeEventListener('submit', handleEditar);

    if (!banderaEditar) {
        console.log('HandleCrear registrado');
        form.addEventListener('submit', handleCrear);
    } else {
        console.log('HandleEditar registrado');
        form.addEventListener('submit', handleEditar);
    }
    
    // Luego registras solo el que toca
    const container = document.getElementById('clientes-list');

    container.removeEventListener('click', handleClickContainer); // remueve el anterior
    container.addEventListener('click', handleClickContainer);    // agrega uno nuevo

    buscarCliente();
}

// Validar los datos del formulario antes de crear o editar un cliente
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

// Aquí se valida si ya existe un cliente con la misma cédula antes de agregarlo a la Store
function existeCliente (cedulaParam) {
    return store.clientesFiltrados.some(c => c.identificator === cedulaParam);
}

function existeClienteEditado (cedulaParam) {
    const clientesNoSeleccionados = store.clientesFiltrados.filter(c => c.id !== clienteAEditar.id);

    console.log('Clientes que no estan seleccionados', clientesNoSeleccionados);
    
    const clienteExiste = clientesNoSeleccionados.some(c => c.identificator === cedulaParam);
    if(clienteExiste){
        alert('El cliente a editar no puede tener cedulas de otros clientes');
    }
    

    return clienteExiste 
}

// Agregar cliente a la Store y actualizar la vista
function addCLiente(cliente) {
    // Agregar clientes a Store
    store.clientes.push(cliente);
    store.clientesFiltrados.push(cliente); // Si quieres mantener una lista filtrada también actualizada
    
    localStorage.setItem("clientesActivos", JSON.stringify(store.clientesFiltrados))
    localStorage.setItem("clientesTotal", JSON.stringify(store.clientes)); 

    //Envio datos al cliente despues de agregarlo a Store
    renderClientesView();
}


// Handle Editar y Eliminar 
function handleClickContainer (e){
    // Eliminar 
    const btnEliminar = e.target.closest('.btn-delete');

    if(btnEliminar){
        const id = btnEliminar.dataset.id;
        store.clientesFiltrados = store.clientesFiltrados.filter(c => c.id !== id);

        renderClientesView();
    }

    //Edición 
    const btnEditar =  e.target.closest('.btn-edit');

    if(btnEditar){
        banderaEditar = true;

        const id = btnEditar.dataset.id;
        clienteAEditar = store.clientesFiltrados.find(c => c.id === id);

        document.getElementById('nombre-cliente').value = clienteAEditar.name;
        document.getElementById('email-cliente').value = clienteAEditar.email;
        document.getElementById('identificator-cliente').value = clienteAEditar.identificator;
        document.getElementById('telefono-cliente').value = clienteAEditar.phone;

        setupCRM();
    }
}

function buscarCliente () {
    const inputBuscarCliente = document.getElementById('buscar-cliente');
    

    inputBuscarCliente.addEventListener('input', (e) => {
        const query = e.target.value;
        store.clientesBuscados = store.clientesFiltrados.filter(c => 
            c.name.toLowerCase().includes(query.toLowerCase())
        );

        if(store.clientesBuscados === 0){
          renderClientesView();
        }else{
            renderClientesBuscados();
        }
        
    });
}