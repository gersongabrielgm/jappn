import React from "../libs/MiReact.js";
import Rest from "../libs/Rest.js";
export default class Buscarprod {
    bin;
    el;
    alCargar(props) {
        this.bin = props['bin'];
        return React.createElement("div", { id: "BuscarProducto" },
            React.createElement("div", { class: "row" },
                React.createElement("div", { class: "col c1" }),
                React.createElement("div", { class: "col c6" },
                    React.createElement("input", { style: "width:calc(100% - 50px)", type: "search", placeholder: "Producto a buscar..." }),
                    React.createElement("button", { class: "icon-search", onClick: () => this.buscar() }))),
            React.createElement("div", { class: "row" },
                React.createElement("div", { class: "col c1" }),
                React.createElement("div", { class: "col c10" },
                    React.createElement("div", { style: "margin-top:10px" },
                        React.createElement("table", { class: "f" },
                            React.createElement("tr", null,
                                React.createElement("th", null, "Nombre"),
                                React.createElement("th", null, "Marca"),
                                React.createElement("th", { style: "width:30px" }, "Cant")))))));
    }
    alCargado(el) {
        this.el = el;
        const input = el.querySelector("input");
        //input.focus()
        setTimeout(() => input.focus(), 1);
        el['Aceptar'] = (props, callBack) => {
            setTimeout(() => callBack({ error: 'No es posible crear en nuevo registro.', res: [1, 2, 3, 2, 1] }), 3000);
        };
    }
    buscar() {
        const entrada = this.el.querySelector("input");
        const criterio = entrada.value;
        const rest = new Rest();
        rest.local = true;
        rest.get('/Producto/criterio/' + criterio)
            .then(data => {
            console.log(data);
        });
    }
}
