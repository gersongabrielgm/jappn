import JappN from "../../libs/JappN.js";
import React from "../../libs/MiReact.js";
import Rest from "../../libs/Rest.js";
import Dialogo from "../Dialogo.js";
import Input from "./Input.js";
import { restDefault } from "../../vistas/bin/env.js";
import Dbase from "../../libs/dBase.js";
export default class MetaSelect extends JappN {
    llave;
    endpoint;
    local = 1;
    select;
    rest = new Rest(restDefault);
    callBack = (...e) => e;
    props;
    alCargar(props) {
        if (props.local != undefined)
            this.rest.local = props.local;
        else
            this.rest.local = this.local;
        if (props.callBack != undefined)
            this.callBack = props.callBack;
        this.props = props;
        this.rest.get(props.endpoint + '/llave')
            .then(data => {
            if (data.error != '')
                alert(data.error);
            else {
                this.llave = data.llave;
                this.props['tabla'] = data.llave.substring(0, data.llave.length - 3);
            }
        });
        const internas = ['endpoint', 'bin', 'local', 'callBack'];
        internas.forEach(i => {
            if (props[i] != undefined) {
                this[i] = props[i];
                delete props[i];
            }
        });
        return React.createElement("div", { class: "_trj MetaSelect " + (props.class == undefined ? "" : props.class), id: props.id },
            React.createElement("span", null, props.etiqueta),
            React.createElement("select", null),
            React.createElement("b", { class: "icon-search", onClick: () => this.buscar() }),
            React.createElement("b", { class: "icon-plus", onClick: () => this.nuevo() }));
        /*
        return <div class="MetaSelect _campo" value="">
            <select></select>&nbsp;<span class="icon-plus"></span>
        </div>
        */
    }
    alCargado(el, props) {
        this['el'] = el;
        for (let i in props) {
            el[i] = props[i];
        }
        this.select = el.querySelector('select');
        this.rest.get(this.endpoint + '/active')
            .then(data => {
            if (data.error != "") {
                this.select.append(React.createElement("option", { value: "-1" }, "Error"));
            }
            else {
                data.res.map(i => {
                    const key = i[this.llave];
                    let label = '';
                    for (let k in i) {
                        if (k != this.llave) {
                            label += i[k] + ' ';
                        }
                    }
                    return this.select.append(React.createElement("option", { value: key }, label));
                });
            }
            el.setAttribute('value', this.select.value);
            this.select.addEventListener('change', (e) => {
                el.setAttribute('value', e.target.value);
                this.callBack(e);
            });
        });
    }
    buscar() {
        const dlg = new Dialogo();
        const tag = dlg.alCargar({
            mensaje: React.createElement("div", { style: "height:calc(100% - 15px)" },
                React.createElement(Input, { etiqueta: "Criterio para b\u00FAsqueda", onKeyUp: (e) => this.filtrar(e) }),
                React.createElement("div", { class: "resultado", style: "overflow:auto;height:calc(100% - 110px)" })),
            //botones:{Buscar:{}},
            bin: this,
            callBack: (data) => this.callBack(data),
            style: 'height:80%'
        });
        document.querySelector('#root')?.append(tag);
        this.setJappFnd(tag, dlg);
        dlg.alCargado(tag);
    }
    Buscar(data, ret) {
        ret({ error: '' });
    }
    filtrar(e) {
        //migrar a api local y/o remota
        const criterio = {};
        if (this.props['criterio'] != undefined)
            criterio[this.props.criterio] = e.target.value.trim();
        const res = e.target.parentNode.parentNode.querySelector(".resultado");
        Dbase.readAll(this.props.tabla, criterio)
            .then((data) => {
            res.innerHTML = "";
            if (data.length == 0)
                res.innerHTML = "No hay resultado.";
            else {
                const btn = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('button');
                res.append(...data.map(i => React.createElement("div", { class: "item", onClick: () => this.seleccionar(i[this.llave], btn) }, i[this.props.criterio])));
            }
        });
    }
    seleccionar(id, btn) {
        //Falta agregar marca al top 20 que se usará cuando el listado sea mayor a 20
        this.select.value = id;
        btn.click();
    }
    nuevo() {
        const dlg = new Dialogo();
        const form = this.props['form'] != undefined
            ? this.props['form']
            : React.createElement(Input, { id: "valor", class: "_campo", placeHolder: "Valor para el nuevo registro.", etiqueta: this.props['etiqueta'] == undefined ? "Nuevo registro" : this.props['etiqueta'] });
        const tag = dlg.alCargar({
            mensaje: form,
            botones: { Guardar: {} },
            bin: this,
            callBack: (data) => this.callBack(data)
        });
        document.querySelector('#root')?.append(tag);
        this.setJappFnd(tag, dlg);
        dlg.alCargado(tag);
    }
    Guardar(data) {
        //objeto a registrar
        //const valor = data.ctx.el.querySelector('input').value
        const valor = this.getCampos(data.ctx.el);
        //grabar valor
        const contexto = data.ctx;
        this.rest.post(this.endpoint, valor)
            .then(data => {
            if (data.error != '') {
                console.log(data);
                return data;
            }
            else {
                //Agregar al select
                this.select.append(React.createElement("option", { value: data.id }, data.valor));
                //seleccionar el valor nuevo
                this.select.value = data.id;
                this.select.parentNode.setAttribute('value', data.id);
                this.clearCampos(contexto.el);
                return data;
            }
        });
    }
}
