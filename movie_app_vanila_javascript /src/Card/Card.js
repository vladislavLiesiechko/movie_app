import html from './index.html'
import renderTemplate from '../template';
import AddNew from "../AddNew";
import {getHistory} from "../app-history";
import {setFilmsToLocalStorage, getMovies} from "../localstorage";

const history = getHistory()
export default class Card {
    constructor(props) {
        this.id = props.movie.id;
        this.titleOriginal = props.movie.titleOriginal || "";
        this.year = props.movie.year;
        this.operator = props.movie.operator || "";
        this.country = props.movie.country || "";
        this.slogan = props.movie.slogan || "";
        this.director = props.movie.director || "";
        this.producer = props.movie.producer || "";
        this.roles = props.movie.roles || "";
        this.composer = props.movie.composer || "";
        this.title = props.movie.title || "";
        this.text = props.movie.text || "";
        this.rating = props.movie.rating || "";
        this.scenario = props.movie.scenario || "";
        this.image = props.movie.image || "";
        this.isLiked = props.isLiked || "";
        this.like = props.like || "";
        this.dislike = props.dislike || "";
        this.movie = renderTemplate(html, props.movie);
        this.movieEdited = props.movieEdited;

    }

    deleteFilm(event) {
        event.preventDefault();
        const filmsArray = getMovies();
        const newFilmsArray = filmsArray.filter(movie => movie.id !== this.id);
        setFilmsToLocalStorage(newFilmsArray);
        this.movieEdited();
    }

    editFilm() {
        const editMovie = new AddNew({
            editedInfo: {
                id: this.id,
                scenario: this.scenario,
                title: this.title,
                titleOriginal: this.titleOriginal,
                image: this.image,
                text: this.text,
                rating: this.rating,
                year: this.year,
                country: this.country,
                slogan: this.slogan,
                director: this.director,
                producer: this.producer,
                roles: this.roles,
                operator: this.operator,
                composer: this.composer,
                isLiked: this.isLiked,
                like: this.like,
                dislike: this.dislike
            },

        });
        editMovie.render();
    }

    openFilm(event) {
        event.preventDefault();
        history.push(event.target.href);
    }

    render() {
        const editButton = this.movie.querySelector("#edit-btn");
        editButton.addEventListener("click", this.editFilm.bind(this))
        const openButton = this.movie.querySelector("#more");
        const deleteButton = this.movie.querySelector('#delete-btn')
        deleteButton.addEventListener("click", this.deleteFilm.bind(this))
        openButton.addEventListener("click", this.openFilm.bind(this))
        return this.movie;

    }
}