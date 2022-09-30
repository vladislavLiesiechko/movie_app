import html from './index.html'
import renderTemplate from '../template';

export default class Welcome {
    constructor() {
        this.welcome = renderTemplate(html)
    }

    render(){
        return this.welcome;
    }
}