import React from "../libs/MiReact.js";
import MetaSelect from "../tools/basicos/MetaSelect.js";
import Texto from "../tools/basicos/Texto.js";
import Imgset from "../tools/basicos/Imgset.js";
import Input from "../tools/basicos/Input.js";
import SetPrecio from "./SetPrecio.js";
import SetStock from "./SetStock.js";
import JappN from "../libs/JappN.js";
export default class Producto extends JappN {
    local = false;
    alCargar(props) {
        return React.createElement("div", { class: "row" },
            React.createElement("div", { class: "col c1" }),
            React.createElement("div", { class: "col c4" },
                React.createElement("div", { class: "panel" },
                    React.createElement("p", null,
                        React.createElement(Input, { etiqueta: "Producto:", id: "nombre" })),
                    React.createElement("p", null,
                        React.createElement(Texto, { etiqueta: "Descripci\u00F3n:", id: "descripcion" })),
                    React.createElement("p", null,
                        React.createElement(MetaSelect, { criterio: "nombre", form: React.createElement(Input, { id: "nombre", class: "_campo", placeHolder: "Nombre de la nueva marca.", etiqueta: "Nueva Marca:" }), etiqueta: "Marca:", endpoint: "/Marca" })),
                    React.createElement("p", null,
                        React.createElement(Imgset, { talla: "200px", etiqueta: "Foto:", src: "css/foto.png" })))),
            React.createElement("div", { class: "col c1" }),
            React.createElement("div", { class: "col c5" },
                React.createElement("div", { class: "panel" },
                    React.createElement("div", { class: "jsx_VAcordion", style: "height:calc(100vh - 150px)" },
                        React.createElement("div", { nombre: " Precios:", icono: "icon-money", class: "sel" },
                            React.createElement(SetPrecio, { id: props.id })),
                        React.createElement("div", { nombre: "Existencias:", icono: "icon-box", class: "sel" },
                            React.createElement(SetStock, null))))));
    }
    alCargado(el, props) {
        el['Guardar'] = (data, cb) => {
            cb({ error: '' });
        };
    }
    alCerrar() {
        return false;
    }
    Guardar(...e) {
        console.log(this);
        //cerrar dialogo
        e[0].ctx.cerrar();
    }
}
