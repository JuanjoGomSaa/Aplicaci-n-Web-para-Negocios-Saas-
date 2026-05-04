import {routerNavigator} from './core/route.js';


function main() { 
    console.log('Aplicación iniciada');
    const navSidebar = document.querySelector('#nav-sidebar');

    window.addEventListener('hashchange', () => { 
        routerNavigator(window.location.hash.replace('#', '')); // Navegar a la ruta correspondiente
    });

    window.location.hash = 'dashboard';
    routerNavigator('dashboard'); // Renderizar dashboard manualmente

    navSidebar.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        if (!link) return; // Si no se hizo clic en un enlace, salir

        window.location.hash = link.dataset.route; // Actualizar el hash en la URL
    });

}

main();