import React from "../libs/MiReact.js";
import nSocket from '../libs/NSocket.js'

export default class Detalle{
    alCargar(props){
        return <div class="c">
            <div id="pv_detalle"></div>
            <input type="text" id="code"/>
            <button class="icon-search" onClick={(e)=>this.buscar(e)}></button>

        </div>
    }

    buscar(e){
        const txt=e.target.parentNode.querySelector('input')
        console.log(txt)
        nSocket.conectar(txt.value)
    }
}