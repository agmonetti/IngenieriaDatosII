show host; -> muestra host

select * from system. + 'Tab' 
-- Al presionar Tab inmediatamente tras el punto, cqlsh entiende que querés autocompletar una tabla interna perteneciente al Keyspace system, y te desplegará las opciones (local, peers, batches, size_estimates, etc.).

-- crar keyspace
create KEYSPACE demo_cql_music WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

--simple stratey ->distribuye copias en nodos adyacentes
-- '1' -> se guarda una sola copia de cada fila en el cluster

USE demo_cql_music;

--column family:
create TABLE canciones (id uuid PRIMARY KEY, titulo text, album text, artista text, data blob);

create TABLE lista_reproduccion(
	id uuid,
	nro_cancion int,
	cancion_id uuid,
	titulo text,
	album text,
	artista text,
	PRIMARY KEY (id, nro_cancion)
);

--El UUID es útil para la secuenciación de los datos o incrementar automáticamente. Para el ejercicio, se utiliza el tipo int en el campo nro_cancion por simplicidad

INSERT INTO lista_reproduccion (id, nro_cancion, cancion_id, titulo, artista, album)
VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 6, 7db1a490-5878-11e2-bcfd-0800200c9a66, 'Asilo', 'Jorge Drexler', 'Salvavidas de Hielo');


--mas inserciones en ambas tablas
INSERT INTO canciones (id, titulo, album, artista, data)
VALUES (uuid(), 'Telefonía', 'Salvavidas de Hielo', 'Jorge Drexler', null);

INSERT INTO canciones (id, titulo, album, artista, data)
VALUES (uuid(), 'Sea', 'Eco', 'Jorge Drexler', null);

INSERT INTO canciones (id, titulo, album, artista, data)
VALUES (uuid(), 'Al otro lado del río', 'Eco', 'Jorge Drexler', null);

INSERT INTO canciones (id, titulo, album, artista, data)
VALUES (uuid(), 'Movimiento', 'Salvavidas de Hielo', 'Jorge Drexler', null);

-- 1. Al otro lado del río
INSERT INTO lista_reproduccion (id, nro_cancion, cancion_id, titulo, artista, album)
VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 1, e4aba182-5cc8-449d-ae55-e6ed1a9385b7, 'Al otro lado del río', 'Jorge Drexler', 'Eco');

-- 2. Sea
INSERT INTO lista_reproduccion (id, nro_cancion, cancion_id, titulo, artista, album)
VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 2, a246fce3-17e0-4218-a27a-c9f00fc94132, 'Sea', 'Jorge Drexler', 'Eco');

-- 3. Movimiento
INSERT INTO lista_reproduccion (id, nro_cancion, cancion_id, titulo, artista, album)
VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 3, 68ef7950-1925-479f-a2b1-7b2a96b07b8e, 'Movimiento', 'Jorge Drexler', 'Salvavidas de Hielo');


INSERT INTO lista_reproduccion (id, nro_cancion, cancion_id, titulo, artista, album)
VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 1, e4aba182-5cc8-449d-ae55-e6ed1a9385b7, 'Al otro lado del río', 'Jorge Drexler', 'Eco');

INSERT INTO lista_reproduccion (id, nro_cancion, cancion_id, titulo, artista, album)
VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 2, a246fce3-17e0-4218-a27a-c9f00fc94132, 'Sea', 'Jorge Drexler', 'Eco');

INSERT INTO lista_reproduccion (id, nro_cancion, cancion_id, titulo, artista, album)
VALUES (62c36092-82a1-3a00-93d1-46196ee77204, 3, 68ef7950-1925-479f-a2b1-7b2a96b07b8e, 'Movimiento', 'Jorge Drexler', 'Salvavidas de Hielo');


select * from lista_reproduccion where artista= 'Jorge Drexler';
-- falla, no es una columan de la clave de particion

CREATE INDEX indice_artista ON lista_reproduccion(artista);

-- 8. Agregar columna de colección tipo set a la tabla
ALTER TABLE lista_reproduccion ADD etiquetas set<text>;

-- 9. Actualizar registros agregando elementos a la colección
UPDATE lista_reproduccion SET etiquetas = etiquetas + {'2017'} 
WHERE id = 62c36092-82a1-3a00-93d1-46196ee77204 AND nro_cancion = 6;

UPDATE lista_reproduccion SET etiquetas = etiquetas + {'guitarra'} 
WHERE id = 62c36092-82a1-3a00-93d1-46196ee77204 AND nro_cancion = 6;

UPDATE lista_reproduccion SET etiquetas = etiquetas + {'Mon Laferte'} 
WHERE id = 62c36092-82a1-3a00-93d1-46196ee77204 AND nro_cancion = 6;

-- Es posible eliminar registros con el siguiente comando:
DELETE FROM lista_reproduccion WHERE id =62c36092-82a1-3a00-93d1-46196ee77204 AND nro_cancion = 6;

--12. Para eliminar el Column Family, utilice la siguiente sentencia:
DROP TABLE lista_reproduccion ;

--13. Para finalizar, elimine el Keyspace:
DROP KEYSPACE demo_cql_music;
