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
