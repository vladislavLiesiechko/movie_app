import html from './index.html'
import renderTemplate from '../template';
import {getHistory} from "../app-history";
import AddNew from "../AddNew";

const history = getHistory()

export default class Menu {
    constructor(props) {
        this.menu = renderTemplate(html);
        this.newMovieConfirmed = props.newMovieConfirmed;
    }

    addNewFilm = (event) => {
        event.preventDefault();

        const newMovie = new AddNew({ newMovieConfirmed: this.newMovieConfirmed});
        newMovie.render();
    }
    searchFilms = (event) => {
        event.preventDefault();
        const searchInput = this.menu.querySelector("input[name=query]");
        history.push({pathname: "search-", search: `?query=${searchInput.value}`});
        searchInput.value = "";
    }

    showAllFilms(event) {
        event.preventDefault();
        history.push({pathname: event.target.href, search: ""});
    }

    render() {
        const allFilms = this.menu.querySelector('#allFilms');
        allFilms.addEventListener('click', this.showAllFilms);

        const addNew = this.menu.querySelector('#add-new');
        addNew.addEventListener('click', this.addNewFilm)

        const searchFilmForm = this.menu.querySelector("#search");
        searchFilmForm.addEventListener("submit", this.searchFilms)


        return this.menu;
    }
}