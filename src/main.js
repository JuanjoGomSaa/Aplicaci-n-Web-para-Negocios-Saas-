import { routerNavigator } from './core/route.js';

function toggleEcommerce() {
    const ecommerceItem = document.querySelector('.has-submenu');
    ecommerceItem.classList.toggle('open');
}

function closeEcommerce() {
    const ecommerceItem = document.querySelector('.has-submenu');
    ecommerceItem.classList.remove('open');
}

// Rutas que pertenecen al submenú de ecommerce
const ecommerceRoutes = ['mis-productos', 'crear-pedido', 'lista-pedidos'];

function main() { 
    console.log('Aplicación iniciada');
    const navSidebar = document.querySelector('#nav-sidebar');

    // Escucha cambios en el hash — pero ignora el toggle de ecommerce
    window.addEventListener('hashchange', () => { 
        const route = window.location.hash.replace('#', '');

        if (route === 'ecommerce') return; // No renderiza nada, solo es un toggle

        routerNavigator(route);
    });

    // Carga inicial
    window.location.hash = 'dashboard';
    routerNavigator('dashboard');

    // Clics en el sidebar
    navSidebar.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const route = link.dataset.route;

        if (route === 'ecommerce') {
            toggleEcommerce();
            return; // No actualiza el hash ni navega
        }

        // Si navega a una sección principal, cierra el submenú
        if (!ecommerceRoutes.includes(route)) {
            closeEcommerce();
        }

        window.location.hash = route;
    });
}

main();