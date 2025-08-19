import React from '../libs/MiReact.js';
import List from './List.js';
import Test from './Test.js';
import David from './David.js';
export default class Inicio {
    alCargar() {
        const nombres = ["Jesus", "Hil", "Ricardo", "David"];
        return React.createElement(David, { edad: "22", nombre: "David" });
        return React.createElement("h1", { id: "miDiv" },
            "Hola Ricardo..... ",
            React.createElement("button", { onClick: () => React.append(Test, document.querySelector("#miDiv")) }, "ok"));
        const campos = [
            { campo: "bod_producto_id", tipo: "hidden" },
            { etiqueta: "Usuario", icono: "icon-user", campo: "usuario", maximo: 10, info: "Información sobre esto" },
            { etiqueta: "Nombre", icono: "icon-box", campo: "nombre", obligatorio: true, maximo: 30 }
        ];
        const registro = { usuario: "Carlos", bod_producto_id: 1, nombre: "Panadol", estado: 1 };
        /*
        return <div style="width:600px">
            <JForm campos={campos} reg={registro} titulo="Producto" icono="icon-table" />
        </div>
*/
        return [
            React.createElement(List, { almacen: "bod_caracteristica" }),
            React.createElement("button", null, "Alert")
        ];
    }
    alCargado() {
        //console.log(this.el)
    }
}
