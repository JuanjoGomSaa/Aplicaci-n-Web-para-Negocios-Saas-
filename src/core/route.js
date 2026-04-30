import { renderDashboard} from "../modules/dashboard/dashboardView.js";
import { renderClientes } from "../modules/clientes/clientesView.js";
import { renderECommerce } from "../modules/eCommerce/eCommerceView.js";
import { renderReservas } from "../modules/reservas/reservasView.js";   
import { renderNotFound } from "../modules/notFound/notFoundView.js";

export function navBar(link) {
    switch (link) {
        case 'dashboard':
            renderDashboard();  
            break;
        case 'clientes':
            renderClientes(); 
            break;
        case 'eCommerce':
            renderECommerce();
            break;
        case 'reservas':
            renderReservas();
            break;
        default:
            renderNotFound();
     }
}
