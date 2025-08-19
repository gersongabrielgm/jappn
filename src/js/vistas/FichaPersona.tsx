import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import Caracteristica from "./Caracteristica.js";

export default class FichaPersona extends JappN{

    alCargar(props){
        return <div class="fpanel" id="pv_fichapersona">
            <h3>Ficha de persona</h3>
            <div class="row">
                <div class="col c4 i">
                    <img id="fp_foto" src="" style="max-width:100%"/>
                    <input type="file" accept="image/*" onChange={(e)=>this.cargarImagen(e)} />
                </div>
                <div class="col c8">
                    <table class="frm">
                        <tr><th>Nombre</th><td><input type="text" id="fp_nombre"/></td></tr>
                        <tr><th>Apellido</th><td><input type="text" id="fp_apellido"/></td></tr>
                        <tr><th>Estado civil</th><td>
                            <select id="fp_estado">
                                <option value="Casado">Casado</option>
                                <option value="Soltero">Soltero</option>
                                <option value="Divorciado">Divorciado</option>
                                <option value="Viudo">Viudo</option>
                            </select>
                        </td></tr>
                    </table>
                </div>
            </div>
            <div>
                <h4>Características</h4>
                <table class="frm" id="fp_caracteristicas"></table>
                <button onClick={()=>this.agregarCaracteristica()}>Agregar característica</button>
            </div>
        </div>;
    }

    alCargado(el){
        this.el = el;
    }

    cargarImagen(e){
        const input:any = e.target;
        const file = input.files && input.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = (ev)=>{
                const img:any = this.el.querySelector("#fp_foto");
                img.src = ev.target.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    agregarCaracteristica(){
        const tabla:any = this.el.querySelector("#fp_caracteristicas");
        tabla.append(<Caracteristica />);
    }
}
