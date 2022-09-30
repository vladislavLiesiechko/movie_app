import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import {getHistory} from './app-history';
import {getMovies} from "./localstorage";

import Menu from "./HeaderMenu";
import Welcome from "./Welcome";
import Card from "./Card/Card";
import Main from "./Main";
import Footer from "./Footer";
import Movie from "./Movie";
import NotFound from "./NotFound";

getMovies();

const container = document.createElement('div');

const classesToAdd = ["container", "d-flex", "flex-column", "shadow-sm", "bg-white"];
container.classList.add(...classesToAdd);
document.body.classList.add('bg-light');
document.body.appendChild(container);
const menu = new Menu({ newMovieConfirmed: rewriteMovies });
container.appendChild(menu.render());
const main = new Main().render();
const welcome = new Welcome();
container.appendChild(main);
const footer = new Footer();
container.appendChild(footer.render());

const notFound = new NotFound();

const history = getHistory();

function renderRoute(path) {
    const movies = getMovies();
    let movieFound = false;

    if (path === "/") {
        main.innerHTML = "";
        main.appendChild(welcome.render());
    } else if (path === "/list") {
        main.innerHTML = "";
        const listMovies = movies.map(movie => new Card({
            movie: movie,
            movieEdited: rewriteMovies
        }));
        listMovies.forEach( movie =>  main.appendChild(movie.render()))
    } else if (path.startsWith("/list-")) {
        const id = path.substr("/list-".length);
        const currentMovie = movies.find(movie => movie.id === id)
        if (currentMovie) {
            main.innerHTML = "";
            const movie = new Movie(currentMovie);
            main.appendChild(movie.render())
        } else {
            main.innerHTML = "";
            main.appendChild(notFound.render());
        }
    } else if (path === "/search-") {
        main.innerHTML = "";
        const searchInput = document.querySelector("input[name=query]");
        console.log(movies)
        movies.forEach(movie => {
            if ((movie.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) + 1)) {

                const currentMovie = new Card({
                    movie: movie,
                    movieEdited: rewriteMovies
                });
                main.appendChild(currentMovie.render())
                movieFound = true;

            }

        });
        if (!movieFound) {
            main.innerHTML = "";
            const notFoundFilms = document.createElement("div");
            notFoundFilms.innerText = "Нет совпадений";
            main.appendChild(notFoundFilms);
        }
    } else {
        main.innerHTML = "";
        main.appendChild(notFound.render());
    }
}
history.listen(listener => {
    renderRoute(listener.location.pathname);
});
renderRoute(history.location.pathname);


function rewriteMovies() {
    main.innerHTML = "";
    const movies = getMovies();
    const listMovies = movies.map(movie => new Card({
        movie: movie,
        movieEdited: rewriteMovies
    }));
    listMovies.forEach( movie =>  main.appendChild(movie.render()));
}
