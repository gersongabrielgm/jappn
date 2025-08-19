//clase primaria de endpoint local
import Local from "../libs/Local.js";
import Dbase from "../libs/dBase.js";
class Marca extends Local {
    rutas = {
        "GET": {
            "/Marca/llave": () => { return { error: "", llave: "bod_marca_id" }; }, //obtiene la llave primaria del registro para metaSelect
            "/Marca/active": "getMarcasActivas" //obtiene las marcas activas
        },
        "POST": {
            "/Marca": "Crear" //fabrica un registro de marca desde metaselect
        },
        "PUT": {}
    };
    async Crear(parts, body) {
        const id = await Dbase.nextno("bod_marca");
        body['bod_marca_id'] = id;
        const retorno = await Dbase.create('bod_marca', body);
        return { error: '', id: id, valor: body.nombre };
    }
    async getMarcasActivas(parts, body) {
        const res = await Dbase.readAll('bod_marca');
        return { error: "", res: res };
    }
}
export default Marca;
