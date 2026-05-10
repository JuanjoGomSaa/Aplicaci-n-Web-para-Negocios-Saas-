import { productosActivos } from "./localstorage.js";

const formSeleccionarProducto = document.getElementById('form-pedido');
const opcionProducto = document.querySelector('#productos');


console.log(productosActivos);
console.log(opcionProducto)

export function seleccionarProducto (){
    productosActivos.forEach(element => {
    const opcion =document.createElement = ('option');
    
    opcion.value = element.name; 
    opcion.textContent = element.nombre;

    opcionProducto.appendChild('opcion');
});


}

