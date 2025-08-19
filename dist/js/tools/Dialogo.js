import React from "../libs/MiReact.js";
import { Dragger } from "../libs/JappN.js";
import { preload } from "../vistas/bin/env.js";
export default class Dialogo {
    el;
    _keys = [
        { code: "Escape", fnd: (e) => this.cerrar() }
    ];
    alCargar(props) {
        let botones = [];
        let btClass = '';
        if (props['vprops'] == undefined)
            props['vprops'] = {};
        //const ctx:any= typeof props['mensaje'] == 'object'?props['mensaje']:(props['bin']!=undefined?props['bin']:undefined)
        //mensaje como contexto 
        //Quiza se deba evaluar jappFnd y jappAcctions
        let mCtx = React.estoEs(props.mensaje) == "class" ? React.mkDrv(props.mensaje, props['vprops']) : undefined;
        //Seteamos el contexto al contexto recibido o en su defecto si recibimos un objeto, ese sera el contexto, si es un mensaje normal, se ignora el contexto
        const ctx = props['bin'] != undefined ? props['bin'] : (mCtx != undefined ? mCtx : undefined);
        //Si hay botones
        if (props['botones'] != undefined) {
            //recorrer botones y setear acciones
            for (let i in props['botones']) {
                //agregar el boton a la botonera
                botones.push(React.createElement("button", { onClick: (e) => {
                        //oculta la botonera
                        e.target.parentNode.style.display = 'none';
                        //agrega un preload a la botonera para indicar que esta trabajando
                        this.el.querySelector('._log_').innerHTML = '<img src="' + (preload == "" ? 'css/preload.gif' : preload) + '">';
                        if (ctx == undefined)
                            this.regresar(e, props, { error: '' });
                        else {
                            //si el contexto No tiene una funcion con el nombre del boton
                            if (ctx[i] == undefined)
                                this.regresar(e, props, { error: '' });
                            else {
                                const prop = props['botones'][i];
                                prop['ctx'] = this; //Devuelve el controlador del dialogo como contexto
                                const resultado = ctx[i](prop); //devuelve las propiedeas del boton por aquello que fuera a un conteto diferente al que lo cargo
                                if (resultado == undefined)
                                    this.cerrar();
                                else {
                                    if (resultado['error'] == undefined) {
                                        this._alert(e, { error: "Ha ocurrido un error desconocido." });
                                    }
                                    else if (resultado['error'] != "") {
                                        this._alert(e, resultado);
                                    }
                                    else {
                                        this.cerrar();
                                    }
                                }
                                //analizar respues vacia = todo bien
                                //respuesta como objeto con error, mostrar error
                                //si todo bien cerrar dialogo
                            }
                        }
                    } }, i));
                btClass = "_pie";
            }
        }
        return React.createElement("div", { class: "_screenDialog" },
            React.createElement("div", { class: "_Dialogo " + (props.win == undefined ? '' : props.win) + " " + btClass, style: props['style'] != undefined ? props['style'] : '' },
                React.createElement("div", null,
                    React.createElement("label", null, props.titulo == undefined ? '' : props.titulo),
                    React.createElement("button", { onClick: (e) => e.target.parentNode.parentNode.parentNode.remove() }, "Esc")),
                React.createElement("div", { class: "_c_" }, mCtx != undefined ? mCtx._preCargar(props.vprops) : props.mensaje),
                props['botones'] != undefined
                    ? React.createElement("div", { class: "_pie" },
                        React.createElement("div", { class: "_log_" }),
                        React.createElement("div", null, botones))
                    : ''));
    }
    alCargado(el) {
        this.el = el;
        const mover = new Dragger(el);
    }
    //function generica de retorno que busca callBack
    regresar(e, props, retorno) {
        if (retorno.error != '') {
            this._alert(e, retorno);
            /*
            const alerta = <div style="padding:15px">
                <i class="icon-cancel-circled" onClick={()=>{
                    clearInterval(a)
                    clearInterval(r)
                    this.el.querySelector('._log_').innerHTML=''
                    e.target.parentNode.style.display='inline-block'
                }}> Advertencia: {retorno.error}</i>
                &nbsp;&nbsp;<span class="_clock_">15</span>
            </div>

            this.el.querySelector('._log_').innerHTML=""
            this.el.querySelector('._log_').append(alerta)
            const r=setInterval(()=>{
                const t=this.el.querySelector("._clock_")
                t.innerHTML = Number(t.innerHTML)-1
            }, 1000)
            
            const a=setTimeout(()=>{
                clearInterval(r)
                this.el.querySelector('._log_').innerHTML=''
                e.target.parentNode.style.display='inline-block'
            }, 15000)
        }else{
            if (props['callBack'] != undefined) {
                const cb={retorno:retorno,evento:e,contenido:this.el.querySelector('._c_')}
                props['callBack'](cb)
                this.cerrar()
            }else{
                this.cerrar()
            }
        */
        }
    }
    _alert(e, retorno) {
        const alerta = React.createElement("div", { style: "padding:15px" },
            React.createElement("i", { class: "icon-cancel-circled", onClick: () => {
                    clearInterval(a);
                    clearInterval(r);
                    this.el.querySelector('._log_').innerHTML = '';
                    e.target.parentNode.style.display = 'inline-block';
                } },
                " Advertencia: ",
                retorno.error),
            "\u00A0\u00A0",
            React.createElement("span", { class: "_clock_" }, "15"));
        this.el.querySelector('._log_').innerHTML = "";
        this.el.querySelector('._log_').append(alerta);
        const r = setInterval(() => {
            const t = this.el.querySelector("._clock_");
            t.innerHTML = Number(t.innerHTML) - 1;
        }, 1000);
        const a = setTimeout(() => {
            clearInterval(r);
            this.el.querySelector('._log_').innerHTML = '';
            e.target.parentNode.style.display = 'inline-block';
        }, 15000);
    }
    cerrar() {
        console.log("cerrando");
        this.el.remove();
    }
}
