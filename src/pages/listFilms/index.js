
export default () => {
    const container = document.createElement('div');

    const template = `
    <script>${listFilms()}</script> 
    `;

    container.innerHTML = template;
    return container;
    
}