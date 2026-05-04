//Importaciones del Modulo Dashboard
import { renderDashboard} from "../modules/dashboard/dashboard.view.js";

// Importaciones del Modulo de Clientes 
import { renderClientes } from "../modules/clientes/clientes.view.js";
import { setupCRM } from "../modules/clientes/crm/crm.js";
import { renderClientesView } from "../modules/clientes/crm/crmui.js";
import { eliminarCliente } from "../modules/clientes/crm/crm.js";

// import { eliminarCliente } from "../modules/clientes/crm/crm.js";


// Importaciones del Modulo de E-commerce
import { renderECommerce } from "../modules/ecommerce/ecommerce.view.js";

//Importaciones del modulo Reservas
import { renderReservas } from "../modules/reservas/reservasview.js";   

//Notfound
import { renderNotFound } from "../modules/notFound/notFound.view.js";


const router = {
    'dashboard': renderDashboard,
    'clientes':  () => {
                    renderClientes();
                    setupCRM();
                },   
    'ecommerce': renderECommerce,
    'reservas': renderReservas
};

export const routerNavigator = function navBar(link) {
   router[link] ? router[link](): renderNotFound();
}

