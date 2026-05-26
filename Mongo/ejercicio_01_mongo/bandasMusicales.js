// creamos base de dato
use musicosJovenes

// vamos a usar una unica coleccion -> bandas
//insercion de primera banda
db.bandas.insertOne(
{
	nombre: 'Ver K Bitch',
	genero: 'Instrumental',
	//estilo: '' , no va a asi, directamente se omite.
	fecha_inscripcion: new Date("2018-01-20"),
	discos: [
		{titulo: 'Dios aguero negro', anio: 2008},
		{titulo: 'Apichonados', anio: 2007},
		{titulo: 'Meridiano',anio:2006},
		{titulo: 'Causalidades',anio:2005},
		{titulo: 'Planeta esmeralda',anio:2001},
	],	
	barrio: 'Versales',
	integrantes: 1
	
	
}) /*debo aplastarlo para mongosh

db.bandas.insertOne({nombre: 'Ver K Bitch',	genero: 'Instrumental',fecha_inscripcion: new Date("2018-01-20"),	discos: [
	{titulo: 'Dios aguero negro', anio: 2008},{titulo: 'Apichonados', anio: 2007},{titulo: 'Meridiano',anio:2006},
	{titulo: 'Causalidades',anio:2005},		{titulo: 'Planeta esmeralda',anio:2001},
	],	barrio: 'Versales',integrantes: 1})

*/
//resto de inserciones:
db.bandas.insertMany([{nombre: 'TROTAMUNDOS', genero: 'INDIE', fecha_inscripcion: new Date("2017-11-30"), discos: [{titulo: 'HECHO BOLITA', anio: 2014}], barrio: 'VILLA LURO', integrantes: 4}, {nombre: 'EFECTO ALFONS', genero: 'ROCK', estilo: 'POWER TRIO', fecha_inscripcion: new Date("2017-11-27"), discos: [{titulo: 'EFECTO ALFONS', anio: 2000}], barrio: 'BARRACAS', integrantes: 3}, {nombre: 'MARCELO GIULLITTI', genero: 'SOLISTA', fecha_inscripcion: new Date("2017-11-26"), barrio: 'AGRONOMIA', integrantes: 1}, {nombre: 'AFTERLIFE', genero: 'ROCK', estilo: 'ROCK ALTERNATIVO', fecha_inscripcion: new Date("2017-11-14"), barrio: 'BALVANERA', integrantes: 5}, {nombre: 'VIRGINIA FERREYRA', genero: 'ROCK', estilo: 'ROCK POP', fecha_inscripcion: new Date("2017-11-14"), barrio: 'VILLA DEL PARQUE', integrantes: 1}, {nombre: 'LMV', genero: 'POP', fecha_inscripcion: new Date("2017-11-10"), barrio: 'LA LUCILA', integrantes: 6}, {nombre: 'EFECTO ALFONS', genero: 'ROCK', estilo: 'POWER TRIO', fecha_inscripcion: new Date("2017-11-06"), discos: [{titulo: 'EFECTO ALFONS', anio: 1995}], barrio: 'BARRACAS', integrantes: 3}, {nombre: 'TANTAS PREGUNTAS', genero: 'PUNK', estilo: 'PUNK ROCK', fecha_inscripcion: new Date("2017-10-27"), discos: [{titulo: 'DESPUES DE TODO', anio: 2006}, {titulo: 'LIBRE ALBEDRIO', anio: 2006}], barrio: 'MORENO', integrantes: 3}, {nombre: 'TAL VEZ DE PASO', genero: 'POP', estilo: 'POP ROCK', fecha_inscripcion: new Date("2017-10-26"), barrio: 'PUERTO MADERO', integrantes: 4}, {nombre: 'LA SURTIDA FOLCK', genero: 'FOLKLORE', fecha_inscripcion: new Date("2017-10-25"), barrio: 'BERAZATEGUI', integrantes: 7}, {nombre: 'JAYDEE M', genero: 'HIP HOP / RAP', fecha_inscripcion: new Date("2017-10-24"), barrio: 'BARRACAS', integrantes: 1}])

// 1- ordenar bandas por numero de integrantes, orden creciente (ascendente)
db.bandas.find().sort({ integrantes: 1 })

// 2- las dos bandas con mas integrantes
db.bandas.find().sort({ integrantes: -1 }).limit(2)

// 3- sumar un integrante mas a todas las bandas.
db.bandas.updateMany(
	//falta el filtro, y como son todos los documentos:
	{}, //significa todos los docs
	{$inc: {integrantes:1} }
)

//4 - bandas cuyo genero es rock
db.bandas.find({genero: 'Rock'})

// 5- bandas que lanzaron su disco en el año 2006. Tengo que hacer una pipeline porque tengo que desarmar los arrays
db.bandas.aggregate([
    { $match: { "discos.anio": 2006 } }
])

db.bandas.find({ "discos.anio": 2006 })

//6 - cantidad de bandas en el barrio barracas
db.bandas.aggregate([
    { $match: { barrio: 'BARRACAS' } },
    { $count: "cantidad_bandas" } // <- nombre al campo de salida si o si
])

db.bandas.countDocuments({barrio:'BARRACAS'})
