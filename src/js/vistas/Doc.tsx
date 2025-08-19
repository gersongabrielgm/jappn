import JappN from "../libs/JappN.js";
import React from "../libs/MiReact.js";

export default class Doc extends JappN{
    alCargar(){
        return <table id="pv_board" class="frm">
            <tr>
                <th class="i  icon-doc"> Tipo Docu</th><td>Venta</td>
            </tr><tr>
                <th class="i icon-wpforms"> NIT / CUI</th><td>CF</td>
            </tr><tr>
                <th class="i icon-user-o"> Cliente</th><td>Consumidor Final</td>
            </tr><tr>
                <th class="i icon-globe-3"> Dirección</th><td>Ciudad</td>
            </tr><tr>
                <th class="i icon-phone"> Teléfono</th><td style="border-bottom:3px double gray"></td>
            </tr><tr>
                <th class="i icon-basket"> Total</th><td class="d">0.00</td>
            </tr><tr>
                <th class="i icon-money"> Descuento</th><td class="d">0.00</td>
            </tr><tr>
                <th class="i icon-money"> Sub total</th><td class="d">0.00</td>
            </tr><tr>
                <th class="i icon-money"> Pago</th><td class="d">0.00</td>
            </tr><tr>
                <th class="i icon-money">  Saldo</th><td class="d">0.00</td>
            </tr>
        </table>
    }
}