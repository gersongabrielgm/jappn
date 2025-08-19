import React from "../libs/MiReact.js";
export default function Caracteristica() {
    return React.createElement("tr", null,
        React.createElement("td", null,
            React.createElement("input", { type: "text", placeholder: "Etiqueta" })),
        React.createElement("td", null,
            React.createElement("input", { type: "text", placeholder: "Valor" })));
}
