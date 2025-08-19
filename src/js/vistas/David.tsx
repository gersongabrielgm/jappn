import React from "../libs/MiReact.js";

class David{
    alCargar(props){
        let var1 = props.edad
        return <div>
            <h1>Hola soy El Módulo David</h1>
            puedo tener {var1} contenido
            <button></button>
        </div>
    }
    
}

export default David