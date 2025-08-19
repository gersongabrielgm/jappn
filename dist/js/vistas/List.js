import Dbase from "../libs/dBase.js";
import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import Edit from "./Edit.js";
export default class List extends JappN {
    alCargar(props) {
        return React.createElement("table", null);
    }
    alCargado(elemento, props) {
        Dbase.readAll(props.almacen)
            .then((data) => {
            const llaves = Object.keys(data[0]);
            elemento.append(React.createElement("tr", null,
                React.createElement("th", null, "NO"),
                llaves.map(i => React.createElement("th", null, i != props.almacen + "_id" ? i.toUpperCase() : ""))));
            for (let i = 0; i < data.length; i++) {
                const registros = [];
                for (let r in data[i]) {
                    const cont = data[i][r];
                    const llavePrimaria = props.almacen + "_id";
                    const elBoton = React.createElement("button", { onClick: () => this.edit(cont) }, "Editar");
                    const valor = r == llavePrimaria ? elBoton : cont;
                    registros.push(valor);
                }
                elemento.append(React.createElement("tr", null,
                    React.createElement("th", null, i + 1),
                    registros.map(i => React.createElement("td", null, i))));
            }
        });
    }
    edit(id) {
        //console.log(this)
        this.Dialogo({ mensaje: React.createElement(Edit, null) });
    }
}
