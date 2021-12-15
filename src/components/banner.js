fetch("https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=PT", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "042ed9d7f2mshb8cb725af5f6e76p1aac8cjsnab9dcc65c341"
        }
    })
        .then(res => res.json())
        .then(data => {
    
            for (let i = 0; i < 3; i++) {
                var titulos = data[i].replace(/[/]/g, "");
                titulos = titulos.replace('title', "");
                titulosFilmes(titulos, i);
                //imagemFilme(titulos);
            }
    
        });    
        const titulosFilmes = (id, location) => {
            fetch("https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=" + id,
                {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key": "042ed9d7f2mshb8cb725af5f6e76p1aac8cjsnab9dcc65c341"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    //classe do banner - esta dentro do carrosel
                    if (!data.ratings.rating) {
                        var nota = "--/10"
                    } else {
                        var nota = data.ratings.rating + "/10"
                    }
        
                    if (location == 1) {
                        var bannerConteudoActive = `
                            <div class="carousel-item active">
                                <div class="imgBanner${location}">
                                
                                </div>
        
                                <div class="carousel-caption d-none d-md-block">
                                    <div class="notaBanner">
                                        <h5><img src="./img/starlogo.png" id="star">${nota}<img src="./img/logoimdb.png" id="logo"></h5>
                                    </div>
                                    <div class="tituloBanner">
                                        <h5>${data.title.title}</h5>
                                    </div>
                                    <div class="descricaoBanner">
                                        <p>
                                            ${data.plotOutline.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `;
                        document.querySelector('#banner').innerHTML += bannerConteudoActive;
                       //imagemFilme(id, location);
                    } else {
                        var bannerConteudo = `
                            <div class="carousel-item">
                                <div class="imgBanner${location}">
                                    
                                </div>
                                <div class="carousel-caption d-none d-md-block">
                                    <div class="notaBanner">
                                        <h5><img src="./img/starlogo.png" id="star">${nota}<img src="./img/logoimdb.png" id="logo"></h5>
                                    </div>
                                    <div class="tituloBanner">
                                        <h5>${data.title.title}</h5>
                                    </div>
                                    <div class="descricaoBanner">
                                        <p>
                                            ${data.plotOutline.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `;
                        document.querySelector('#banner').innerHTML += bannerConteudo;
                        imagemFilme(id, location);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }