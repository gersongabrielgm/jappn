import Dbase from "../libs/dBase.js";
import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import Edit from "./Edit.js";

export default  class List extends JappN{
    alCargar(props){
        return <table></table>
    }

    alCargado(elemento, props){
        Dbase.readAll(props.almacen)
        .then((data:any)=>{
            const llaves = Object.keys(data[0])
            
            elemento.append( <tr>
                <th>NO</th>{ 
                    llaves.map(i=><th>{ 
                        i != props.almacen+"_id" ? i.toUpperCase() : "" 
                    }</th>) 
                }
            </tr> )

            for(let i=0; i<data.length;i++){
                const registros =[]
                
                for(let r in data[i]){
                    const cont = data[i][r]
                    const llavePrimaria = props.almacen+"_id"
                    const elBoton =<button onClick={()=>this.edit(cont)}>Editar</button>

                    const valor = r == llavePrimaria? elBoton: cont
                    registros.push( valor )
                }

                elemento.append(<tr>
                    <th>{i+1}</th>{ 
                        registros.map(i=><td>{i}</td>) 
                    }
                </tr>)
            }

        })
    }

    edit(id){
        //console.log(this)
        this.Dialogo({mensaje:<Edit />})
    }

}


