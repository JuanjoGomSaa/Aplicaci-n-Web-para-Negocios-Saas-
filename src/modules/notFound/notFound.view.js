const content = document.getElementById('content');
export function renderNotFound() {
    content.innerHTML = `
        <h1>Página no encontrada</h1>
        <p>La página que buscas no existe.</p>
    `;
}