import React from "./MiReact.js";
import $ from "./$.js";
import Dialogo from "../tools/Dialogo.js";
import { notiWait } from '../vistas/bin/env.js';
export default class JappN {
    id = ''; //identificador unico por defecto vacio
    nodos = [];
    bin = undefined; //contexto remoto
    el;
    estado = "Inicializando";
    notificado = 0; //miliseundos de bloqueo para recibir mas notificaciones
    parent = undefined;
    arrEstadoError = ["Id duplicado", "Bloqueado"];
    arrEstadoOk = ["Cargado", "Cargando"];
    constructor(...e) {
        //React._actual_.push(this)
        //console.log(this) 
    }
    $(el) {
        return $(el);
    }
    //Pendiente de analizar y definir funcionalidad
    comp(name) {
        for (let i = 0; i < this.nodos.length; i++)
            if (this.nodos[i].nombre == name)
                return this.nodos[i];
        return undefined;
    }
    //pre recibir mensajes de broadcast
    _preRecibir(mensaje) {
        try {
            if (this['alRecibir'] != undefined) {
                this['alRecibir'](mensaje);
            }
            this.notificado = notiWait; //tiempo de bloqueo despues de ser notificado (env.js)
            console.log(this.notificado);
            const timer = setInterval(() => {
                this.notificado--;
                if (this.notificado == 0)
                    clearInterval(timer);
            }, 1);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    enviar(mensaje) {
        if (mensaje['mensaje'] == undefined)
            mensaje['mensaje'] = mensaje;
        if (mensaje['destino'] == undefined) {
            mensaje['destino'] = "*";
            mensaje['propagacion'] = 4;
        }
        if (mensaje['propagacion'] == undefined)
            mensaje['propagacion'] = 0;
        if (mensaje['confirmar'] == undefined)
            mensaje['confirmar'] = false;
        let retorno = true;
        switch (mensaje['propagacion']) {
            //hacia un elemento, nombre o #id
            case 0:
                retorno = this.aModulo(mensaje);
                break;
            //hacia la rama
            case 1:
                retorno = this.aRama(mensaje);
                break;
            //hacia el tronco
            case 2:
                retorno = this.aTronco(mensaje);
                break;
            //hacia el tronco y rama
            case 3:
                const rama = this.aRama(mensaje);
                const tronco = this.aTronco(mensaje);
                retorno = rama == tronco;
                break;
            //broadcast
            case 4:
                const root = this.getRoot();
                retorno = this.aRama(mensaje, root);
                break;
        }
        return retorno;
    }
    //function hacia un modulo o modulos que cumplan el mismo criterio
    aModulo(mensaje, mo = []) {
        mo = this.findModulo(mensaje.destino);
        let pass = true;
        for (let i = 0; i < mo.length; i++) {
            pass = pass == this.tryEnviar(mensaje, mo[i]);
        }
        return pass;
    }
    //notifica hacia la rama, mo es el modulo
    aRama(mensaje, mo = this) {
        let pass = true;
        if (mo['nodos'] != undefined) {
            for (let i = 0; i < mo['nodos'].length; i++) {
                const iMo = mo.nodos[i];
                const id = mensaje.destino?.substring(0, 1) == "#" ? mensaje.destino?.substring(1) : undefined;
                //si encuentra igualacion en ID, nombre o es destino *
                if (id == iMo.id || mensaje.destino == iMo.nombre || mensaje.destino == "*") {
                    pass = pass == this.tryEnviar(mensaje, iMo);
                }
                if (iMo['nodos'] != undefined) {
                    const found = this.aRama(mensaje, iMo);
                    pass = pass == found;
                }
            }
        }
        return pass;
    }
    //notifica hacia el tronco
    aTronco(mensaje, mo = this) {
        return true;
    }
    //accion de intentar enviar el mensaje
    tryEnviar(mensaje, iMo) {
        let pass = true;
        //firmar mensaje
        mensaje['ctxEmisor'] = this;
        let ok = true;
        if (iMo['_preRecibir'] != undefined) {
            if (mensaje['confirmar']) {
                //espera el resultado de la ejecucion
                ok = iMo['_preRecibir'](mensaje);
                pass = pass == ok;
                if (this['alMandado'])
                    this['alMandado'](mensaje, ok, pass);
            }
            else {
                //ejecuta sin esperar resultado
                iMo['_preRecibir'](mensaje);
                this['alMandado'](mensaje, true, pass);
            }
        }
        return pass;
    }
    findModulo(strModulo, mo = undefined) {
        mo = mo == undefined ? this.getRoot() : mo;
        const pila = [];
        //recorrer arbol 
        if (mo.nodos != undefined) {
            for (var i = 0; i < mo.nodos.length; i++) {
                //si se busca por ID
                const id = strModulo.substring(0, 1) == "#" ? strModulo.substring(1) : undefined;
                if (mo.nodos[i].id == id || mo.nodos[i].nombre == strModulo) { //si este es el modulo que busco
                    pila.push(mo.nodos[i]);
                }
                else {
                    if (mo.nodos[i]['nodos'] != undefined) {
                        //crear recursividad
                        const found = this.findModulo(strModulo, mo.nodos[i]);
                        //si hay recursividad positiva retorno lo encontrado
                        if (found.length > 0)
                            pila.push(found);
                    }
                }
            }
        }
        return pila;
    }
    //Puente para poder aplicar operaciones globales a los componentes antes de cargar
    _preCargar(props, contenido, callBack) {
        //tempo en lo que se reselvue find/modulo
        if (props['id'] != undefined) {
            if (props['id'].substring(0, 1) == "*") {
                this.estado = 'Id invalido';
                return React.createElement("span", { style: "font-size:.8rem", class: "icon-alert" }, "Error: Id inicia con caracter inv\u00E1lido [ * ].");
            }
            const existente = this.findModulo(`#${props['id']}`);
            if (existente.length > 0) {
                this.estado = 'Id duplicado';
                return React.createElement("span", { style: "font-size:.8rem", class: "icon-alert" },
                    "Error: conflicto con ID, ya existe un componente renderizado desde el m\u00F3dulo con el id [ ",
                    props['id'],
                    " ] en esta rama.");
            }
        }
        this.estado = 'cargando';
        /*
        if (props['bin'] != undefined) {
            if (props.bin['nodos'] != undefined) props.bin['nodos'].push(this)
            this.bin = props.bin
        }
        */
        if (props['id'] != undefined)
            this.id = props['id'];
        return this.alCargar(props, contenido, callBack);
    }
    _preCargado(element, contenido, callBack) {
        this.el = element;
        if (this.arrEstadoError.indexOf(this.estado) == -1)
            this.estado = "Cargado";
        else
            return;
        if (this['alCargado'] != undefined)
            this['alCargado'](element, contenido, callBack);
    }
    //Puente para poder aplicar operaciones globales a los componentes antes de cargar
    _preCerrar(props, contenido, callBack) {
        //evaluar eliminar la referencia a nodos del componente parent y compoennte bin
        //evaluar un evento posCerrar
        return this['alCerrar'] != undefined ? this['alCerrar'](props, contenido, callBack) : false;
    }
    //evento original alCargar (funcion por omision)
    alCargar(props, contenido, callBack) {
        return React.createElement("span", { style: "color:red" }, " !!Este componente est\u00E1 incompleto, requiere una funci\u00F3n para el evento alCargar.!!");
    }
    //funcion para cargar contenido de forma controlada a la app
    /*
    protected Cargar(vista, destino="#root"){
        console.clear()
        const salir = this.eliminarRecursivamente(this, true)
        console.log(salir)
    }
        */
    Cargar(vista, cont_callback, callback_cont) {
        let cont, fnd;
        if (typeof cont_callback == "string")
            cont = document.querySelector(cont_callback);
        if (typeof callback_cont == "string")
            cont = document.querySelector(callback_cont);
        if (typeof cont_callback == "function")
            fnd = cont_callback;
        if (typeof callback_cont == "function")
            fnd = callback_cont;
        if (cont == undefined)
            cont = document.querySelector("#root");
        //Limpiar cont
        const siSale = this.clearCont(cont, true);
        if (siSale.error == "") {
            this.doCargar(cont, vista, fnd);
        }
    }
    eliminarRecursivamente(item, exito) {
        let grpExito = true;
        let miExito = true;
        for (let i = item.nodos.length - 1; i >= 0; i--) {
            const nodo = item.nodos[i];
            if (nodo.nodos && nodo.nodos.length > 0) {
                grpExito = grpExito && this.eliminarRecursivamente(nodo, exito && grpExito && miExito); // Llamada recursiva para eliminar los nodos descendientes
            }
            else {
                grpExito = grpExito && this._valClose(nodo);
            }
            // Eliminar el nodo actual
            //nodos.splice(i, 1);
        }
        miExito = miExito && this._valClose(item);
        return exito && grpExito && miExito; // Caso base: si no hay nodos o el array está vacío, no hay nada que hacer
    }
    _valClose(item) {
        let miExito = true;
        if (item['alCerrar'] != undefined) {
            miExito = item['alCerrar']();
            if (typeof miExito != "boolean")
                miExito = true;
        }
        return miExito;
    }
    //la funcion que finalmente carga el contenido
    doCargar(cont, vista, fnd = (v) => { }) {
        cont.innerHTML = '';
        cont.append(vista);
        if (fnd != undefined)
            fnd(vista);
    }
    setJappFnd(tag, ctx) {
        if (ctx == undefined)
            ctx = this;
        //agrega el evnto de validacion de cierre
        if (ctx['alCerrar'] != undefined)
            tag['_alCerrar'] = () => {
                return ctx['alCerrar']();
            };
        //evaluar listeners para keypress 
        if (ctx['_keys'] != undefined)
            tag['_alKeyDown'] = (event) => {
                for (let i = 0; i < ctx['_keys'].length; i++) {
                    if (ctx['_keys'][i]['ctrl'] == undefined)
                        ctx['_keys'][i]['ctrl'] = false;
                    if (ctx['_keys'][i]['alt'] == undefined)
                        ctx['_keys'][i]['alt'] = false;
                    const tecla = ctx['_keys'][i]['key'] != undefined ?
                        event.key == ctx['_keys'][i]['key']
                        : ctx['_keys'][i]['code'] != undefined ?
                            event.code == ctx['_keys'][i]['code']
                            : event.keyCode == ctx['_keys'][i]['keyCode'];
                    if (tecla
                        && event.ctrlKey == ctx['_keys'][i]['ctrl']
                        && event.altKey == ctx['_keys'][i]['alt']) {
                        ctx['_keys'][i]['fnd'](event);
                        event.stopPropagation();
                        event.preventDefault();
                        return false;
                    }
                }
            };
        this.setJappAcc(tag);
    }
    setJappAcc(tag) {
        if (tag instanceof Array == false) {
            tag = [tag];
        }
        for (let l = 0; l < tag.length; l++) {
            const colaps = tag[l].querySelectorAll('.jap_colap');
            for (let i = 0; i < colaps.length; i++) {
                const element = colaps[i];
                element.classList.add("icon-plus");
                element.style.cursor = "pointer";
                element.addEventListener("click", (e) => {
                    const cont = e.target.nextSibling;
                    if (e.target.classList.contains("close")) {
                        e.target.classList.remove("close");
                        cont.classList.remove('hide');
                    }
                    else {
                        e.target.classList.add("close");
                        cont.classList.add('hide');
                    }
                });
            }
        }
        for (let l = 0; l < tag.length; l++) {
            const edits = tag[l].querySelectorAll('.jap_edit');
            edits.forEach(el => {
                const exist = el.nextElementSibling;
                let agregado = false;
                if (exist == null) {
                    el.insertAdjacentElement('afterend', React.createElement("i", { class: "icon-edit" }));
                    agregado = true;
                }
                else if (!exist.classList.contains('icon-edit')) {
                    el.insertAdjacentElement('afterend', React.createElement("i", { class: "icon-edit" }));
                    agregado = true;
                }
                if (agregado) {
                    el.addEventListener('click', e => {
                        const original = this.$(el).val();
                        const rect = el.getBoundingClientRect();
                        const input = React.createElement("input", { lock: "0", type: "text", value: original });
                        input.style.position = "absolute";
                        input.style.top = `${rect.top - 7}px`;
                        input.style.left = `${rect.left}px`;
                        input.style.width = `${rect.width}px`;
                        input.style.height = `${rect.height + 14}px`;
                        document.querySelector('#root')?.append(input);
                        input.select();
                        input.onkeydown = e => {
                            if (e.key == 'Escape') {
                                e.stopPropagation();
                                e.preventDefault();
                                input.setAttribute('lock', 1);
                                this.$(el).val(original);
                                input.remove();
                            }
                            if (e.key == 'Enter') {
                                e.stopPropagation();
                                e.preventDefault();
                                input.setAttribute('lock', 1);
                                this.$(el).val(e.target.value);
                                input.remove();
                            }
                        };
                        input.addEventListener('blur', e => {
                            if (e.target.getAttribute('lock') == "0")
                                this.$(el).val(e.target.value);
                            input.remove();
                        });
                    });
                }
            });
        }
    }
    //funcion que evalua la limpiueza 
    clearCont(cont, main = false) {
        const lista = Array.from(cont.querySelectorAll("*"));
        //const lista:any[]=cont.querySelectorAll("*")
        let cerrar = { error: '' };
        for (let i = 0; i < lista.length; i++) {
            //evaluar funcion al cerrar
            if (lista[i]['_alCerrar'] != undefined) {
                cerrar = lista[i]['_alCerrar']();
                if (cerrar.error != '') {
                    this.Dialogo(cerrar.error);
                    return cerrar;
                }
            }
            //evaluar mas hijos
            const verHijos = this.clearCont(lista[i]);
            if (verHijos == undefined)
                return { error: "" };
            if (verHijos['error'] != "") {
                return verHijos;
            }
        }
        return cerrar;
    }
    /** busca todois los campos marcados con la clase _trj en un elemeto */
    getCampos(query, clase = "") {
        const campos = clase == "" ? $(query).find("._trj") : $(query).find(clase);
        const reg = {};
        campos.forEach(el => reg[el.id] = el.get());
        return reg;
    }
    /**limpia los campos de un formulario/ */
    clearCampos(query, clase = "") {
        const campos = clase == "" ? $(query).find("._trj") : $(query).find(clase);
        campos.forEach(el => {
            if (el.tagName == "DIV")
                el.querySelector("input").value = "";
            else
                el.value = "";
        });
    }
    //manejo de errores
    e(data) {
        if (data.error == undefined) {
            alert("El objeto data recibido, no posee un estructura correcta para restComp.");
            return true;
        }
        else if (data.error != "") {
            alert(data.error);
            return true;
        }
        else {
            return false;
        }
    }
    //obtiene los elementos DIV dentro de un elemento HTML
    /**pendiente de definir su funcion y validez */
    getDivs(contenido, tipo = "DIV") {
        let myContent = [];
        for (let i = 0; i < contenido.length; i++)
            if (contenido[i].tagName == tipo) {
                if (tipo != "DIV")
                    contenido[i] = React.createElement("div", null, contenido[i]);
                myContent.push(contenido[i]);
            }
            else {
                if (contenido[i].constructor.name == "Array")
                    myContent = myContent.concat(this.getDivs(contenido[i], tipo));
            }
        return myContent;
    }
    //devuelve verdadero si la app está ejecutandose en un disositivo movil
    isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    Dialogo(mensaje) {
        const dlg = new Dialogo();
        let o;
        if (typeof mensaje == 'string')
            o = { mensaje: mensaje };
        else
            o = mensaje;
        const tag = dlg.alCargar(o);
        document.querySelector('#root')?.append(tag);
        this.setJappFnd(tag, dlg);
        dlg.alCargado(tag);
    }
    num(cantidad, dec = 0) {
        const n = Number(cantidad);
        return n.toFixed(dec);
    }
    toRes(data) {
        if (data.res == undefined && data.oRes == undefined) {
            data.error = "No existe un resultado en este objeto.";
        }
        else {
            if (data.res == undefined) {
                data['res'] = [];
                for (let i in data.oRes) {
                    const item = data.oRes[i];
                    item[data.key] = i;
                    data.res.push(item);
                }
                delete (data.oRes);
            }
        }
        return data;
    }
    //busca el nodo mas alto dentro de una rama de modulos jappN
    getRoot(el = this) {
        let foco = el;
        while (foco['parent'] != undefined) {
            foco = foco.parent;
        }
        return foco;
    }
}
class Dragger {
    container;
    draggedElement;
    constructor(container) {
        container.classList.add('draggable');
        container.setAttribute('draggable', true);
        this.container = container;
        this.draggedElement = null;
        this.init();
    }
    init() {
        this.container.addEventListener('dragstart', this.onDragStart.bind(this));
        this.container.addEventListener('dragover', this.onDragOver.bind(this));
        this.container.addEventListener('drop', this.onDrop.bind(this));
    }
    onDragStart(event) {
        this.draggedElement = event.target;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', this.draggedElement.outerHTML);
        this.draggedElement.classList.add('dragging');
        console.log(event.dataTransfer);
    }
    onDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }
    onDrop(event) {
        event.preventDefault();
        if (event.target !== this.draggedElement && event.target.classList.contains('droppable')) {
            this.draggedElement.classList.remove('dragging');
            event.target.insertAdjacentHTML('beforebegin', event.dataTransfer.getData('text/html'));
            this.draggedElement.remove();
            this.draggedElement = null;
        }
    }
}
export { $, Dragger };
