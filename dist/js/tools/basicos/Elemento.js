import React from "../../libs/MiReact.js";
export default class Elemento {
    value;
    minimo;
    maximo;
    _rendered(el, props) {
        console.log(props);
        if (props['icono'] != undefined)
            el.append(React.createElement("i", { class: props.icono }));
        if (props['info'] != undefined)
            el.append(React.createElement("i", { class: "icon-info", title: props['info'] }));
        if (props['obligatorio'] != undefined) {
            if (props.obligatorio) {
                el.children[0].innerHTML = el.children[0].innerHTML + ' *';
                props.notificar = true;
            }
        }
        el.append(React.createElement("div", { class: "_notif" }));
        if (props['onKeyDown'] != undefined) {
            el.querySelector('input').onkeydown = (e) => props.onKeyDown(e);
        }
        el.querySelector('input').onkeyup = (e) => {
            if (props.maximo != undefined) {
                const t = el.children[1].value.length;
                if (t > props.maximo) {
                    el.querySelector("._notif").innerHTML = "El límite de este elemento es " + props.maximo;
                }
                else {
                    el.querySelector("._notif").innerHTML = "";
                }
            }
            if (props['onKeyUp'] != undefined)
                props.onKeyUp(e);
        };
        if (props['onClick'] != undefined) {
            el.onclick = (e) => props.onClick(e);
        }
        el.querySelector('input').onblur = (e) => {
            if (props.maximo != undefined) {
                const t = el.children[1].value.length;
                if (t > props.maximo) {
                    el.children[1].value = el.children[1].value.substring(0, props.maximo);
                    el.querySelector("._notif").innerHTML = "";
                }
            }
            if (props.obligatorio != undefined) {
                if (el.children[1].value.trim() == "")
                    el.querySelector("._notif").innerHTML = "Este dato es obligatorio.";
            }
            if (props['blur'] != undefined) {
                props.blur(e);
            }
        };
        if (props['focus'] != undefined) {
            el.querySelector('input').onfocus = (e) => props.focus(e);
        }
        if (props['onChange'] != undefined) {
            el.querySelector('input').onchange = (e) => props.onChange(e);
        }
    }
}
