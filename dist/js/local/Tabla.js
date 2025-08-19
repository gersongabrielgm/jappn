//clase primaria de endpoint local
import Local from "../libs/Local.js";
import Dbase from "../libs/dBase.js";
class Tabla extends Local {
    rutas = {
        "GET": {
            "/Tabla/esquema/:tabla": "getEsquema"
        },
        "POST": {},
        "PUT": {}
    };
    async getEsquema(parts, body) {
        const reg = await Dbase.readFirst(parts[3]);
        //dbInit
        return { error: "", item: Object.keys(reg) };
    }
}
export default Tabla;
