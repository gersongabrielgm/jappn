import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";

class Fichaproducto extends JappN{
    alCargar(props){
        
        return <div>
            <h3>Nombre del producto</h3>
            <div class="col c6 i">
                <img src="css/foto.jpg" />
            </div>
            <div class="col c6">
                Listas:<br/>
                <select id="bod_lista_id" style="width:100%"></select>
            </div>
            <div>
                <table class="frm">
                    <tr><th>campo</th><td>Valor</td></tr>
                    <tr><th>campo</th><td>Valor</td></tr>
                    <tr><th>campo</th><td>Valor</td></tr>
                    <tr><th>campo</th><td>Valor</td></tr>
                    <tr><th>campo</th><td>Valor</td></tr>
                </table>
            </div>
        </div>
    }

    alCargado(el){
        
    }

    aboute(){
        console.log("Yo soy aboute")
    }
}

export default Fichaproducto