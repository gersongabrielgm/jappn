import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import Rest from "../libs/Rest.js";
import { restDefault } from "./bin/env.js";

export default class SetPrecio extends JappN{
    alCargar(props){
        const rest = new Rest(restDefault)  

        return <div class="panel">
            <div class="d"><span class="mlink">Agregar Nueva Lista</span></div>
            <h4 class="icon-money"> Precios:</h4>  
            <table class="c80p tb1">
                <tr><th style="width:60%">Nombre</th><th>Precio</th></tr>
                <tr><td>Normal</td><td><input style="text-align: right;"  type="number" value="10.00"/></td></tr>
            </table>
        </div> 
    }

    alCargado(){
    }
}