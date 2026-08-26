create KEYSPACE ecommerce WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

use ecommerce;

/*

DEJAMOS DE MODELAR ENTIDADES, MODELAMOS CONSULTAS ESPECIFICAS.
Ninguna consulta pide "Listar categorías" ni "Filtrar por categoría.
Entonces, no se crea esa column family, es redundante. Se guarda como columna dentro de la tabla que la requiera.


Consulta 1: Información de usuario por ID
- usuario_por_id:
	id_usuario uuid,
	nombre text,
	email text,
	password text,
	PRIMARY KEY(id_usuario) --pienso que no hace falta ordenar ya que se va a filtrar por id, y va a haber un unico usuario por particion
		
consulta 2: Información de producto por ID
- producto_por_id
	id_producto uuid,
	titulo text,
	tags list<text>,
	descripcion text,
	categoria text,
	PRIMARY KEY(id_producto)

Consulta 3: Productos publicados por un usuario (por nombre de usuario)
- producto_publicado_por_usuario:
	nombre_usuario text,
	id_producto uuid,
	titulo text,
	tags list<text>,
	descripcion text,
	categoria text,
	PRIMARY KEY(nombre_usuario, id_producto)

-- Para que un usuario pueda tener múltiples filas dentro de su partición, necesitás una Clustering Key que distinga un producto de otro (por ejemplo, id_producto).

Consulta 4: Usuarios que comentario un producto part (por nombre de p)
- comentario_de_producto_por_usuario:
	nombre_producto text,
	id_usuario uuid,
	nombre_usuario text,
	comentario text,
	id_comentario uuid,
	fecha timestamp,
	PRIMARY KEY(nombre_producto, id_comentario)

 Consulta 5: que producto calificó un usuario 'X' por fecha
 - producto_calificado_por_fecha:
	id_usuario uuid,
    fecha timestamp,
    id_producto uuid,
    nombre_producto text,
    calificacion int,
    PRIMARY KEY (id_usuario, fecha, id_producto)

-- filtrar primero por el usuario, Obtener automáticamente los productos calificados ordenados de forma cronológica, y, si un usuario califica dos productos en el mismo instante, agregás id_producto.
	--id_usuario es la única Partition Key.
	--fecha e id_producto son las dos Clustering Keys en cadena.

*/


--PASANDO A ESTRUCTURA DE TABLAS.
CREATE TABLE usuario_por_id (
	id_usuario uuid,
	nombre text,
	email text,
	password text,
	PRIMARY KEY(id_usuario)
);

CREATE TABLE producto_por_id (
	id_producto uuid,
	titulo text,
	tags list<text>,
	descripcion text,
	categoria text,
	PRIMARY KEY(id_producto)
);

CREATE TABLE producto_publicado_por_usuario (
	nombre_usuario text,
	id_producto uuid,
	titulo text,
	tags list<text>,
	descripcion text,
	categoria text,
	PRIMARY KEY(nombre_usuario, id_producto)
);

CREATE TABLE comentario_de_producto_por_usuario(
	nombre_producto text,
	id_usuario uuid,
	nombre_usuario text,
	comentario text,
	id_comentario uuid,
	fecha timestamp,
	PRIMARY KEY(nombre_producto, id_comentario)
);

CREATE TABLE producto_calificado_por_fecha(
	id_usuario uuid,
    fecha timestamp,
    id_producto uuid,
    nombre_producto text,
    calificacion int,
    PRIMARY KEY (id_usuario, fecha, id_producto)
);


--INSERTS
-- 1. Insertar Usuarios
INSERT INTO usuario_por_id (id_usuario, nombre, email, password)
VALUES (uuid(), 'carlos_perez', 'carlos@mail.com', 'pass123');

INSERT INTO usuario_por_id (id_usuario, nombre, email, password)
VALUES (uuid(), 'maria_gomez', 'maria@mail.com', 'pass456');


-- 2. Insertar Productos
INSERT INTO producto_por_id (id_producto, titulo, tags, descripcion, categoria)
VALUES (uuid(), 'Teclado Mecanico RGB', ['teclado', 'gaming', 'perifericos'], 'Teclado mecanico switch blue', 'Perifericos');

INSERT INTO producto_por_id (id_producto, titulo, tags, descripcion, categoria)
VALUES (uuid(), 'Monitor Gamer 144Hz', ['monitor', 'gaming', 'pantalla'], 'Monitor IPS 24 pulgadas 144Hz', 'Monitores');

--hago las consultas para copy pastear los uuids manualmente en las otras tablas
SELECT * FROM usuario_por_id;
SELECT * FROM producto_por_id;


-- 3. Insertar Productos publicados por un usuario (Consulta 3)
INSERT INTO producto_publicado_por_usuario (nombre_usuario, id_producto, titulo, tags, descripcion, categoria)
VALUES ('carlos_perez', 86f53f31-b338-48a6-a878-d150e36d0823, 'Teclado Mecanico RGB', ['teclado', 'gaming', 'perifericos'], 'Teclado mecanico switch blue', 'Perifericos');

INSERT INTO producto_publicado_por_usuario (nombre_usuario, id_producto, titulo, tags, descripcion, categoria)
VALUES ('carlos_perez', fe2621e8-3f72-4e29-81db-5e686e7b9fe1, 'Monitor Gamer 144Hz', ['monitor', 'gaming', 'pantalla'], 'Monitor IPS 24 pulgadas 144Hz', 'Monitores');


-- 4. Insertar Comentarios de un producto (Consulta 4)
INSERT INTO comentario_de_producto_por_usuario (nombre_producto, id_comentario, id_usuario, nombre_usuario, comentario, fecha)
VALUES ('Teclado Mecanico RGB', uuid(), 6a6ee96b-338f-4291-9267-2ec362441fed, 'maria_gomez', 'Excelente teclado, muy buenas teclas.', toTimestamp(now()));

INSERT INTO comentario_de_producto_por_usuario (nombre_producto, id_comentario, id_usuario, nombre_usuario, comentario, fecha)
VALUES ('Teclado Mecanico RGB', uuid(), d86e0e23-baef-40ea-8698-d2720c251bb1, 'carlos_perez', 'Gracias por la reseña!', toTimestamp(now()));


-- 5. Insertar Calificaciones de productos por usuario con fecha (Consulta 5)
INSERT INTO producto_calificado_por_fecha (id_usuario, fecha, id_producto, nombre_producto, calificacion)
VALUES (6a6ee96b-338f-4291-9267-2ec362441fed, '2026-08-20 14:30:00', 86f53f31-b338-48a6-a878-d150e36d0823, 'Teclado Mecanico RGB', 9);

INSERT INTO producto_calificado_por_fecha (id_usuario, fecha, id_producto, nombre_producto, calificacion)
VALUES (6a6ee96b-338f-4291-9267-2ec362441fed, '2026-08-25 18:00:00', fe2621e8-3f72-4e29-81db-5e686e7b9fe1, 'Monitor Gamer 144Hz', 10);

-- CONSULTAS

SELECT * FROM usuario_por_id;
SELECT * FROM producto_por_id;

-- Probar Consulta 3:
SELECT * FROM producto_publicado_por_usuario WHERE nombre_usuario = 'carlos_perez';

-- Probar Consulta 4:
SELECT * FROM comentario_de_producto_por_usuario WHERE nombre_producto = 'Teclado Mecanico RGB';

-- Probar Consulta 5:
SELECT * FROM producto_calificado_por_fecha WHERE id_usuario = a64a8550-7130-4c08-8ad6-281f1a4a18ae;
