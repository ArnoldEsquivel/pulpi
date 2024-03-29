Carpeta raiz
.env: Variables de entorno para almacenar configuraciones sensibles, como cadenas de conexión a la base de datos.

Frontend

Backend
Detalles de la Estructura
node_modules: Carpeta donde se almacenan las dependencias del proyecto.
server.js: Punto de entrada del proyecto, inicia el servidor.
src: Carpeta principal del código fuente.
    api: Contiene el código específico de la API.
        controllers: Funciones que conectan los endpoints con los servicios.
        services: Lógica de negocio, donde se implementa el acceso a la base de datos y operaciones relacionadas.
        models: Definiciones de los modelos de datos (si decides usar un ORM como Sequelize, aquí definirías tus modelos).
        routes: Definiciones de rutas de Express que utilizan los controladores.
        config: Configuración del proyecto, como la conexión a la base de datos.
    middlewares: Funciones de middleware de Express, por ejemplo, para manejar errores o verificar la autenticación.
    app.js: Configuración central de Express, donde se importan las rutas y los middlewares.