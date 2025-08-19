import React from "../libs/MiReact.js";
import JappN from "../libs/JappN.js";
export default class Busqueda extends JappN {
    alCargar(props) {
        let estilo = "";
        if (props['ancho'] != undefined)
            estilo += 'width:' + props.ancho + ';';
        return React.createElement("div", { class: "t_busqueda", style: estilo },
            React.createElement("input", { type: "text", placeholder: props.placeholder }),
            React.createElement("button", { class: "icon-search" }));
    }
    aboute() {
        console.log("SOY ABOUT DE BUSCAR");
    }
}
