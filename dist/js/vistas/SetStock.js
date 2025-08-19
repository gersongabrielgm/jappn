import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import Rest from "../libs/Rest.js";
import { restDefault } from "./bin/env.js";
export default class SetStock extends JappN {
    alCargar(props) {
        const rest = new Rest(restDefault);
        return React.createElement("div", { class: "panel" },
            React.createElement("div", { class: "d" },
                React.createElement("span", { class: "mlink" }, "Agregar Bodega")),
            React.createElement("h4", { class: "icon-box" }, " Existencias:"),
            React.createElement("table", { class: "tb1 c80p", id: "setStockTb" },
                React.createElement("tr", null,
                    React.createElement("th", null, "Bodega"),
                    React.createElement("th", null, "Existencia"),
                    React.createElement("th", null)),
                React.createElement("tr", null,
                    React.createElement("td", null, "Principal"),
                    React.createElement("td", { class: "d" }, "0.000"),
                    React.createElement("td", null,
                        React.createElement("span", { class: "icon-plus-1" })))));
    }
}
