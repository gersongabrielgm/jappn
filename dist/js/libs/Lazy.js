//import JappN from "./JappN.js";
import React from "./MiReact.js";
class Lazy {
    timeout = 10000;
    timer;
    //retorna el contenido renderizado 
    importar(url, props = {}) {
        return new Promise((bien, mal) => {
            import(url).then((data) => {
                const es = React.estoEs(data.default);
                if (es == 'class') {
                    if (data.default.__proto__.name == 'JappM') { //Si es instancia de JappM
                        //OBJS render directo React.Crear(new data.default().alCargar(props), this.ref, { cls: true });
                        // let vista= new data.default().alCargar(props)
                        // bien( vista )
                        bien(data.default);
                        clearInterval(this.timer);
                    }
                    else { //si es una clase cualqueira
                        bien(data.default);
                        clearInterval(this.timer);
                    }
                }
                else if (es == 'function') {
                    let vista = data.default(props);
                    let nombre = null; //vista.getAttribute('nombre')
                    bien(vista);
                    clearInterval(this.timer);
                }
                else {
                    bien(data.default);
                    clearInterval(this.timer);
                }
            });
        });
    }
    limpiarCache(ob = {}) {
        const llaves = Object.keys(ob);
        if (llaves.length == 0)
            localStorage.lazyCache = "[]";
        else {
            if (ob.fnd != undefined) {
                let cache = JSON.parse(localStorage.lazyCache);
                for (var i = cache.length - 1; i > -1; i--) {
                    if (cache[i].fnd == ob.fnd) {
                        cache.splice(i, 1);
                    }
                }
                localStorage.lazyCache = JSON.stringify(cache);
                cache = globalThis.lazyCache;
                for (var i = cache.length - 1; i > -1; i--) {
                    if (cache[i].fnd == ob.fnd) {
                        cache.splice(i, 1);
                    }
                }
            }
        }
    }
}
export default Lazy;
