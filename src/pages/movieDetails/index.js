
export default () => {
    const container = document.createElement('div');

    const template = `
    <div class="movie">
        
    </div> 
    <script>${movieDetails()}</script> 
    `;

    container.innerHTML = template;
    return container;
    
}