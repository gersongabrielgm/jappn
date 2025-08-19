export default class Hilo {
    drv;
    constructor(tag, props, drv) {
        tag['hilo'] = (...e) => {
            if (drv['alHilo'] == undefined) {
                this.drv = drv;
                //si es un tagHTML devolvemos MiReact
                if (e[2] instanceof Array)
                    e[2] = this.render(e[2]);
                return drv.createElement(e[0], e[1], e[2]);
            }
            else {
                //Si es un componente devolvemos el resultado de alHilo
                drv['alHilo'](...e);
            }
        };
    }
    render(e) {
        return e.map(i => {
            if (i[2] != undefined) {
                if (i[2] instanceof Array)
                    i[2] = this.render(i[2]);
            }
            return this.drv.createElement(i[0], i[1], i[2]);
        });
    }
}
