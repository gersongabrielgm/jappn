import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
class Fichaproducto extends JappN {
    alCargar(props) {
        return React.createElement("div", null,
            React.createElement("h3", null, "Nombre del producto"),
            React.createElement("div", { class: "col c6 i" },
                React.createElement("img", { src: "css/foto.jpg" })),
            React.createElement("div", { class: "col c6" },
                "Listas:",
                React.createElement("br", null),
                React.createElement("select", { id: "bod_lista_id", style: "width:100%" })),
            React.createElement("div", null,
                React.createElement("table", { class: "frm" },
                    React.createElement("tr", null,
                        React.createElement("th", null, "campo"),
                        React.createElement("td", null, "Valor")),
                    React.createElement("tr", null,
                        React.createElement("th", null, "campo"),
                        React.createElement("td", null, "Valor")),
                    React.createElement("tr", null,
                        React.createElement("th", null, "campo"),
                        React.createElement("td", null, "Valor")),
                    React.createElement("tr", null,
                        React.createElement("th", null, "campo"),
                        React.createElement("td", null, "Valor")),
                    React.createElement("tr", null,
                        React.createElement("th", null, "campo"),
                        React.createElement("td", null, "Valor")))));
    }
    alCargado(el) {
    }
    aboute() {
        console.log("Yo soy aboute");
    }
}
export default Fichaproducto;
