import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import Rest from "../libs/Rest.js";
import { restDefault } from "./bin/env.js";

export default class SetStock extends JappN{
    alCargar(props){
        const rest = new Rest(restDefault)  

        return <div class="panel">
            <div class="d"><span class="mlink">Agregar Bodega</span></div>
            <h4 class="icon-box"> Existencias:</h4>  
            <table class="tb1 c80p" id="setStockTb">
                <tr><th>Bodega</th><th>Existencia</th><th></th></tr>
                <tr><td>Principal</td><td class="d">0.000</td><td><span class="icon-plus-1"></span></td></tr>
            </table>
        </div> 
    }
}