import JappN from "./JappN.js" //se importa no para construirlo, solo para validador de tipo de instancia
import {buffer} from "../vistas/bin/env.js"
import NoPermiso from "../tools/NoPermiso.js"
/*  Progamado por Jesus Laynes Mayo 2024 */


class MiReact {
    Us=0
    UsRol=0
    noPermiso = new NoPermiso()

    buffer:any[]
    public Cargar(el, add=false){
        //No es posible el evento alCerrar

        let rot:any
        rot = document.querySelector("#root")
        if (!add) rot.innerHTML=""
        rot.append(el)
    }

    //se encarga de fabricar la herencia de un componente tipo jappN 
    public mkDrv(jsxClass, props={}){

        if (props==null)props ={}
        const drv = new jsxClass()
        drv.nombre = jsxClass.name
        drv['_props']=props
        
        //if(jsxClass.name!=undefined && drv instanceof JappN){
        if(jsxClass.name!=undefined){
            if (buffer.length > 0){
                const padre = buffer[buffer.length-1]
                
                //console.log("padre: ", padre.nombre)
                //console.log("clase nueva: ",jsxClass.name)
                drv.parent = padre
                padre.nodos.push(drv)

            }
            if (props['bin'] != undefined && drv.parent == undefined)
                drv.parent=props['bin']
        
            drv['core']=this
            buffer.push(drv)
        }
        if (drv['_permiso']!=undefined){
            let permiso=false
            if (drv._permiso['rol']!=undefined){
                if (drv._permiso.rol.indexOf(this.UsRol) > -1) permiso=true
            }
            if (drv._permiso['usuario']!=undefined){
                if (drv._permiso.usuario.indexOf(this.Us) > -1) permiso=true
            }
            if (!permiso){
                this.noPermiso.tipo=drv._permiso['tipo']==undefined?0:drv._permiso['tipo']
                return this.noPermiso
            }
        }

        return drv
    }


    public readonly estoEs=(func:any)=>{
        if (typeof func === 'function') {
            if (/^class\s/.test(Function.prototype.toString.call(func))) return 'class';
            else return 'function';
        }
    
        if ( func.tagName != undefined ) return func.tagName
        if (typeof func == 'object' && func instanceof JappN) return "jappObj"
        return typeof func;
    }

    protected jsx=(clase, props={}, ...hijos)=>{
        return this.createElement(clase, props, ...hijos)
    }

    //Agregar un modulo dentro de un elemento HTML ya creado en el DOM
    append(mod, el){
        el.append(this.createElement(mod,{}))
    }


    //Funcion que React llama para renderiza un JSX
    createElement<Node>(jsx, props, ...children){ 

        if (props===null) props={}
        if (props==undefined) props={}

        let tag //Nuevo elemento HTML
        let drv:any  //componente heredado de JappN
        if (typeof jsx == "string"){
            tag = document.createElement(jsx)
            this.setPropiedades(tag, props) 

            this.jsxAccion(tag, props, this)

        } else { //es un componente o funcion o array
            if (this.estoEs(jsx) == 'function'){
                const tags = jsx(props, [...children])
                return tags
            }

            drv = this.mkDrv(jsx, props)

            tag = drv['_preCargar']!=undefined?drv['_preCargar'](props, children):drv.alCargar(props, [...children])
            //funciones jsx
            if (props['class']!=undefined){
                if (props['class'].indexOf('jsx_') != -1 ){
                    tag.classList.add(props['class'])
                    tag.id = props['id']
                    this.jsxAccion(tag, props, drv)
                }
            }

            arguments[2]=null
            if (drv['setJappFnd'] != undefined) drv['setJappFnd'](tag)
            
            //buffer.pop()

        }
       
        //Cargamos recursivamente el contenido del elmento si no es un componente Japp
        if (arguments[2] != null){
            for (let i = 2; i < arguments.length; i++) {
                let child = arguments[i];

                if ( child instanceof Array){
                    child.map((x:any) => tag.append(x));
                } else {
                    if (typeof child == 'string') tag.insertAdjacentHTML('beforeend', child);
                    else if (child != undefined) tag.appendChild(child.nodeType == null ? document.createTextNode(child.toString()) : child);
                }
            }
        }

        //si es un componente y posee alCargado
        if (drv != undefined) {
            if (drv['_preCargado']!=undefined){
                drv['_preCargado'](tag,props)
            }else{
                if (drv.alCargado!= undefined) drv.alCargado(tag, props)
            }
            if(drv['_rendered']!= undefined) drv._rendered(tag, props)
            
            //if(jsx.name!=undefined && drv instanceof JappN ){
            if(jsx.name!=undefined){
                buffer.pop().nombre
            }
        }

        return tag 
    }

