import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
import JTabs from "../tools/JTabs.js";
import ShowProducto from "./ShowProducto.js";
export default class Info extends JappN {
    nodos = [];
    alCargar(props) {
        return React.createElement("div", { class: "fpanel", id: "pv_info" },
            React.createElement(JTabs, { mini: false, id: "myTabs", forceOpen: true, onOpen: (e, tag) => this.openInfo(e, tag) },
                React.createElement("div", { tab: "Producto", icon: "icon-photo", sel: true },
                    React.createElement(ShowProducto, null)),
                React.createElement("div", { tab: "Clientes", icon: "icon-user-o" })));
    }
    openInfo(e, tag) {
        console.log(tag.getAttribute('tab'));
    }
    selTab(tab) {
        this.nodos[1].selTab(tab);
    }
}
