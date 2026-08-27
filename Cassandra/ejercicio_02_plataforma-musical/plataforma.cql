create KEYSPACE plataforma WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

use plataforma;

--DEJAMOS DE MODELAR ENTIDADES, MODELAMOS CONSULTAS ESPECIFICAS.

-- 1- Listar los comentarios de usuarios sobre un album filtrados por calificacion, ordenados por fecha

CREATE TABLE comentarios_por_calificacion (
	id_usuario uuid,
	id_comentario uuid,
	id_album uuid,
	nombre_algum text,
	nombre_usuario text,
	comentario text,
	calificacion int,
	fecha timestamp,
	PRIMARY KEY (id_album, calificacion, fecha, id_comentario)
) WITH CLUSTERING ORDER BY(calificacion ASC, fecha DESC);

/*

id_album (Partition Key):
Es el casillero / partición física del nodo. Todos los comentarios de un mismo álbum se guardan juntos en el mismo servidor.

calificacion (1ª Clustering Key):
Dentro de ese casillero, Cassandra divide los registros en grupos por estrellas (Grupo 5, Grupo 4, Grupo 3...). Esto te permite hacer un filtro directo WHERE calificacion = 5.

fecha (2ª Clustering Key):
Dentro del grupo de 5 estrellas, Cassandra ordena físicamente los comentarios por fecha (del más nuevo al más viejo).

id_comentario (3ª Clustering Key):
Garantiza unicidad. Si dos usuarios publican un comentario de 5 estrellas en el mismo milisegundo exacto, este campo desempata para que el segundo comentario no sobreescriba al primero.

la primera clustering key es calificacion y la segunda es fecha:
PRIMARY KEY (id_album, calificacion, fecha, id_comentario)

No podés definir el orden de fecha sin incluir primero calificacion.

Regla: Para llegar a fecha, tenés que declarar obligatoriamente las clustering keys previas en el mismo orden:
WITH CLUSTERING ORDER BY (calificacion ASC, fecha DESC) (o calificacion DESC, fecha DESC).
*/

-- 2- Consultar las canciones reproducidas por un usuario dentro de un genero especifico, ordenadas por fecha de reproduccion

CREATE TABLE canciones_reproducidas_por_usuarios(
	id_usuario uuid,
	genero text,
	id_cancion uuid,
	nombre_cancion text,
	fecha_reproduccion timestamp,
	PRIMARY KEY(id_usuario, genero,fecha_reproduccion, id_cancion)
)WITH CLUSTERING ORDER BY(genero ASC, fecha_reproduccion DESC);

-- 3- Listar canciones disponibles de un det album en una fecha concreata, mostrando titulo, duracion, artistas
CREATE TABLE canciones_album_fecha(
	id_album uuid,
	id_cancion uuid,

	titulo_cancion text,
	titulo_album text,
	fecha date,
	duracion_cancion int,
	artistas_invitados list<text>,
	PRIMARY KEY((id_album, fecha), id_cancion)
);



-- 4- Listar todas las canciones y recursos disponibles en una cateoria
CREATE TABLE canciones_recursos_de_categoria(
	id_cancion uuid,
	id_recurso uuid,
	id_categoria uuid,

	nombre_cancion text,
	nombre_categoria text,
	nombre_recurso text,
	PRIMARY KEY(nombre_categoria,id_cancion,id_recurso)
);



--5- Mostrar la calificacion promedio de cada artista odenada por año
CREATE TABLE calificacion_promedio_artista(
	id_artista uuid,
    anio int,
    nombre_artista text,
    calificacion_promedio double,
    PRIMARY KEY (id_artista, anio)
) WITH CLUSTERING ORDER BY (anio DESC);




--B) Instanciar las tablas.
--canciones_reproducidas_por_usuarios

INSERT INTO canciones_reproducidas_por_usuarios(id_usuario,genero,id_cancion,nombre_cancion,fecha_reproduccion)
VALUES(uuid(), 'Rock', uuid(), 'Asi fue (Vivo)','2026-08-27 19:30:00');

INSERT INTO canciones_reproducidas_por_usuarios (id_usuario, genero, id_cancion, nombre_cancion, fecha_reproduccion)
VALUES (e4a82b3c-1111-2222-3333-444455556666, 'Rock', uuid(), 'Ji Ji Ji', '2026-08-27 20:15:00');

INSERT INTO canciones_reproducidas_por_usuarios (id_usuario, genero, id_cancion, nombre_cancion, fecha_reproduccion)
VALUES (e4a82b3c-1111-2222-3333-444455556666, 'Rock', uuid(), 'Crimen', '2026-08-27 21:00:00');

INSERT INTO canciones_reproducidas_por_usuarios (id_usuario, genero, id_cancion, nombre_cancion, fecha_reproduccion)
VALUES (e4a82b3c-1111-2222-3333-444455556666, 'Rock', uuid(), 'Seminare', '2026-08-27 22:45:30');

-- Mismo Usuario 1 pero escuchando otro género (Pop) usando now()
INSERT INTO canciones_reproducidas_por_usuarios (id_usuario, genero, id_cancion, nombre_cancion, fecha_reproduccion)
VALUES (e4a82b3c-1111-2222-3333-444455556666, 'Pop', uuid(), 'Tu Misterioso Alguien', toTimestamp(now()));

INSERT INTO canciones_reproducidas_por_usuarios (id_usuario, genero, id_cancion, nombre_cancion, fecha_reproduccion)
VALUES (e4a82b3c-1111-2222-3333-444455556666, 'Pop', uuid(), 'Don', '2026-08-26 15:10:00');


-- Usuario 2 escuchando Rock
INSERT INTO canciones_reproducidas_por_usuarios (id_usuario, genero, id_cancion, nombre_cancion, fecha_reproduccion)
VALUES (f5b93c4d-7777-8888-9999-000011112222, 'Rock', uuid(), 'Spaghetti del Rock', '2026-08-27 18:00:00');


--C - consultas
--1
SELECT comentario, nombre_album, calificacion, fecha
FROM comentarios_por_calificacion
WHERE id_album = ......
	AND calificacion  = 4

--2
SELECT nombre_cancion, fecha_reproduccion 
FROM canciones_reproducidas_por_usuarios 
WHERE id_usuario = e4a82b3c-1111-2222-3333-444455556666 
  AND genero = 'Rock';

SELECT nombre_cancion, fecha_reproduccion 
FROM canciones_reproducidas_por_usuarios 
WHERE id_usuario = e4a82b3c-1111-2222-3333-444455556666 
  AND genero = 'Pop';


--3 
SELECT titulo_cancion, titulo_album, fecha, duracion_cancion, artistas_invitados
FROM canciones_album_fecha
WHERE id_album = ...
 AND fecha = ''

--4
SELECT nombre_cancion,nombre_recurso,nombre_categoria
FROM canciones_recursos_de_categoria
WHERE nombre_categoria = 'Rock'


--5 
SELECT calificacion_promedio, artista, anio
FROM calificacion_promedio_artista
WHERE id_artista = .....
