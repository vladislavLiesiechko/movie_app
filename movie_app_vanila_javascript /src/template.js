import template from "lodash.template";

export default function renderTemplate(html, data) {
    const tmpl = template(html);
    const string = tmpl(data);

    const container = document.createElement("div");
    container.innerHTML = string;

    return container.firstChild;
}