//clase primaria de endpoint local
import Local from "../libs/Local.js";
class Usuario extends Local {
    rutas = {
        "POST": {
            "/Usuario/login": "login"
        }
    };
    async login(url, body) {
        if (body.usuario == "Jesus") {
            if (body.clave == "Laynes")
                return { error: "" };
        }
        return { error: "Datos incorrectos." };
    }
}
export default Usuario;
