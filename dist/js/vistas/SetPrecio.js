import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import Rest from "../libs/Rest.js";
import { restDefault } from "./bin/env.js";
export default class SetPrecio extends JappN {
    alCargar(props) {
        const rest = new Rest(restDefault);
        return React.createElement("div", { class: "panel" },
            React.createElement("div", { class: "d" },
                React.createElement("span", { class: "mlink" }, "Agregar Nueva Lista")),
            React.createElement("h4", { class: "icon-money" }, " Precios:"),
            React.createElement("table", { class: "c80p tb1" },
                React.createElement("tr", null,
                    React.createElement("th", { style: "width:60%" }, "Nombre"),
                    React.createElement("th", null, "Precio")),
                React.createElement("tr", null,
                    React.createElement("td", null, "Normal"),
                    React.createElement("td", null,
                        React.createElement("input", { style: "text-align: right;", type: "number", value: "10.00" })))));
    }
    alCargado() {
    }
}
