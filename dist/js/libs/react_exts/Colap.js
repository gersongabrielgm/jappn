export default class Colap {
    constructor(tag) {
        tag.classList.add("icon-plus");
        tag.style.cursor = "pointer";
        tag.onclick = (e) => {
            const cont = e.target.nextSibling;
            if (e.target.classList.contains("close")) {
                e.target.classList.remove("close");
                cont.classList.remove('hide');
            }
            else {
                e.target.classList.add("close");
                cont.classList.add('hide');
            }
        };
    }
}
