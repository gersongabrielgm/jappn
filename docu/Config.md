[< Regresar](README.md)
---
# Config
El archivo config contiene configuración para diversas partes del proyecto, entre ellas esta:

### nombre:
Hace referencia al nombre del proyecto, nombre que será visible en la pestanña del navegador

### Datos para conoexión Rest

* **restServer**:
Dirección del servidor en donde se encuentra el servicio Rest que atenderá las solicitudes Rest.

* **restVersion**: 
Indica la versión del servicio web Rest

* **restSchema**
Define el esque de base de datos que se debe consultar

* **restNamespace**
Indica el namspace o area de trabajo de la aplicacion

* **restToken**
Posee el token de conexión recibido despues de una autenticación o de genera un token estático

Nota:
Existe una segunda definición de datos de configuración dentro de /js/vistas/bin/env.tsx, estos segundos, tanto como los primeros, son son empleados cuando al objeto Rest para establecer comunicación.

*[Jesus E. Laynes G.]*

---
[< Regresar](README.md)