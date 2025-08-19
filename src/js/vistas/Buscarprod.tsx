import React from "../libs/MiReact.js";
import Rest from "../libs/Rest.js";


export default class Buscarprod{
    bin
    el
    alCargar(props){
        this.bin=props['bin']
        return <div id="BuscarProducto">
            <div class="row">
                <div class="col c1"></div>
                <div class="col c6">
                    <input 
                        style="width:calc(100% - 50px)" 
                        type="search" 
                        placeholder="Producto a buscar..."
                    /><button 
                        class="icon-search" 
                        onClick={()=>this.buscar()}>
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col c1"></div>
                <div class="col c10">
                    <div style="margin-top:10px">
                        <table class="f">
                            <tr>
                                <th>Nombre</th><th>Marca</th><th style="width:30px">Cant</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
                
        </div>
    }

    alCargado(el){
        this.el=el
        const input:any = el.querySelector("input")
        //input.focus()
        setTimeout(()=>input.focus(), 1)

        el['Aceptar']=(props, callBack)=>{
            setTimeout( ()=>callBack({error:'No es posible crear en nuevo registro.', res:[1,2,3,2,1]}), 3000)  
        }
    }

    buscar(){
        const entrada=this.el.querySelector("input")
        const criterio = entrada.value
        const rest = new Rest()
        rest.local=true

        rest.get('/Producto/criterio/'+criterio)
        .then(data=>{
            console.log(data)
        })
    }
}