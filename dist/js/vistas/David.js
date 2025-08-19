import React from "../libs/MiReact.js";
class David {
    alCargar(props) {
        let var1 = props.edad;
        return React.createElement("div", null,
            React.createElement("h1", null, "Hola soy El M\u00F3dulo David"),
            "puedo tener ",
            var1,
            " contenido",
            React.createElement("button", null));
    }
}
export default David;
