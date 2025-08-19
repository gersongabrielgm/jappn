import React from "../../libs/MiReact.js";
import Dialogo from "../Dialogo.js";
import Input from "./Input.js";
import JappN from "../../libs/JappN.js";
export default class Imgset extends JappN {
    alCargar(props) {
        return React.createElement("div", { class: "_trj " + (props.class == undefined ? "" : props.class), id: props.id },
            React.createElement("span", null, props.etiqueta),
            React.createElement("div", { class: "c" },
                React.createElement("img", { style: `max-height:${props.talla};max-width:${props.talla}`, src: "css/foto.jpg", onClick: (e) => this.change(e) })));
    }
    change(e) {
        const dlg = new Dialogo();
        const tag = dlg.alCargar({
            mensaje: React.createElement(Input, { etiqueta: "Ruta de la imagen", valor: e.target.src }),
            botones: { Aceptar: {} },
            bin: this,
            callBack: (data) => e.target.src = data.contenido.querySelector('input').value,
            style: 'height:200px'
        });
        document.querySelector('#root')?.append(tag);
        this.setJappFnd(tag, dlg);
        dlg.alCargado(tag);
    }
}
