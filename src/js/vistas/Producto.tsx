import React from "../libs/MiReact.js";
import MetaSelect from "../tools/basicos/MetaSelect.js";
import Texto from "../tools/basicos/Texto.js";
import Imgset from "../tools/basicos/Imgset.js";
import Input from "../tools/basicos/Input.js";
import SetPrecio from "./SetPrecio.js";
import SetStock from "./SetStock.js";
import JappN from "../libs/JappN.js";

export default class Producto extends JappN{
    local:boolean=false

    alCargar(props){
        return <div class="row">
            <div class="col c1"></div>
            <div class="col c4">
                <div class="panel">
                    <p>
                        <Input etiqueta="Producto:" id="nombre"/>
                    </p>
                    <p>
                        <Texto etiqueta="Descripción:" id="descripcion"/>
                    </p>
                    <p>
                        <MetaSelect 
                            criterio="nombre"
                            form={<Input id="nombre" class="_campo" placeHolder="Nombre de la nueva marca." etiqueta="Nueva Marca:" />}
                            etiqueta="Marca:" 
                            endpoint="/Marca" 
                        />
                    </p>
                    <p>
                        <Imgset talla="200px" etiqueta="Foto:" src="css/foto.png"/>
                    </p>
                </div>
            </div>
            <div class="col c1"></div>
            <div class="col c5">
                <div class="panel">
                    <div class="jsx_VAcordion" style="height:calc(100vh - 150px)">
                        <div nombre=" Precios:" icono="icon-money" class="sel">
                            <SetPrecio id={props.id}  />
                        </div>
                        <div nombre="Existencias:" icono="icon-box" class="sel">
                            <SetStock />
                        </div>
                        {/*<div nombre="Caracteristicas:" icono="icon-list" class="sel">

                        </div>*/}
                    </div>
                </div>
            </div>
        </div>
    }

    alCargado(el,props){
        el['Guardar']=(data, cb)=>{
            cb({error:''})
        }
    }

    alCerrar(){
        return false
    }

    Guardar(...e){
        console.log(this)


        //cerrar dialogo
        e[0].ctx.cerrar()
    }
}