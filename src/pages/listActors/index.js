
export default () => {
    const container = document.createElement('div');

    const template = `
    <div class="wrapper">
        <h3 class="categoria">Popular Actors</h3>
        <div class="carouselActor owl-carousel" id="actorCard">
        
        </div>
    </div>
    <script>${listActors()}</script> 
    `;

    container.innerHTML = template;
    return container;
}


