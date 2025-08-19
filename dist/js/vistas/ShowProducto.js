import React from "../libs/MiReact.js";
import JappN from "../libs/JappN.js";
import Fichaproducto from "./Fichaproducto.js";
export default class ShowProducto extends JappN {
    alCargar() {
        return React.createElement("div", { class: "ShowProducto" },
            React.createElement(Fichaproducto, null));
    }
    alCargado() {
        const ref = this.comp('Busqueda');
        if (ref != undefined)
            ref.aboute();
    }
    alCerrar() {
        return false;
    }
}
