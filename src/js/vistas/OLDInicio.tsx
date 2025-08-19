import React from '../libs/MiReact.js'
import JappN from '../libs/JappN.js'
import FMenu from '../tools/FMenu.js'
import Info from './Info.js'
import Doc from './Doc.js'
import Detalle from './Detalle.js'
import Noti from './Noti.js'
import Buscarprod from './Buscarprod.js'
import Producto from './Producto.js'
import Kanban from '../tools/Kanban.js'
import JLogin from '../tools/JLogin.js'
import JTabs from '../tools/JTabs.js'

export default class Fact extends JappN{
    alCargar(){
        return <div class="row">
                <div class="col c4"></div>
                <div class="col c4">
                    <JLogin vista={<Producto />} />
                </div>
                <div class="col c4"></div>
            </div>

        const res=[
            {tab:"Car", contenido: <div>
                <h3>Mi carro</h3>
                123.32 - 32.33 - 444.0
            </div> , icono:"icon-truck", sel:true},
            {tab:"Mi tab", contenido:"Contenido", icono:"icon-user"},
            {tab:"Tu tab", contenido:"Contenido de tu tab", icono:"icon-monitor"}
        ]

        return <Kanban>
            <div nombre="Pendientes">
                <div><span>Uno</span></div>
                <div><span>Dos</span></div>
                <div><span>Tres</span></div>
            </div>
            <div nombre="En Proceso">
                <div>Cuatro</div>
                <div>Cinco</div>
                <div>Seis</div>
                <div>Siete</div>
                <div>Ocho</div>
            </div>
            <div nombre="Terminadas">
                <div>Nada</div>
                <div>Todos</div>
                <div>Algo</div>
            </div>
            <div nombre="Entregadas">
                <div>Naranjas</div>
                <div>Verdes</div>
                <JTabs res={res} mini={true} />
            </div>
        </Kanban>


        return <div class="row">
            <div class="col c12">
                <div class="panel" id="header">
                    <h1 class="icon-cart"> Punto de venta.</h1>
                </div>
            </div>
            <div class="col c3">
                <div class="panel">
                    <span class="jap_colap">Información</span>
                    <Info />
                </div>
            </div>
            <div class="col c5">
                <div class="panel">
                    <span class="jap_colap">Detalle</span>
                    <Detalle />
                </div>
            </div>
            <div class="col c4">
                <span class="jap_colap">Documento</span>
                <Doc />
                <span class="jap_colap">Notificaciones</span>
                <Noti bin={this} />
            </div>
            <FMenu 
                data={[
                    [
                        {nombre:'Buscar Producto', fnd:()=>{
                            this.buscar()
                            this.comp('Info').selTab('Producto')
                        }},
                        {nombre:'Cliente', fnd:()=>this.comp('Info').selTab('Clientes')},
                        {nombre:'Escanear', fnd:()=>this.$('#code')[0].focus()},
                        {nombre:'New Producto', fnd:()=>this.newProducto()},
                        {nombre:'New Producto', fnd:()=>this.newProducto()},
                        {nombre:'New Producto', fnd:()=>this.newProducto()},
                        {nombre:'New Producto', fnd:()=>this.newProducto()},
                        {nombre:'New Producto', fnd:()=>this.newProducto()},
                        {nombre:'New Producto', fnd:()=>this.newProducto()},
                        
                    ],
                    /*
                    [
                        {nombre:'Cliente', fnd:()=>this.comp('Info').selTab('Clientes')},
                        {nombre:'Escanear', fnd:()=>this.$('#code')[0].focus()},
                        {nombre:'Buscar Producto', fnd:()=>{
                            this.buscar()
                            this.comp('Info').selTab('Producto')
                        }},
                    ]*/
                ]}
            />
        </div>
    }

    alCargado(){
        
    }

    newProducto(){

        this.Dialogo({ 
            //bin:this  //contexto de respuesta
            mensaje:Producto,
            vprops:{bin:this}, //propiedaes para la vista de contenido
            win:"full", 
            titulo:"Ficha de Producto",
            botones:{
                Guardar:{}, 
                Cancelar:{}
            }
        })
    }

    buscar(){
        this.Dialogo({
            mensaje:<Buscarprod bin={this}/>, 
            win:"medio", 
            titulo:"Buscar Producto",
            botones:{
                Aceptar:{nombre:"a"},
                Cancelar:{}
            },
            callBack:(data)=>{
                console.log(data)
            }
        })
    }

    rmenu(){
        console.log('retorno del Fmenu')
    }

    Guardar(...e){
        console.log("INICIO")
        console.log(e)
        //e[0].ctx.cerrar()
    }
}