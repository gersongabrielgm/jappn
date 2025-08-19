import React from "../libs/MiReact.js";
import JappN, {Dragger} from "../libs/JappN.js";
import {preload} from "../vistas/bin/env.js"

interface JDialogoMsj{
    vprops:any  //propiedaes para el módulo que pueda ser cargado como mensaje
    botones:any  //objeto con nombres de boton y como valor, el retorno para la funcion con el mismo nombre en modulo ejecutor
}

export default class Dialogo{
    el
    _keys=[
        {code:"Escape", fnd:(e)=>this.cerrar()}
    ]

   alCargar(props){
        let botones:any[]=[]
        let btClass=''
        if(props['vprops']==undefined)props['vprops']={}
        //const ctx:any= typeof props['mensaje'] == 'object'?props['mensaje']:(props['bin']!=undefined?props['bin']:undefined)

        //mensaje como contexto 
        //Quiza se deba evaluar jappFnd y jappAcctions
        let mCtx=React.estoEs(props.mensaje)=="class"?React.mkDrv(props.mensaje, props['vprops']):undefined

        //Seteamos el contexto al contexto recibido o en su defecto si recibimos un objeto, ese sera el contexto, si es un mensaje normal, se ignora el contexto
        const ctx:any= props['bin']!=undefined?props['bin']:(mCtx!=undefined?mCtx:undefined)

        //Si hay botones
        if(props['botones'] != undefined){
            //recorrer botones y setear acciones
            for(let i in props['botones']){
                //agregar el boton a la botonera
                botones.push(<button onClick={(e)=>{
                    //oculta la botonera
                    e.target.parentNode.style.display='none'
                    //agrega un preload a la botonera para indicar que esta trabajando
                    this.el.querySelector('._log_').innerHTML='<img src="'+ (preload==""?'css/preload.gif':preload) +'">'

                    if (ctx==undefined) this.regresar(e,props, {error:''})
                    else {
                        //si el contexto No tiene una funcion con el nombre del boton
                        if (ctx[i] == undefined) this.regresar(e, props, {error:''})
                        else {
                            const prop = props['botones'][i]
                            prop['ctx']=this //Devuelve el controlador del dialogo como contexto
                            const resultado = ctx[i](prop) //devuelve las propiedeas del boton por aquello que fuera a un conteto diferente al que lo cargo
                            if (resultado == undefined) this.cerrar()
                            else { 
                                if (resultado['error'] == undefined){
                                    this._alert(e, {error: "Ha ocurrido un error desconocido."})
                                }else if (resultado['error'] != ""){
                                    this._alert(e, resultado)
                                }else{
                                    this.cerrar()
                                }
                            }
                            //analizar respues vacia = todo bien
                            //respuesta como objeto con error, mostrar error
                            //si todo bien cerrar dialogo
                        }
                    }
                }}>{i}</button>)
                btClass="_pie"
            }
        }

        return <div class="_screenDialog">
            <div class={"_Dialogo " + (props.win==undefined?'':props.win)+ " " + btClass } style={props['style']!=undefined?props['style']:''}>
                <div>
                    <label>{props.titulo==undefined?'':props.titulo}</label><button onClick={(e)=>e.target.parentNode.parentNode.parentNode.remove()}>Esc</button>
                </div>
                <div class="_c_">
                    {mCtx!=undefined?mCtx._preCargar(props.vprops):props.mensaje}
                </div>
                {props['botones'] != undefined
                    ?<div class="_pie">
                        <div class="_log_"></div>
                        <div>{botones}</div>
                    </div>
                    :''
                }
            </div>
        </div>
    }

    alCargado(el){
        this.el=el
        const mover =  new Dragger(el)
    }

    //function generica de retorno que busca callBack
    regresar(e, props, retorno){
        if (retorno.error!=''){
            this._alert(e, retorno)
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

    _alert(e, retorno){
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
    }

    cerrar(){
        console.log("cerrando")
        this.el.remove()
    }
}