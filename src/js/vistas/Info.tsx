import JappN from "../libs/JappN.js"
import React from "../libs/MiReact.js"
import nSocket from "../libs/NSocket.js"
import JTabs from "../tools/JTabs.js"
import ShowProducto from "./ShowProducto.js"

export default class Info extends JappN{
    nodos:any[]=[]

    alCargar(props){
        return <div class="fpanel" id="pv_info">
            <JTabs mini={false} id="myTabs" forceOpen={true} onOpen={(e,tag)=>this.openInfo(e,tag)}>
                <div tab="Producto"  icon="icon-photo" sel>
                    <ShowProducto />
                </div>
                <div tab="Clientes" icon="icon-user-o"></div>
            </JTabs>
        </div> 
    }

    openInfo(e, tag){
        console.log(tag.getAttribute('tab'))
    }  

    selTab (tab:string){
        this.nodos[1].selTab(tab)
    }
}