CREATE KEYSPACE parcial 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

use parcial;

-- CONSULTAS

--1 Cuales son los empleados que poseen una habilidad (skill) determinada en cualquier nivel y hacen un deporte determinado, ordenados alfabeticamente por nombre
-- Indicar todos los datos del empleado y el nivel de habilidad si es federado

CREATE TABLE empleado_con_skill(
	id_empleado uuid,
	id_skill uuid,

	nombre_empleado text,
	apellido_empleado text,
	ciudad_empleado text,
	pais_empleado text,
	deporte_empleado text,
	federated boolean, -- si es 'federado'
	
	PRIMARY KEY((id_skill,deporte_empleado),nombre_empleado,id_empleado)
) WITH CLUSTERING ORDER BY(nombre_empleado DESC);
--podria haber agregado un nombre de la skill, y filtrar mas facil por él, en lugar de filtrar por el id


--2 ¿Cuales son los trabajos previos de los jugadores de golf?
-- Indicar funcion y desde cuando la desempeña

CREATE TABLE trabajos_previos_golfistas(
	id_empleado uuid,
	id_trabajo uuid,
	
	deporte text,
	funcion_trabajo text,
	trabajo_desde date,
	trabajo_hasta date,
	PRIMARY KEY(deporte,id_empleado, id_trabajo)
);


--3 ¿Que empleados hicieron deportes de riesgo alto en el año 2015?
--Indicar datos del empleado y del deporte de alto riesgo

CREATE TABLE empleados_deporte_riesgoAlto(
	id_empleado uuid,
	id_deporte uuid,
	anio int,
	
	nombre_empleado text,
	apellido_empleado text,
	ciudad_empleado text,
	pais_empleado text,
	deporte_empleado text,
	deporte_desde date,

	nombre_deporte text,
	riesgo_deporte text,
	federado boolean,
	PRIMARY KEY((anio,riesgo_deporte),id_empleado,id_deporte)
);



--4 ¿En que deportes participan programadores?
--Indicar datos del deporte y del empleado
CREATE TABLE deportes_de_programadores(
	id_empleado uuid,
	id_deporte uuid,

	trabajo_empleado text,
	nombre_empleado text,
	apellido_empleado text,
	ciudad_empleado text,
	pais_empleado text,
	deporte_empleado text,
	deporte_desde date,

	nombre_deporte text,
	riesgo_deporte text,
	federado boolean,
	PRIMARY KEY (trabajo_empleado,id_empleado, id_deporte)
);

SELECT nombre_deporte,riesgo_deporte,federado, trabajo_empleado, nombre_empleado,apellido_empleado,ciudad_empleado,pais_empleado,deporte_desde 
FROM deportes_de_programadores 
WHERE trabajo_empleado= 'Programador';


-- B, INSERCION DATOS
--1
INSERT INTO empleado_con_skill(id_empleado,id_skill,nombre_empleado,apellido_empleado,ciudad_empleado,pais_empleado,deporte_empleado,federated)
VALUES(11111111-1111-1111-1111-111111111111,00000000-0000-0000-0000-000000000001, 'Agustin','Monetti', 'Lobos','Argentina','Futbol', true);
-- Misma partición (id_skill: 0001, deporte: 'Futbol') para probar el orden alfabético por nombre

INSERT INTO empleado_con_skill (id_empleado, id_skill, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado, federated)
VALUES (22222222-2222-2222-2222-222222222222, 00000000-0000-0000-0000-000000000001, 'Bruno', 'Diaz', 'CABA', 'Argentina', 'Futbol', false);

INSERT INTO empleado_con_skill (id_empleado, id_skill, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado, federated)
VALUES (33333333-3333-3333-3333-333333333333, 00000000-0000-0000-0000-000000000001, 'Camila', 'Gomez', 'Rosario', 'Argentina', 'Futbol', true);

INSERT INTO empleado_con_skill (id_empleado, id_skill, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado, federated)
VALUES (44444444-4444-4444-4444-444444444444, 00000000-0000-0000-0000-000000000001, 'Esteban', 'Quito', 'Cordoba', 'Argentina', 'Futbol', true);

