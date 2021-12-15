//----------------------------------------------BANNER
function banner() {
    fetch("https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=PT", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
        }
    })
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 2; i++) {
                setTimeout(function (y) {
                    var titulos = data[i].replace(/[/]/g, "");
                    titulos = titulos.replace('title', "");
                    titulosFilmes(titulos, i);
                    console.log("titulo do filme: " + titulos + "localica" + i);
                }, i * 1000, i);
            }
        });

    const imagemFilme = (id, location) => {
        fetch("https://imdb8.p.rapidapi.com/title/get-images?tconst=" + id + "&limit=1", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
            }
        })
            .then(res => res.json())
            .then(data => {
                //classe de imagem do banner - esta dentro do banner
                var imgBanner = `
                <div class="overlay-image" 
                    style="background-image: url(${data.images[0].url});">
                </div>
            `
                document.querySelector('.imgBanner' + location).innerHTML += imgBanner;
                console.log("image filme" + data.images[0].url);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const titulosFilmes = (id, location) => {
        fetch("https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=" + id,
            {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "imdb8.p.rapidapi.com",
                    "x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
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
                    for (let i = 0; i < 1; i++) {
                        setTimeout(function (y) {
                            var idfilme = id;
                            var bannerConteudoActive = `
                            <div class="carousel-item active">
                                <div class="imgBanner${location}">
                                
                                </div>

                                <div class="carousel-caption d-none d-md-block">
                                    <div class="notaBanner">
                                        <h5><img src="./css/img/starlogo.png" id="star">${nota}<img src="./css/img/logoimdb.png" id="logo"></h5>
                                    </div>
                                    <div class="tituloBanner">
                                        <h5>${data.title.title}</h5>
                                    </div>
                                    <div class="descricaoBanner">
                                        <p>
                                            ${data.plotOutline.text}
                                        </p>
                                        <button class="onClickButton" onclick="movieClicked('${id}')">Detalhes</button>
                                    </div>
                                
                                </div>
                            </div>
                `;
                            document.querySelector('#banner').innerHTML += bannerConteudoActive;
                            imagemFilme(id, location);
                            console.log("id filme " + id)
                        }, i * 800, i);
                    }
                } else {
                    for (let i = 0; i < 1; i++) {
                        setTimeout(function (y) {
                            var bannerConteudo = `
                            <div class="carousel-item">
                                <div class="imgBanner${location}">
                                    
                                </div>
                                <div class="carousel-caption d-none d-md-block">
                                    <div class="notaBanner">
                                        <h5><img src="./css/img/starlogo.png" id="star">${nota}<img src="./css/img/logoimdb.png" id="logo"></h5>
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
                            console.log("id filme" + id)
                        }, i * 800, i);
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
}


//--------------------------------------------------- Categorias dos filmes 
function listFilms() {
    fetch("https://imdb8.p.rapidapi.com/title/list-popular-genres", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
        }
    })
        .then(res => res.json())
        .then(data => {
            var lista = [];
            for (let i = 0; i < 2; i++) {
                var numero = data.genres[Math.floor(Math.random() * data.genres.length)];
                lista.push(numero);
            }
            lista = lista.filter(function (ele, pos) {
                return lista.indexOf(ele) == pos;
            })
            categoria(lista);

        })
        .catch(err => {
            console.error(err);
        });

    const categoria = (data) => {
        for (let i = 0; i < data.length; i++) {
            setTimeout(function (y) {
                categoriaList = `
                <div class="wrapper">
                    <h3 class="categoria">${data[i].description}</h3>
                    <div class="carouselMovie owl-carousel" id="cardFilme${data[i].description.toLowerCase()}">
                    
                    </div>
                </div>
        `;
                document.querySelector('#root').innerHTML += categoriaList;
                filmesCategoria(data[i].endpoint);

            }, i * 700, i);
        }
    }

    const filmesCategoria = (data) => {
        var id = data.replace('/chart/popular/genre/', "");
        fetch("https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2F" + id, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
            }
        })
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < 4; i++) {
                    setTimeout(function (y) {
                        var titulos = data[i].replace(/[/]/g, "");
                        titulos = titulos.replace('title', "");
                        id = id.replace(/[_]/g, "");
                        filme(titulos, id);

                    }, i * 1000, i);
                }
            })
            .catch(err => {
                console.error(err);
            });

    }

    const filme = (id, genero) => {
        fetch("https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=" + id, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
            }
        })
            .then(res => res.json())
            .then(data => {
                filmeList = `
                <div class="poster">
                    <div class="image-poster">
                        <img src="${data.title.image.url}" style="height: 481px;">
                    </div>
                    <div class="info">
                        <div class="titulo">
                            <h5>${data.title.title}</h5>
                        </div>
                        <div class="ano">
                            <p>${data.title.year}</p>
                            <div class="filmButton">
                                <button class="onClickButton filmB" onclick="movieClicked('${id}')">Detalhes</button>
                            </div>
                        </div>
                    </div>
                </div>
        `;
                document.querySelector('#cardFilme' + genero).innerHTML += filmeList;

            })
            .catch(err => {
                console.error(err);
            });
    }
}

//--------------------------------------------------------------- Lista de Atores
function listActors() {
    fetch("https://imdb8.p.rapidapi.com/actors/list-most-popular-celebs", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
        }
    })
        .then(res => res.json())
        .then(data => {
            var lista = [];
            for (let i = 0; i < 6; i++) {
                var numero = data[Math.floor(Math.random() * data.length)];
                lista.push(numero);
            }
            lista = lista.filter(function (ele, pos) {
                return lista.indexOf(ele) == pos;
            })
            filtroAtores(lista);

        })
        .catch(err => {
            console.error(err);
        });

    const filtroAtores = (data) => {
        for (let i = 0; i < data.length; i++) {
            setTimeout(function (y) {
                var id = data[i].replace(/[/]/g, "");
                id = id.replace('name', "");
                ator(id);

            }, i * 1000, i);
        }
    }

    const ator = (id) => {
        fetch("https://imdb8.p.rapidapi.com/actors/get-bio?nconst=" + id, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
            }
        })
            .then(res => res.json())
            .then(data => {
                atoresCard = `
                    <div class="actorPoster">
                    <div class="image-poster actorImage" >
                        <img src="${data.image.url}" alt="">
                    </div>
                    <div class="info" style="text-align: center;">
                        <div class="titulo" >
                            <h5>${data.name}</h5>
                            <button class="onClickButton" onclick="actorClicked('${id}')">Detalhes</button>
                        </div>
                    </div>
                    </div>
                `;
                document.querySelector('#actorCard').innerHTML += atoresCard;
            })
            .catch(err => {
                console.error(err);
            });
    }
}






// --------------------------------------------------filme
function movieClicked(id) {
    sessionStorage.setItem('idFilme', id);
    window.location.hash = '#movie'
    console.log(sessionStorage.getItem('idFilme'));
}

function movieDetails() {
    let id = sessionStorage.getItem('idFilme');
    fetch("https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=" + id, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
        }
    })
        .then(res => res.json())
        .then(data => {
            movie = `
        <div class="header" style="background: url(${data.title.image.url});">
            <div class="opa">
                <img src="${data.title.image.url}">
            </div>
        </div>  
        <div class="infoDetails">
            <div class="title">
                <h1>${data.title.title}</h1>
                <h5>${data.title.year}</h5>
            </div>
        <div class="desc">
            <p>${data.plotOutline.text}</p>
        </div>
        </div>
        `;
        document.querySelector('.movie').innerHTML += movie;
        })
        .catch(err => {
            console.error(err);
        });
}

// --------------------------------------------------------------------SEARCH
function setFilm(filmName) {
    sessionStorage.setItem('filmName', filmName);
    window.location.hash = '#search'
}

function searchFilm() {
    let filmName = sessionStorage.getItem('filmName');
    filmName = filmName.replace(" ", "%20");
    fetch("https://imdb8.p.rapidapi.com/auto-complete?q=" + filmName, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
	}
})
.then(res => res.json())
.then(data => {
    for (let i = 0; i < 3; i++) {
        var idFilme = data.d[i].id;
        filmsSearch = `
        <div class="poster">
            <div class="image-poster">
                <img src="${data.d[i].i.imageUrl}" style="height: 481px;">
            </div>
            <div class="info">
                <div class="titulo">
                    <h5>${data.d[i].l}</h5>
                </div>
                <div class="ano">
                    <p>${data.d[i].yr}</p>
                    <div class="filmButton">
                        <button class="onClickButton filmB" onclick="movieClicked('${idFilme}')">Detalhes</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.querySelector('#filmsSearch').innerHTML += filmsSearch;
    }
})
.catch(err => {
	console.error(err);
});
}

// -------------------------------------------------------------------Ator
function actorClicked(id) {
    sessionStorage.setItem('idActor', id);
    window.location.hash = '#actor'
}

function actorDetails() {
    let id = sessionStorage.getItem('idActor');
    fetch("https://imdb8.p.rapidapi.com/actors/get-bio?nconst=" + id, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
	}
})
.then(res => res.json())
.then(data => {
    var idade = data.birthDate;
    idade = idade.substring(0, 4);
    anoAtual = new Date().getFullYear();
    idade = anoAtual - idade;
    actor = `
        <div class="headerActor">
            <div class="opaActor">
                <img style="max-height: 400px;" src="${data.image.url}">
            </div>
        </div>  
        <div class="infoDetails">
            <div class="title">
                <h1 style="color: #FFB800;">${data.name}</h1>
                <h5>${idade}</h5>
                <h5>${data.birthPlace}</h5>
            </div>
        <div class="desc">
            <h2>Biography</h2>
            <p>${data.miniBios[0].text}</p>
        </div>
        </div>
        `;
        document.querySelector('.actor').innerHTML += actor;
        filmsActor(id);
})
.catch(err => {
	console.error(err);
});

    const filmsActor = (id) =>{
        fetch("https://imdb8.p.rapidapi.com/actors/get-known-for?nconst=" + id, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "3fd77e12a1msh7144d1d6e7ad95cp1fa391jsn6d939ef21be4"
	}
})
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < 3; i++) {
            var idFilme = data[i].title.id.replace(/[/]/g, "");
            idFilme = idFilme.replace('title', "");
            filmActor = `
            <div class="poster">
                <div class="image-poster">
                    <img src="${data[i].title.image.url}" style="height: 481px;">
                </div>
                <div class="info">
                    <div class="titulo">
                        <h5>${data[i].title.title}</h5>
                    </div>
                    <div class="ano">
                        <p>${data[i].title.year}</p>
                        <div class="filmButton">
                            <button class="onClickButton filmB" onclick="movieClicked('${idFilme}')">Detalhes</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            document.querySelector('#filmsActor').innerHTML += filmActor;
        }
    })
    .catch(err => {
        console.error(err);
    });
    }
}