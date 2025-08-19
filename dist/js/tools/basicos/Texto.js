import React from "../../libs/MiReact.js";
import Elemento from "./Elemento.js";
export default class Texto extends Elemento {
    alCargar(props) {
        return React.createElement("div", { class: "_trj " + (props.class == undefined ? "" : props.class), id: props.id },
            React.createElement("span", null, props.etiqueta),
            React.createElement("textarea", { onChange: (e) => this.setValue(e.target) }, props.valor));
    }
    setValue(e) {
        this.value = e.value;
    }
    alCargado(el, props) {
        el['get'] = () => {
            return this.value;
        };
        super._rendered(el, props);
    }
}
