import html from './index.html';
import renderTemplate from "../template";


export default class Main {
    constructor() {
        this.main = renderTemplate(html)
    }
    render(){
        return this.main
    }
}