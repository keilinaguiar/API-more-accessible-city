Ciudad más accesible

## Descripcion:

Implementar una API que permita publicar lugares de la ciudad con problemas de accesibilidad
para denunciarlos.

## Instalar

- Crear una base de datos vacía en una instancia de MySQL local.

- Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

- Ejecutar `npm run initDB` para crear las tablas necesarias en la base de datos anteriormente creada.

- Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Entidades

Usuario anonimo❌

## Entidades

- admin:

  - id
  - email
  - password
  - createdAt


- Post:
  - id
  - idAdmin
  - titulo
  - descripción
  - ciudad
  - barrio
  - foto
  - resuelto
  - createdAt
  - modifiedAt

- like:❌

  - id
  - idUser
  - idPost
  - like
  - createdAt

## Endpoints

admin:

- POST [/login] - Login de admin  (devuelve token) ✅

Post:

- POST [/post] - Permite crear una publicacion (necesita cabecera con token) ✅
- GET [/post] - Lista todas las publicaciones
- GET [/posts/:city] - Devuelve una publicacion de la ciudad solicitada

Pueden escoger un barrio de la ciudad y ver la lista de lugares con problemas de accesibilidad
en ese barrio, tanto los problemas activos como los que fueron resueltos.
El administrador de la web debería poder acceder mediante un formulario de login y acceder a
la zona de administración.

## ADMINISTRADOR
● Crear un nuevo lugar con problema de accesibilidad
○ Título
○ Descripción
○ Foto
○ Ciudad
○ Barrio
● Marcar un problema de accesibilidad como resuelto
## OPCIONAL
●Gestión de usuarios (no administrador) que puedan poner un “like” a un problema de
accesibilidad
