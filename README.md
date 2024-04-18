# 🛒 Nodepop React

> 👤 Marta Vilaseca Foradada  
> 💻 XVI Bootcamp Full Stack Web  
> 📅 5 Mayo 2024

Vamos a crear una aplicación de tipo dashboard, que será la interfaz gráfica desde
la que podremos gestionar el API de anuncios Nodepop.

<!-- ![Preview](./images/preview.png) -->

## Tecnologías utilizadas

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Backend

Utilizamos [este proyecto](https://github.com/davidjj76/nodepop-api) como backend.

Una vez instalado, tendremos nuestro backend corriendo en el puerto 3001 (por defecto, es configurable). Tendremos disponible un swagger en http://localhost:3001/swagger/ donde poder probar los distintos endpoints:

### Endpoints API

```
/api/auth/signup
```

- **POST:** Nos permite crear usuarios.

```
/api/auth/me
```

- **GET:** Nos devuelve la información del usuario autenticado

```/api/auth/login

```

- **POST:** Devuelve un token de acceso cuando le pasamos un email y
  password de un usuario correctos.

```
/api/v1/adverts
```

- **GET:** Devuelve un listado de anuncios, con la posiblidad de aplicar filtros con la query que enviemos en la URL. Los filtros posibles son:
  - `name=coche` (que el nombre empiece por “coche”, sin importar
    MAY/MIN)
  - `sale=true/false` (si el anuncio es de compra o venta)
  - `price=0-25000` (precio dentro del rango indicado)
  - `tags=motor,work` (que tenga todos los tags)
- **POST:** Crea un anuncio.

```
/api/v1/adverts/tags
```

- **GET:** Devuelve el listado de tags disponibles.

```
/api/v1/adverts/:id
```

- **GET:** Devuelve un único anuncio por Id.
- **DELETE:** Borra un anuncio por Id.

### Importante

- Todos los endpoints bajo **/adverts** requieren que se envíe el token proporcionado en el endpoint de login. Se ha de enviar en la cabecera de la petición de la siguiente forma:

```
Header[‘Authorization’] = `Bearer ${token}`
```

- Los datos del backend son persistidos en una **base de datos sqlite** en el directorio
  **/data**
- Las fotos subidas al backend son almacenadas en el directorio **/uploads** y servidas por el backend cómo contenido estático en **/public** **(la ruta pública de cada foto es
  almacenada en la base de datos)**.

## Frontend

La aplicación frontend es una SPA (Single Page Application) desarrollada con React como librería principal.

### Rutas de la aplicación

- **Públicas: Accesibles para cualquier usuario.**
  - `/login`: **LoginPage**
- **Protegidas: Accesibles SOLO para usuarios autenticados.** Cualquier acceso de un usuario no autenticado a cualquiera de estas rutas redireccionará a `/login`.
  - `/`: Redirecciona a `/adverts`
  - `/adverts`: **AdvertsPage**
  - `/adverts/:id`: **AdvertPage**
  - `/adverts/new`: **NewAdvertPage**
  - Para cualquier otra url que no coincida se creará un componente **NotFoundPage** que informará al usuario que la página solicitada no existe (la típica 404).
