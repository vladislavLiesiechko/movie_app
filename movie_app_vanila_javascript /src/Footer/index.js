import renderTemplate from "../template";
import html from "./index.html";

export default class Footer {
    constructor() {
        this.footer = renderTemplate(html,{year: new Date().getFullYear()})
    }

    render(){
        return this.footer;
    }
}