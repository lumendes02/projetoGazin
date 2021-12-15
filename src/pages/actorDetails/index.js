export default () => {
    const container = document.createElement('div');

    const template = `
    <div class="actor">
        
    </div> 

    <div class="wrapper">
        <h3 class="categoria">Filmografia</h3>
        <div class="carouselMovie owl-carousel" id="filmsActor">
        
        </div>
    </div>
    <script>${actorDetails()}</script> 
    `;

    container.innerHTML = template;
    return container;
    
}