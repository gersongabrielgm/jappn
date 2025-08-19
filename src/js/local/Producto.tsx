//clase primaria de endpoint local
import Local from "../libs/Local.js"
import Dbase from "../libs/dBase.js"


class Producto extends Local{
    
    rutas={
        "GET":{
            "/Producto": "getProductos",
            "/Producto/criterio/:var": "getCriterio",
            "/Producto/:id": "getProducto" 
        },
        "POST":{
            "/Producto": "newProducto"
        },
        "PUT":{
            "/Producto/:id": "actualizar"
        }
    }

    async getProductos(){
        const registros = await Dbase.readAll('bod_producto')
        
        return registros

//        return {error:'', res:[1,2,3,4,5]}
    }

    async getProducto(parts, body){
        return {error:'', res:[1,2,3,4,5]}
    }

    async newProducto(parts, body){
        return body
    }

    async getCriterio(parts, body){
        return new Promise((resolver)=>{
            
        })
    }
}

export default Producto
