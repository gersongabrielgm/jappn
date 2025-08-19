[< Regresar](Indice.md)
---

# Hilo
Extensión que permite crear un hilo de comunicación entre el DOM y el contexto externo hacia JappN, implementar este hilo conlleva algunos riezgos de seguridad, ya que toda la lógica de JappN se encuentra protegida bajo un encapsulamiento, de tal manera que desde la consola o scripts externos no puedan acceder a JappN.

Al crear un hilo, JappN estará expuesto permitiendo que un script externo o desde la consola del navegador, cualquier persona pueda ejecutar una llamada al hilo expuesto.

## Contexto del hilo
El contexto del hilo (llamada), dependerá del elemento al que sea asignado, por ejemplo:

### Modulo Clase o JappN
Un hilo creado sobre un módulo de clase o modulo jappn, permite generar una llamada al evento [alHilo](../Japp/AlHilo.md), permitiendo el envío de propiedades, pero por segurida evitando que el evento alHilo (evento interno de jappn) devuelva algun resultado a la invocación externa.

### Elemento HTML
Si el hilo es contruido sobre un elemento HTML, debido a que este no es un módulo con lógica y a que no puede poseer un evento alHilo, la invocación del hilo requerira parametros React para hacer uso de la libreria React y cargará el resultado dentro del elemento que posee contruido el Hilo.

### Modulo de funcion 
Un módulo de función no permite tener acceso a hilos, no obstante cualquier elemento HTML o Modulo de clase y modulo JappN que se encuentre dentro de la clase de función, si podrá tener definido y aplicado hilos.


## Ejemplo de Hilo para Modulo de Clase y Modulo JappN
```js
    export default class MiModulo{
        alCargar(){
            return <h1>Hola mundo</h1>
        }

        //evento que se ejecutará al llamar al hilo
        alHilo(props){
            alert('mensaje ejecutado al invocar el hilo')
        }
    }

```

*[Jesus E. Laynes G.]*

---
[< Regresar](Indice.md)