    //Agrega las propiedades a los elementos HTML generados desde JSX
    private setPropiedades(element, props){
        for (let name in props) {
            switch (name) {
                case 'onBlur': element.onblur = (e:any) => props[name](e); break
                case 'onKeyDown': element.onkeydown = (e:any) => props[name](e); break
                case 'onLoad': props[name](element); break
                case 'onMouseUp': element.onmouseup = (e:any) => props[name](e); break
                case 'onMouseMove': element.onmousemove = (e:any) => props[name](e); break
                case 'onMouseOver': element.onmouseover = (e:any) => props[name](e); break
                case 'onMouseOut': element.onmouseout = (e:any) => props[name](e); break
                case 'onTouchStart': element.ontouchstart = (e:any) => props[name](e); break
                case 'onTouchMove': element.ontouchmove = (e:any) => props[name](e); break
                case 'onTouchEnd': element.ontouchend = (e:any) => props[name](e); break
                case 'onDragEnter': element.ondragenter = (e:any) => props[name](e); break
                case 'onDragLeave': element.ondragleave = (e:any) => props[name](e); break
                case 'onChange': element.onchange = (e:any) =>props[name](e); break
                case 'onDrop': element.ondrop = (e:any) => props[name](e); break
                case 'onDragEnd': element.ondragend = (e:any) => props[name](e); break
                case 'onDragStart': element.ondragstart = (e:any) => props[name](e); break
                case 'onDrag': element.ondrag = (e:any) => props[name](e); break
                case 'onClick':
                case 'onDClick':
                    element.style.cursor="pointer"
                    var p1:any=[0,0],p2:any=[0,0];
                    if (name == 'onDClick'){
                         //prevenimos click al momento de a¿hacer drag
                         element.onmousedown = (e:any)=> {
                            if (e.type == 'touchstart') {
                                p1 = [e.touches[0].clientX, e.touches[0].clientX]
                              } else {
                                p1 = [e.clientX, e.clientY]
                              }
                        }

                        element.onmouseup = (e:any)=> {
                            if (e.type == 'touchsend') {
                                p2 = [e.touches[0].clientX, e.touches[0].clientX]
                              } else {
                                p2 = [e.clientX, e.clientY]
                              }
                        }
                    }

                    element.onclick = (e:any) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const b = e.target;
                        const click = b.getAttribute('click') ? true : false;
                        const lock = b.getAttribute('lock') ? b.getAttribute('lock') : false;
                        if (b.onclick == null && !click) return; //evita el click en objetos que no tienen evento click
                        if (lock) return; //evita el click en objetos que no tienen evento click
                        const especial = (b.classList.contains('fullScreen') || b.classList.contains('dialogo'));

                        if ( p1[0]!=p2[0] || p1[1]!=p1[1]){
                            console.log("Click bloqueado por DClick");
                            return;
                        }

                        if (b.classList.contains('bloqueado')) {
                            console.log("Prohibido el doble click");
                            return;
                        } else if (!especial) {
                            b.classList.add('bloqueado');
                            b.style.enabled = false;
                            setTimeout(() => {
                                const t = props[name](e);
                                b.style.enabled = true;
                                b.classList.remove('bloqueado');
                            }, 200);
                        } else {
                            props[name](e);
                        }
                    }
                    
                    break
                case 'onKeyUp': element.onkeyup = props[name]; break
                case 'onKeyPress': element.onkeypress = props[name]; break
                default:
                    if (name && props.hasOwnProperty(name)) {
                        let value = props[name];
                        if (value === true) {
                            element.setAttribute(name, name);
                        } else if (value !== false && value != null) {
                            element.setAttribute(name, value.toString());
                        }
                    }
                break
            }
        }
    }

    jsxAccion(tag, props, drv:any){
        //prefijo para eventos jsx (extensiones para jsx de carga dinamica)
        if ( tag.className.indexOf('jsx_') != -1){
            this.doExtension(tag, props, drv, tag.classList)
            /*
            const ext = tag.className.substring(4)
            try{
                import(`./react_exts/${ext}.js`)
                .then(modulo => {
                    const plug = new modulo.default(tag, props, drv)
                })
                .catch(error => {
                    console.error('Error al importar el módulo:', error);
                });
            }catch(e){
                console.log(e)
            }
            */
        }
    }

    doExtension(tag, props, drv, list){
        for (let i=0;i<list.length; i++){
            const cl = list[i]
            if (cl.substring(0,4) == 'jsx_'){
                const ext = cl.substring(4)
                try{
                    import(`./react_exts/${ext}.js`)
                    .then(modulo => {
                        const plug = new modulo.default(tag, props, drv)
                    })
                    .catch(error => {
                        console.error('Error al importar el módulo:', error);
                    });
                }catch(e){
                    console.log(e)
                }
            }
        }
    }

    //compara dos objetos
    obCompare(ob1, ob2){
        const key1 = Object.keys(ob1)
        const key2 = Object.keys(ob2)
        if (key1.length != key2.length) return false

        for(let i in ob1){
            if (ob1[i] != ob2[i]) return false
        }
        return true
    }
}

const React = new MiReact()
export default React;