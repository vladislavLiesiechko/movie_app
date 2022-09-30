import renderTemplate from "../template";
import html from "../AddNew/index.html";
import {v4 as id} from 'uuid';
import {setEditedFilmsToLocalStorage} from "../localstorage-utils";
import {getHistory} from "../app-history";

const history = getHistory();

export default class AddNew {
    constructor(props) {
        this.form = renderTemplate(html)
        this.onEdited = props.newMovieConfirmed || props.movieEdited;
        this.movie = props.editedInfo || "";
    }

    hide(event) {
        if (!this.form.querySelector('.modal-dialog').contains(event.target)
            || this.form.querySelector(".close").contains(event.target)
            || event.target.hasAttribute('data-dismiss')) {
            this.form.remove();

        }
    }

    confirm(event) {
        event.preventDefault();

        const film = {
            id: id(),
            title: this.form.querySelector('#title').value || "-",
            titleOriginal: this.form.querySelector("#titleOriginal").value || "-",
            image: this.form.querySelector("#image").value || "https://legrand.ru/upload/noPhoto.png",
            year: this.form.querySelector("#year").value || "-",
            country: this.form.querySelector("#country").value || "-",
            slogan: this.form.querySelector("#slogan").value || "-",
            director: this.form.querySelector("#director").value || "-",
            producer: this.form.querySelector("#producer").value || "-",
            scenario: this.form.querySelector("#scenario").value || "-",
            roles: this.form.querySelector("#roles").value.split(",") || "-",
            operator: this.form.querySelector("#operator").value || "-",
            composer: this.form.querySelector("#composer").value || "-",
            rating: this.form.querySelector("#rating").value || "-",
            text: this.form.querySelector("#text").value || "-",
        }
        setEditedFilmsToLocalStorage({
            film: film,
            id:this.movie.id
        });
        history.push("/list");
        this.onEdited();
        this.hide(event)

    }

    setValues() {
        this.form.querySelector("#title").value = this.movie.title || "";
        this.form.querySelector("#titleOriginal").value = this.movie.titleOriginal || "";
        this.form.querySelector("#image").value = this.movie.image || "";
        this.form.querySelector("#year").value = this.movie.year || "";
        this.form.querySelector("#country").value = this.movie.country || "";
        this.form.querySelector("#slogan").value = this.movie.slogan || "";
        this.form.querySelector("#director").value = this.movie.director || "";
        this.form.querySelector("#producer").value = this.movie.producer || "";
        this.form.querySelector("#scenario").value = this.movie.scenario || "";
        this.form.querySelector("#roles").value = this.movie.roles || "";
        this.form.querySelector("#operator").value = this.movie.operator || "";
        this.form.querySelector("#composer").value = this.movie.composer || "";
        this.form.querySelector("#rating").value = this.movie.rating || "";
        this.form.querySelector("#text").value = this.movie.text || "";
    }

    render() {
        document.body.appendChild(this.form);
        this.setValues();
        this.form.addEventListener('click',  event => this.hide(event))
        const confirmButton = this.form.querySelector("#save-new");
        confirmButton.addEventListener('click',  event => this.hide(event))
        confirmButton.addEventListener("click", this.confirm.bind(this));

    }
}
