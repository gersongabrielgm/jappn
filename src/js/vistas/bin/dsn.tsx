const dsn={
    dbName:'Fact', 
    dbVersion:'1', 
    stores:[
        {name:'sys_config', keyPath:'sys_config_id'},
        {name:'_schema_', keyPath:'tabla'},
        {name:'bod_producto', keyPath:'bod_producto_id'},
        {name:'bod_marca', keyPath:'bod_marca_id'},
        {name:'bod_categoria', keyPath:'bod_categoria_id'},
        {name:'bod_caracteristica', keyPath:'bod_caracteristica_id'}
    ]
}

export default dsn
const dbInit = [
    {
        store:'bod_caracteristica', 
        data: [
            {nombre:'Lote', val:'', close:0},
            {nombre:'Color', val:'', close:0}, 
            {nombre:'Garantia', val:'', close:0},
            {nombre:'Talla', val:'', close:0},
            {nombre:'Estado', val:'nuevo,usado,reconstruido', close:1},
            {nombre:'Empaque', val:'bolsa plastica,caja,sin empaque', close:1},
        ]
    },
    {
        store:'bod_producto',
        data:[
            {nombre:"Panadol", estado:1},
            {nombre:"aspirina", estado:0}
        ]
    },
    {
        store:'bod_categoria',
        data:[
            {nombre:"- Sin categoría -"}
        ]
    },
    {
        store:'bod_marca',
        data:[
            {nombre:"- Sin Marca -"}
        ]
    }
]
export {dbInit}