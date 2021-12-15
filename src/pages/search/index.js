
export default () => {
    const container = document.createElement('div');

    const template = `
    <div class="wrapper">
        <h3 class="categoria">Filmes</h3>
        <div class="carouselMovie owl-carousel" id="filmsSearch">
        
        </div>
    </div>
    <script>${searchFilm()}</script> 
    `;

    container.innerHTML = template;
    return container;
    
}