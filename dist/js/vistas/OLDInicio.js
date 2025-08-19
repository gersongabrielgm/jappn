import React from '../libs/MiReact.js';
import JappN from '../libs/JappN.js';
import FMenu from '../tools/FMenu.js';
import Info from './Info.js';
import Doc from './Doc.js';
import Detalle from './Detalle.js';
import Noti from './Noti.js';
import Buscarprod from './Buscarprod.js';
import Producto from './Producto.js';
import Kanban from '../tools/Kanban.js';
import JLogin from '../tools/JLogin.js';
import JTabs from '../tools/JTabs.js';
export default class Fact extends JappN {
    alCargar() {
        return React.createElement("div", { class: "row" },
            React.createElement("div", { class: "col c4" }),
            React.createElement("div", { class: "col c4" },
                React.createElement(JLogin, { vista: React.createElement(Producto, null) })),
            React.createElement("div", { class: "col c4" }));
        const res = [
            { tab: "Car", contenido: React.createElement("div", null,
                    React.createElement("h3", null, "Mi carro"),
                    "123.32 - 32.33 - 444.0"), icono: "icon-truck", sel: true },
            { tab: "Mi tab", contenido: "Contenido", icono: "icon-user" },
            { tab: "Tu tab", contenido: "Contenido de tu tab", icono: "icon-monitor" }
        ];
        return React.createElement(Kanban, null,
            React.createElement("div", { nombre: "Pendientes" },
                React.createElement("div", null,
                    React.createElement("span", null, "Uno")),
                React.createElement("div", null,
                    React.createElement("span", null, "Dos")),
                React.createElement("div", null,
                    React.createElement("span", null, "Tres"))),
            React.createElement("div", { nombre: "En Proceso" },
                React.createElement("div", null, "Cuatro"),
                React.createElement("div", null, "Cinco"),
                React.createElement("div", null, "Seis"),
                React.createElement("div", null, "Siete"),
                React.createElement("div", null, "Ocho")),
            React.createElement("div", { nombre: "Terminadas" },
                React.createElement("div", null, "Nada"),
                React.createElement("div", null, "Todos"),
                React.createElement("div", null, "Algo")),
            React.createElement("div", { nombre: "Entregadas" },
                React.createElement("div", null, "Naranjas"),
                React.createElement("div", null, "Verdes"),
                React.createElement(JTabs, { res: res, mini: true })));
        return React.createElement("div", { class: "row" },
            React.createElement("div", { class: "col c12" },
                React.createElement("div", { class: "panel", id: "header" },
                    React.createElement("h1", { class: "icon-cart" }, " Punto de venta."))),
            React.createElement("div", { class: "col c3" },
                React.createElement("div", { class: "panel" },
                    React.createElement("span", { class: "jap_colap" }, "Informaci\u00F3n"),
                    React.createElement(Info, null))),
            React.createElement("div", { class: "col c5" },
                React.createElement("div", { class: "panel" },
                    React.createElement("span", { class: "jap_colap" }, "Detalle"),
                    React.createElement(Detalle, null))),
            React.createElement("div", { class: "col c4" },
                React.createElement("span", { class: "jap_colap" }, "Documento"),
                React.createElement(Doc, null),
                React.createElement("span", { class: "jap_colap" }, "Notificaciones"),
                React.createElement(Noti, { bin: this })),
            React.createElement(FMenu, { data: [
                    [
                        { nombre: 'Buscar Producto', fnd: () => {
                                this.buscar();
                                this.comp('Info').selTab('Producto');
                            } },
                        { nombre: 'Cliente', fnd: () => this.comp('Info').selTab('Clientes') },
                        { nombre: 'Escanear', fnd: () => this.$('#code')[0].focus() },
                        { nombre: 'New Producto', fnd: () => this.newProducto() },
                        { nombre: 'New Producto', fnd: () => this.newProducto() },
                        { nombre: 'New Producto', fnd: () => this.newProducto() },
                        { nombre: 'New Producto', fnd: () => this.newProducto() },
                        { nombre: 'New Producto', fnd: () => this.newProducto() },
                        { nombre: 'New Producto', fnd: () => this.newProducto() },
                    ],
                    /*
                    [
                        {nombre:'Cliente', fnd:()=>this.comp('Info').selTab('Clientes')},
                        {nombre:'Escanear', fnd:()=>this.$('#code')[0].focus()},
                        {nombre:'Buscar Producto', fnd:()=>{
                            this.buscar()
                            this.comp('Info').selTab('Producto')
                        }},
                    ]*/
                ] }));
    }
    alCargado() {
    }
    newProducto() {
        this.Dialogo({
            //bin:this  //contexto de respuesta
            mensaje: Producto,
            vprops: { bin: this }, //propiedaes para la vista de contenido
            win: "full",
            titulo: "Ficha de Producto",
            botones: {
                Guardar: {},
                Cancelar: {}
            }
        });
    }
    buscar() {
        this.Dialogo({
            mensaje: React.createElement(Buscarprod, { bin: this }),
            win: "medio",
            titulo: "Buscar Producto",
            botones: {
                Aceptar: { nombre: "a" },
                Cancelar: {}
            },
            callBack: (data) => {
                console.log(data);
            }
        });
    }
    rmenu() {
        console.log('retorno del Fmenu');
    }
    Guardar(...e) {
        console.log("INICIO");
        console.log(e);
        //e[0].ctx.cerrar()
    }
}
