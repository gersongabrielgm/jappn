import React from "../libs/MiReact.js";
export default class Noti {
    alCargar() {
        return React.createElement("div", { class: "fpanel" },
            "Notificaciones",
            React.createElement("br", null),
            "Alertas, etc");
    }
}
