import banner from "./pages/banner/index.js";
import listFilms from "./pages/listFilms/index.js";
import listActors from "./pages/listActors/index.js";
import search from "./pages/search/index.js";

import movie from "./pages/movieDetails/index.js";
import actor from "./pages/actorDetails/index.js";

const main = document.querySelector("#root");
const footerActors = document.querySelector("#footer-actors");

const init = () =>{
    window.addEventListener("hashchange", () => {
        main.innerHTML ="";
        footerActors.innerHTML="";
        switch(window.location.hash) {
            case "":
                main.appendChild(banner());
                main.appendChild(listFilms());
                footerActors.appendChild(listActors());
                break;
            case "#movie":
                main.appendChild(movie());
                break;
            case "#actor":
                main.appendChild(actor());
                break;
            case "#search":
                main.appendChild(search());
                break;
            default:
                main.appendChild(banner());
                main.appendChild(listFilms());
                footerActors.appendChild(listActors());
        }
    })
}

window.addEventListener("load", () => {
    main.appendChild(banner());
    main.appendChild(listFilms());
    footerActors.appendChild(listActors());
    init();
})