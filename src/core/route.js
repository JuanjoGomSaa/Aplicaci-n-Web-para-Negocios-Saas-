import { renderDashboard} from "../modules/dashboard/dashboard.view.js";
import { renderClientes } from "../modules/clientes/clientes.view.js";
import { renderECommerce } from "../modules/ecommerce/ecommerce.view.js";
import { renderReservas } from "../modules/reservas/reservasview.js";   
import { renderNotFound } from "../modules/notFound/notFound.view.js";


const router = {
    'dashboard': renderDashboard,
    'clientes': renderClientes,
    'ecommerce': renderECommerce,
    'reservas': renderReservas
};

export const routerNavigator = function navBar(link) {
   router[link] ? router[link](): renderNotFound();
}

