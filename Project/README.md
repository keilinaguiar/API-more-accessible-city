Ciudad más accesible

## Descripcion:

Implementar una API que permita publicar lugares de la ciudad con problemas de accesibilidad
para denunciarlos.

## Instalar

-   Crear una base de datos vacía en una instancia de MySQL local.

-   Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

-   Ejecutar `npm run initDB` para crear las tablas necesarias en la base de datos anteriormente creada.

-   Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Entidades

Tenemos el administrador que se puede loguear mediante un formulario y es el unico capaz de publicar "post"

No hay formulario para crear nuevos administradores, solo es posible agregar mas administradores agregandolos desde la base de datos.

Los datos para loguearse se encuantra en el fichero initDB.js

-   admin:

    -   id
    -   email
    -   password
    -   createdAt

-   Post:
    -   id
    -   idAdmin
    -   ttitle
    -   descriptions
    -   city
    -   suburb
    -   attended
    -   image
    -   createdAt
    -   modifiedAt

## Endpoints

Nos logueamos en el postman mediante el body introduciendo el email y la contraseña del administrador y nos devuelve un token

admin:

-   GET [/login] - Login de admin (devuelve token) 

################################################################
Luego de loguearnos y obtener el token del admin, he guardado la informacion del token como una variable y la he puesto en la cabecera de new post como KEY = Authorization VALUE {{token_admin}}.

para poder crear el post correctamente se nececita agregar en este mismo orden (en el body --> form-data si se quiere agregar imagen):

-   title
-   idAdmin
-   descriptions
-   city
-   suburb
-   attended
-   image (No obligatorio)

Post:

-   POST [/post] - Permite crear una publicacion (necesita cabecera con token para autorizar) ✅
-   GET [/post] - Lista de todas las publicaciones
-   GET [/posts?keyword] - Devuelve una publicacion de una ciudad en especifico o de alguna palabra clave que se encuentre en la descripcion

####################################################################################################

Pueden escoger un barrio de la ciudad y ver la lista de lugares con problemas de accesibilidad
en ese barrio, tanto los problemas activos como los que fueron resueltos.
El administrador de la web debería poder acceder mediante un formulario de login y acceder a
la zona de administración.

