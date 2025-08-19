import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import Inicio from "../vistas/Inicio.js";
export default class NoPermiso extends JappN {
    tipo = 0;
    alCargar(props) {
        switch (this['tipo']) {
            case 0:
                return React.createElement("div", { style: "padding:20px" },
                    React.createElement("h1", { style: "color:gray" }, "Japp-N"),
                    React.createElement("h2", { class: "icon-warning", style: "color:darkred" }, "No posee permiso para acceder a este recurso."),
                    React.createElement("button", { onClick: () => this.Cargar(React.createElement(Inicio, null)) }, "Regresar a pantalla de incio"));
                break;
            case 1:
                return React.createElement("div", { class: "icon-warning" }, "No posee acceso!!");
                break;
        }
    }
}
