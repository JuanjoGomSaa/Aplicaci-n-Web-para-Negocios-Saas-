import {navBar} from './core/route.js';


function main() {
    console.log('Aplicación iniciada');
    const navSidebar = document.querySelector('#nav-sidebar');

    navSidebar.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return; // Si no se hizo clic en un enlace, salir
        navBar(link.dataset.route);
    });
     
   
}

main();