-- Otra partición (Misma skill: 0001, distinto deporte: 'Tenis')
INSERT INTO empleado_con_skill (id_empleado, id_skill, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado, federated)
VALUES (55555555-5555-5555-5555-555555555555, 00000000-0000-0000-0000-000000000001, 'Daniela', 'Perez', 'Mendoza', 'Argentina', 'Tenis', false);

-- Otra partición (Distinta skill: 0002, deporte: 'Futbol')
INSERT INTO empleado_con_skill (id_empleado, id_skill, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado, federated)
VALUES (66666666-6666-6666-6666-666666666666, 00000000-0000-0000-0000-000000000002, 'Agustin', 'Alvarez', 'La Plata', 'Argentina', 'Futbol', true);

--2
INSERT INTO trabajos_previos_golfistas(id_empleado,id_trabajo,deporte,funcion_trabajo,trabajo_desde,trabajo_hasta)
VALUES(77777777-7777-7777-7777-777777777777, 00000000-0000-0000-0001-111111111111,'Golf','Electricista', '2018-01-01',null);

-- Mismo golfista (id_empleado: 7777...), segundo trabajo previo finalizado
INSERT INTO trabajos_previos_golfistas (id_empleado, id_trabajo, deporte, funcion_trabajo, trabajo_desde, trabajo_hasta)
VALUES (77777777-7777-7777-7777-777777777777, 00000000-0000-0000-0001-222222222222, 'Golf', 'Tecnico de Redes', '2015-03-01', '2017-12-31');

-- Segundo golfista (id_empleado: 8888...) con dos trabajos previos
INSERT INTO trabajos_previos_golfistas (id_empleado, id_trabajo, deporte, funcion_trabajo, trabajo_desde, trabajo_hasta)
VALUES (88888888-8888-8888-8888-888888888888, 00000000-0000-0000-0002-111111111111, 'Golf', 'Administrativo', '2019-06-15', '2022-04-30');

INSERT INTO trabajos_previos_golfistas (id_empleado, id_trabajo, deporte, funcion_trabajo, trabajo_desde, trabajo_hasta)
VALUES (88888888-8888-8888-8888-888888888888, 00000000-0000-0000-0002-222222222222, 'Golf', 'Analista Funcional', '2022-05-01', null);

-- Tercer golfista (id_empleado: 9999...) con un trabajo previo
INSERT INTO trabajos_previos_golfistas (id_empleado, id_trabajo, deporte, funcion_trabajo, trabajo_desde, trabajo_hasta)
VALUES (99999999-9999-9999-9999-999999999999, 00000000-0000-0000-0003-111111111111, 'Golf', 'Gerente Comercial', '2012-02-01', '2020-11-30');

-- Registro en otra partición ('Tenis') para verificar que el filtro solo traiga golfistas
INSERT INTO trabajos_previos_golfistas (id_empleado, id_trabajo, deporte, funcion_trabajo, trabajo_desde, trabajo_hasta)
VALUES (11111111-1111-1111-1111-111111111111, 00000000-0000-0000-0004-111111111111, 'Tenis', 'Desarrollador Backend', '2021-01-10', null);


--3
-- Partición objetivo: anio = 2015, riesgo_deporte = 'Alto'
INSERT INTO empleados_deporte_riesgoAlto (
    id_empleado, id_deporte, anio,
    nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado,
    deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    11111111-1111-1111-1111-111111111111, 00000000-0000-0000-0000-000000000001, 2015,
    'Agustin', 'Monetti', 'Lobos', 'Argentina', 'Paracaidismo',
    '2015-04-12', 'Paracaidismo', 'Alto', true
);

INSERT INTO empleados_deporte_riesgoAlto (
    id_empleado, id_deporte, anio,
    nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado,
    deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    22222222-2222-2222-2222-222222222222, 00000000-0000-0000-0000-000000000002, 2015,
    'Lucas', 'Gomez', 'CABA', 'Argentina', 'Escalada',
    '2015-09-20', 'Escalada', 'Alto', false
);

INSERT INTO empleados_deporte_riesgoAlto (
    id_empleado, id_deporte, anio,
    nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado,
    deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    33333333-3333-3333-3333-333333333333, 00000000-0000-0000-0000-000000000001, 2015,
    'Sofia', 'Romero', 'Cordoba', 'Argentina', 'Paracaidismo',
    '2015-01-15', 'Paracaidismo', 'Alto', true
);

