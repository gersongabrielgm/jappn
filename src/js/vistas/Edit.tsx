import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";

export default class Edit extends JappN{
    alCargar (props){
        return <div>
            <input type="text" value="8" />
            <button>Guardar</button>
        </div>
    }
}