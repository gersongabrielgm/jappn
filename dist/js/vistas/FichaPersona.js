import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import Caracteristica from "./Caracteristica.js";
export default class FichaPersona extends JappN {
    alCargar(props) {
        return React.createElement("div", { class: "fpanel", id: "pv_fichapersona" },
            React.createElement("h3", null, "Ficha de persona"),
            React.createElement("div", { class: "row" },
                React.createElement("div", { class: "col c4 i" },
                    React.createElement("img", { id: "fp_foto", src: "", style: "max-width:100%" }),
                    React.createElement("input", { type: "file", accept: "image/*", onChange: (e) => this.cargarImagen(e) })),
                React.createElement("div", { class: "col c8" },
                    React.createElement("table", { class: "frm" },
                        React.createElement("tr", null,
                            React.createElement("th", null, "Nombre"),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", id: "fp_nombre" }))),
                        React.createElement("tr", null,
                            React.createElement("th", null, "Apellido"),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", id: "fp_apellido" }))),
                        React.createElement("tr", null,
                            React.createElement("th", null, "Estado civil"),
                            React.createElement("td", null,
                                React.createElement("select", { id: "fp_estado" },
                                    React.createElement("option", { value: "Casado" }, "Casado"),
                                    React.createElement("option", { value: "Soltero" }, "Soltero"),
                                    React.createElement("option", { value: "Divorciado" }, "Divorciado"),
                                    React.createElement("option", { value: "Viudo" }, "Viudo"))))))),
            React.createElement("div", null,
                React.createElement("h4", null, "Caracter\u00EDsticas"),
                React.createElement("table", { class: "frm", id: "fp_caracteristicas" }),
                React.createElement("button", { onClick: () => this.agregarCaracteristica() }, "Agregar caracter\u00EDstica")),
            React.createElement("div", null,
                React.createElement("button", { onClick: () => this.enviarFicha() }, "Enviar")));
    }
    alCargado(el) {
        this.el = el;
    }
    cargarImagen(e) {
        const input = e.target;
        const file = input.files && input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = this.el.querySelector("#fp_foto");
                img.src = ev.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    agregarCaracteristica() {
        const tabla = this.el.querySelector("#fp_caracteristicas");
        tabla.append(React.createElement(Caracteristica, null));
    }
    enviarFicha() {
        const img = this.el.querySelector("#fp_foto");
        const data = {
            fotografia: img.src,
            nombre: this.el.querySelector("#fp_nombre").value,
            apellido: this.el.querySelector("#fp_apellido").value,
            estadoCivil: this.el.querySelector("#fp_estado").value,
            caracteristicas: []
        };
        const filas = this.el.querySelectorAll("#fp_caracteristicas tr");
        filas.forEach((f) => {
            const inputs = f.querySelectorAll("input");
            data.caracteristicas.push({
                label: inputs[0].value,
                valor: inputs[1].value
            });
        });
        fetch("http://localhost:8080/Persona", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: "1278129384102938492",
                _schema: "dev",
                namespace: "midiendo"
            },
            body: JSON.stringify(data)
        });
    }
}