-- Partición distinta (mismo año 2015, riesgo 'Bajo')
INSERT INTO empleados_deporte_riesgoAlto (
    id_empleado, id_deporte, anio,
    nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado,
    deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    44444444-4444-4444-4444-444444444444, 00000000-0000-0000-0000-000000000003, 2015,
    'Martin', 'Perez', 'Rosario', 'Argentina', 'Ajedrez',
    '2015-06-10', 'Ajedrez', 'Bajo', true
);

-- Partición distinta (año 2018, riesgo 'Alto')
INSERT INTO empleados_deporte_riesgoAlto (
    id_empleado, id_deporte, anio,
    nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado, deporte_empleado,
    deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    55555555-5555-5555-5555-555555555555, 00000000-0000-0000-0000-000000000002, 2018,
    'Valeria', 'Diaz', 'Mendoza', 'Argentina', 'Escalada',
    '2018-11-05', 'Escalada', 'Alto', false
);

--4
-- Partición objetivo: trabajo_empleado = 'Programador'
-- Mismo programador (Agustin) practicando dos deportes distintos
INSERT INTO deportes_de_programadores (
    id_empleado, id_deporte,
    trabajo_empleado, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado,
    deporte_empleado, deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    11111111-1111-1111-1111-111111111111, 00000000-0000-0000-0000-000000000001,
    'Programador', 'Agustin', 'Monetti', 'Lobos', 'Argentina',
    'Futbol', '2019-03-01', 'Futbol', 'Bajo', true
);

INSERT INTO deportes_de_programadores (
    id_empleado, id_deporte,
    trabajo_empleado, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado,
    deporte_empleado, deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    11111111-1111-1111-1111-111111111111, 00000000-0000-0000-0000-000000000002,
    'Programador', 'Agustin', 'Monetti', 'Lobos', 'Argentina',
    'Natacion', '2021-08-15', 'Natacion', 'Bajo', false
);

-- Otro programador (Carolina) practicando un deporte de riesgo medio
INSERT INTO deportes_de_programadores (
    id_empleado, id_deporte,
    trabajo_empleado, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado,
    deporte_empleado, deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    22222222-2222-2222-2222-222222222222, 00000000-0000-0000-0000-000000000003,
    'Programador', 'Carolina', 'Herrera', 'CABA', 'Argentina',
    'Boxeo', '2020-01-10', 'Boxeo', 'Medio', true
);

-- Otro programador (Mateo) practicando un deporte
INSERT INTO deportes_de_programadores (
    id_empleado, id_deporte,
    trabajo_empleado, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado,
    deporte_empleado, deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    33333333-3333-3333-3333-333333333333, 00000000-0000-0000-0000-000000000001,
    'Programador', 'Mateo', 'Benitez', 'Rosario', 'Argentina',
    'Futbol', '2018-05-20', 'Futbol', 'Bajo', false
);

-- Partición distinta: trabajo_empleado = 'Diseniador' (no debe salir en la consulta de programadores)
INSERT INTO deportes_de_programadores (
    id_empleado, id_deporte,
    trabajo_empleado, nombre_empleado, apellido_empleado, ciudad_empleado, pais_empleado,
    deporte_empleado, deporte_desde, nombre_deporte, riesgo_deporte, federado
) VALUES (
    44444444-4444-4444-4444-444444444444, 00000000-0000-0000-0000-000000000004,
    'Diseniador', 'Laura', 'Sosa', 'Cordoba', 'Argentina',
    'Tenis', '2022-02-14', 'Tenis', 'Bajo', true
);






-- C, SELECTS
SELECT nombre_empleado,apellido_empleado,ciudad_empleado,pais_empleado,deporte_empleado,federated
FROM empleado_con_skill
WHERE id_skill = 00000000-0000-0000-0000-000000000001
	AND deporte_empleado= 'Futbol';

SELECT funcion_trabajo,trabajo_desde,trabajo_hasta 
FROM trabajos_previos_golfistas 
WHERE deporte = 'Golf';

SELECT nombre_empleado,apellido_empleado,ciudad_empleado,pais_empleado,deporte_empleado,deporte_desde,nombre_deporte,riesgo_deporte,federado 
FROM empleados_deporte_riesgoAlto 
WHERE anio = 2015 
	AND riesgo_deporte = 'Alto';
