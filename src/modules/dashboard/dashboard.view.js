const content = document.getElementById('content');

export function renderDashboard() {
    content.innerHTML = `
        <h1>Dashboard</h1>
        <p>Bienvenido al dashboard de tu aplicación SaaS. Aquí podrás ver un resumen de tus métricas.</p>
    `;
}


