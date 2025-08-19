import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";
export default class Doc extends JappN {
    alCargar() {
        return React.createElement("table", { id: "pv_board", class: "frm" },
            React.createElement("tr", null,
                React.createElement("th", { class: "i  icon-doc" }, " Tipo Docu"),
                React.createElement("td", null, "Venta")),
            React.createElement("tr", null,
                React.createElement("th", { class: "i icon-wpforms" }, " NIT / CUI"),
                React.createElement("td", null, "CF")),
            React.createElement("tr", null,
                React.createElement("th", { class: "i icon-user-o" }, " Cliente"),
                React.createElement("td", null, "Consumidor Final")),
            React.createElement("tr", null,
                React.createElement("th", { class: "i icon-globe-3" }, " Direcci\u00F3n"),
                React.createElement("td", null, "Ciudad")),
            React.createElement("tr", null,
                React.createElement("th", { class: "i icon-phone" }, " Tel\u00E9fono"),
                React.createElement("td", { style: "border-bottom:3px double gray" })),
            React.createElement("tr", null,
                React.createElement("th", { class: "i icon-basket" }, " Total"),
                React.createElement("td", { class: "d" }, "0.00")),
            React.createElement("tr", null,
                React.createElement("th", { class: "i icon-money" }, " Descuento"),
                React.createElement("td", { class: "d" }, "0.00")),
            React.createElement("tr", null,
                React.createElement("th", { class: "i icon-money" }, " Sub total"),
                React.createElement("td", { class: "d" }, "0.00")),
            React.createElement("tr", null,
                React.createElement("th", { class: "i icon-money" }, " Pago"),
                React.createElement("td", { class: "d" }, "0.00")),
            React.createElement("tr", null,
                React.createElement("th", { class: "i icon-money" }, "  Saldo"),
                React.createElement("td", { class: "d" }, "0.00")));
    }
}
