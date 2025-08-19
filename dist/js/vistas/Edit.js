import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
export default class Edit extends JappN {
    alCargar(props) {
        return React.createElement("div", null,
            React.createElement("input", { type: "text", value: "8" }),
            React.createElement("button", null, "Guardar"));
    }
}
