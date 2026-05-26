# Prácticas BD2 / Previo Ingeniería de Datos II

Repositorio personal para las prácticas de Bases de Datos II (NoSQL) y Persistencia Políglota. 

El objetivo de este repo es mantener un entorno de desarrollo limpio, utilizando Docker para levantar los motores de bases de datos solo cuando se necesitan, sin instalar nada directamente en el sistema operativo (Arch Linux) y sin versionar basura ni archivos de datos.

### Repositorio

* **Infraestructura Descartable:** Un `docker-compose.yml` que levanta de forma simultánea **MongoDB**, **Cassandra**, **Neo4j** y **Redis**.
* **Automatización de Terminal:** Scripts y alias integrados en `.zshrc` para levantar los contenedores, dividir la pantalla en el emulador Kitty, y conectar las consolas interactivas (CLI) automáticamente.
* **Flujo de Borrador (Scratchpad):** Carpetas aisladas por tecnología donde solo se guardan los archivos de texto (`.js`, `.cql`, etc.) con las consultas y código limpio, descartando todo el historial de prueba y error de las consolas.

*(Nota: ObjectDB se practica por separado de manera embebida con Java/JPA, por lo que no requiere contenedor en este entorno).*
