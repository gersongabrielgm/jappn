import React from "../libs/MiReact.js";
import nSocket from '../libs/NSocket.js';
export default class Detalle {
    alCargar(props) {
        return React.createElement("div", { class: "c" },
            React.createElement("div", { id: "pv_detalle" }),
            React.createElement("input", { type: "text", id: "code" }),
            React.createElement("button", { class: "icon-search", onClick: (e) => this.buscar(e) }));
    }
    buscar(e) {
        const txt = e.target.parentNode.querySelector('input');
        console.log(txt);
        nSocket.conectar(txt.value);
    }
}
