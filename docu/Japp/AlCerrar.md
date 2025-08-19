[< Regresar](Indice.md)

---
# Evento al Cerrar
Como contexto para entender este evento, es importante recordar que los elementos en pantalla (vista), son creados como resultado de la llamada del evento alCargar de cada módulo respectivamente, también es importante mencionar que los módulos después de contruir el elemento de pantalla, pueden ser indexados en el árbol de nodos de Japp-N (ver árbol de nodos).

Bajo el contexto anterior, el evento **alCerrar** tiene como finalidad, ejecutar validaciones u operaciones de datos que necesiten ser procesados ANTES de eliminar el elemento HTML en pantlla y eliminar el nodo tipo módulo del árbol de nodos de Japp-N.

Nota Importante: Para que el evento alCerrar funcione correctamente, es necesario que el módulo existe en el árbol de nodos de Japp-N y que el elemento HTML esté siendo remplazado por la función **React.Cargar**.

El evento alCerrar NO recibe argumentos y opcionalmente puede devolver un valor boleano que, de ser verdadero, indica que por parte de ese evento se autoriza el cierre del módulo y en caso de ser falso, indica que el módulo NO da su concentimiento para cerrar el módulo.

Nota: Para que **React.Cargar** sea capaz de remplazar la vista y cargar los nuevos módulos, debe contaro con el 100% de concenitmientos de cierre por parte de todos los módulos que posean el evento alCerrar; ahora bien, si un módulo no tiene evento alCerrar o el evento alCerrar no retorna una confirmación; el valor se asumira como un valor verdadero, es decir que por defecto el módulo da su concentimiento para ser cerrado.

Ejemplo 1:
```js
    

```

- El contenido, que en el caso de ser un componente que posee modulos o elementos HTML como hijos, estos se reciben opcionalmente como un array con los datos internos, en el caso hipotético de MiModulo:


<MiModulo prop1="valor 1" prop2="valor 2">
    <div>linea 1</div>
    <div>linea 2</div>
    <div>linea 3</div>
    <div>linea 4</div>
    <div>linea 5</div>
</MiModulo>

En donde en el evento alCargar se recibiría de la siguiente manera
```js
    contenido = [
        <div>linea 1</div>,
        <div>linea 2</div>,
        <div>linea 3</div>,
        <div>linea 4</div>,
        <div>linea 5</div>
    ]

```


Ejemplos del evento alCargar: 

```js
    import React from './libs/MiReact.js'

    class MiModulo{
        alCargar ( props, contenido ){
            //aqui se escribe el código del evento al Carggar
            ...

            return <div>Este es el resultado devuelto para agregar al DOM</div>
        }
    }

    export default MiModulo
```

Nota 1: 
El evento alCargar solo está disponible en un módulo de clase y módulos JappN.

Nota 2: 
El contenido puede no ser necesario, salvo casos muy puntuales en donde se requiere procesar los elementos de un módulo, como por ejemplo la creación de un módulo de tools.

*[Jesus E. Laynes G.]*

---
[< Regresar](Indice.md)