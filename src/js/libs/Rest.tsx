//import { Storage } from 'types';

//archivo de configuracion general
import Config from "../Config.js"
//datos de configuracion del proyecto
import appConfig from "../vistas/bin/env.js"
import LocalServer from "./LocalServer.js"

export default class Rest{
    appusuario_id:number=0
    restServer:string
    restSchema:string
    restNamespace:string
    restVersion:string
    restToken:string
    restRef:HTMLElement
    local:number|boolean=false
    localServer:any
    mudo:boolean=false
    superReq:boolean=false
    

    constructor(cfg={}){
        if ( cfg['superReq'] != undefined ) this.superReq = cfg['superReq']
        //validar si se usara una conexion remota universal
        if (this.superReq==true){
            if (appConfig.disponible){
                cfg=appConfig
            }else{
                cfg=Config
            }
        }else{
            const data:any = localStorage.getItem("cfg_"+cfg['restNamespace'])
            //console.log(data)
            cfg = data!=undefined
                ?JSON.parse(data)
                :{}
        }

        if (cfg['appusuario_id'] == undefined && localStorage['atk_'+cfg['restNamespace']]!=undefined) {
            cfg['appusuario_id'] = localStorage['atk_'+cfg['restNamespace']]
        }

        if (cfg['restToken'] == undefined && localStorage['tk_'+cfg['restNamespace']]!=undefined) {
            cfg['restToken'] = localStorage['tk_'+cfg['restNamespace']]
        }

        if (cfg['utoken'] == undefined && localStorage['utk_'+cfg['restNamespace']]!=undefined) {
            cfg['utoken'] = localStorage['utk_'+cfg['restNamespace']]
        }

        this.restServer = (cfg['restServer']!=undefined?cfg['restServer']:Config.restServer) +'/'+ (cfg['restVersion']!=undefined?cfg['restVersion']:Config.restVersion)
        this.restSchema = cfg['restSchema']!=undefined?cfg['restSchema']:Config.restSchema
        this.restNamespace = cfg['restNamespace']!=undefined?cfg['restNamespace']:Config.restNamespace
        this.restToken = cfg['restToken']!=undefined?cfg['restToken']:"web"
        this.local = cfg['local']!=undefined?cfg['local']:this.local
        this.localServer = new LocalServer()
    }


    async get(endPoint){
        return this.run("GET",endPoint)        
    }

    async patch(endPoint, body){
        if (this.local==true ||this.local==1) return await this.localServer.run("PATCH",endPoint, body)
        return await fetch(this.restServer + endPoint, {
            method:"PATCH",
            headers:{
                isRest:"true",
                token:this.restToken,
                _schema:this.restSchema,
                namespace:this.restNamespace
            },
            body:JSON.stringify(body)
        })
        .then(resp=>resp.json())
        .then(data=>data)
        
    }

    async post(endPoint, body){
        if (this.local==true ||this.local==1) return await this.localServer.run("POST",endPoint, body)

        return await fetch(this.restServer + endPoint, {
            method:"POST",
            headers:{
                isrest:"true",
                token:this.restToken,
                _schema:this.restSchema,
                namespace:this.restNamespace
            },
            body:JSON.stringify(body)
        })
        .then(resp=>resp.json())
        .then(data=>data)
    }

    async put(endPoint, body){
        if (this.local==true ||this.local==1) return await this.localServer.run("PUT",endPoint, body)
        return await fetch(this.restServer + endPoint, {
            method:"PUT",
            headers:{
                isRest:"true",
                token:this.restToken,
                _schema:this.restSchema,
                namespace:this.restNamespace
            },
            body:JSON.stringify(body)
        })
        .then(resp=>resp.json())
        .then(data=>data)
    }

    async delete(endPoint){
        if (this.local==true ||this.local==1) return await this.localServer.run("DELETE",endPoint)
    }

    render(data=undefined){
        if (data==undefined){
            const ref:HTMLElement = document.createElement("IMG");
            ref['src']="css/preload.gif"
            ref.style.height="100%"
            ref.style.maxHeight="25px"
            ref.style.maxWidth="25px"
            this.restRef=ref
            return ref
        }else{
            //$(this.restRef).replace(data);
            //const padre = this.restRef.parentNode
            //this.restRef.remove()
            //if (data instanceof Array) data.forEach(i=>padre.appendChild(i))
            //else padre.appendChild(data)
            
        }
    }

    async run (method, endPoint, body:any=undefined){
        
        if (this.local==true ||this.local==1) return await this.localServer.run(method,endPoint, body)

        const pre = document.querySelector("#preload")
        if (pre != null && !this.mudo) pre['style'].display="inline-block"

        return await fetch(this.restServer + endPoint, {
            method:method,
            headers:{
                isrest:"true",
                token:this.restToken,
                _schema:this.restSchema,
                namespace:this.restNamespace,
                appusuario_id:String(this.appusuario_id)
            },
            body:JSON.stringify(body)
        })
        .then(resp=>resp.json())
        //.then(resp=>resp.text())
        .then(data=>{
            //console.log(data)
            if (data['utoken']!=undefined) localStorage['utk_'+this.restNamespace] = data['utoken']
            if (data['token']!=undefined) localStorage['tk_'+this.restNamespace] = data['token']
            if (data['appusuario_id']!=undefined) localStorage['atk_'+this.restNamespace] = data['appusuario_id']
            
            
            if (pre != null) pre['style'].display="none"
            return data
        }).catch(err=>{
            //console.log(err)
            if (pre != null) pre['style'].display="none"
            console.log(err)
            return {error:'Existió un error imprevisto.'}
        })
    }




}