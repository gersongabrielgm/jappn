import React from "../libs/MiReact.js";
import JappN from "../libs/JappN.js";
import Fichaproducto from "./Fichaproducto.js";

export default class ShowProducto extends JappN{
    alCargar(){
        return <div class="ShowProducto">
            <Fichaproducto />
        </div>
    }

    alCargado(){
        const ref = this.comp('Busqueda')
        if (ref != undefined) ref.aboute()
    }

    alCerrar(){
        return false
    }
}