[< Regresar](Indice.md)

---
# Control de permisos
Japp-N ha sido contruido con la intención de crear aplicaciones web, por lo que el control de permisos es un tema muy importante y necesario, es por eso que desde la versión 0.4.2 de Japp-N, es posible utilizar control de permisos. 

Como la mayoría de funciones de Japp-N, se busca que la aplicación de permisos sea de forma sencilla y tomando en cuenta este principio, para aplicar permisos debemos tener en cuenta 2 aspectos: 

1. Identificación de usuario y rol 
2. Identificación de permisos de acceso

### Usuario y Rol
Para identificar qué usuario hace uso de la aplicación y saber que rol posee, se implementa la propiedad interna de React Us y UsRol, estas propiedades de tipo numerico, poseen respectivamente el ID de Usuario y el ID de Rol del usuario; con estas dos propiedades, se puede identificar al usuario que hace uso de Japp-N.

Nota: Estos valores deben ser seteados al momento de autenticar al usiario, hay que tomar en cuenta que algunos módulos de autenticación podrían hacer este seteo automáticamente, pero en ocasiones es necesario hacerlo de forma manual.

### Permisos de Acceso
Los permisos de acceso permiten especificarle a Japp-N, qué usuario y qué rol pueden tener acceso a un módulo específico, para ello, es necesario colocar como propiedad interna del módulo el siguiente objeto:

```js
    class Mimodulo{
        _permiso={
            usuario:[1,8],
            rol:[2,3]
        }

        alCargar(props){
            return <h1>Hola mundo!!</h1>
        }
    }

```
En el ejemplo anterior, el modulo con nombre Mimodulo, en su propiedad _permiso, describe que a ese módulo solamente tendrá acceso los usuarios 1 y 8 o los usuarios que tengan el rol 2 ó 3. 

Si el usuario que intenta acceder al módulo no cumple con esos requisitos, Japp-N no lo dejará cargar el contenido del módulo y le mostrará un mensaje indicando que no tiene acceso, el mensaje por defecto esta pensado para mostrarse en toda la pantalla; Si necesitamos cambiar el tipo de mensaje, podemos indicar el tipo de mensaje agregando a _permiso la opcion .tipo que por defecto es 0 y que para la versión 0.4.2 solamente existen el tipo 0 y 1.

```js
    class Mimodulo{
        _permiso={
            usuario:[1,8],
            rol:[2,3],
            tipo:1
        }

        alCargar(props){
            return <h1>Hola mundo!!</h1>
        }
    }
```

Nota: La diferencia entre el mensaje tipo 0 y tipo 1 radica en que, el mensaje tipo 0 muestra una especia de pantalla con un encabezado, una notificación y un boton para regresar a la vista de inicio, diseñado para ser presentado al ingresar a un módulo que corresponde a una vista; en cambio el mensaje tipo 1, esta deseñado para ser mostrado en espacios pequeños y esta pensado para módulos que renderizan dentro de una vista, por ejemplo, un módulo que muestra un listado de opciones dentro de una vista de configuración y en donde la vista puede ser presentada, pero el listado de opciones no.



---
[< Regresar](Indice.md)
