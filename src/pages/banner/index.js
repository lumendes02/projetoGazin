
export default () => {
    const container = document.createElement('div');

    const template = `
    <div class="carousel slide" data-bs-ride="carousel" id="bannerCarousel">
    <div class="carousel-inner" id="banner">
        
    </div>


    <button class="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div> 
    <script>${banner()}</script> 
    `;

    container.innerHTML = template;
    return container;
    
}