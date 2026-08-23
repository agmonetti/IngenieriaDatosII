/*
USUARIOS
	nombre
	email
	pais
	fecha_registro
	
VISUALIZACIONES
	//registra cada vez que un usuario ve un contenido
	usuario -> referenciado
	contenido -> referenciado
	fecha_visualizacion
	tiempo_visto
	completo

CONTENIDO
	tipo : //puede tener peliculas y series
	titulo
	generos
	año_lanzamiento
	duracion //en minutos
	calificacion_prom
	elenco: []


IDS USUARIOS:
    _id: ObjectId('6a8b57b24adcbb85269df8a3'),
    nombre: 'Agustin Monetti',

	_id: ObjectId('6a8b58344adcbb85269df8a5'),
	nombre: 'Lucía Fernández',

    _id: ObjectId('6a8b58344adcbb85269df8a6'),
    nombre: 'Carlos Gómez',

	_id: ObjectId('6a8b58344adcbb85269df8a7'),
	nombre: 'Elena Rossi',

	_id: ObjectId('6a8b58344adcbb85269df8a8'),
	nombre: 'Mateo Silva',

IDS CONTENIDO

	_id: ObjectId('6a8b57b24adcbb85269df8a4'),
	tipo: 'pelicula',
	titulo: 'Spider-Man 2',

	_id: ObjectId('6a8b583a4adcbb85269df8a9'),
	 tipo: 'pelicula',
	 titulo: 'Dune: Part Two',

	_id: ObjectId('6a8b583a4adcbb85269df8aa'),
	tipo: 'serie',
	titulo: 'Dark',

	_id: ObjectId('6a8b583a4adcbb85269df8ab'),
	tipo: 'pelicula',
	titulo: 'Oppenheimer',

	_id: ObjectId('6a8b583a4adcbb85269df8ac'),
	tipo: 'serie',
	titulo: 'The Bear',

*/


//USUARIOS

db.usuarios.insertOne(
	{
		nombre: "Agustin Monetti",
		email: "ags@gmail.com",
		pais: "Argentina",
		fecha_registro: new Date("2018-01-20")
	}
)

db.usuarios.insertOne({
  nombre: "Lucía Fernández",
  email: "lucia.f@gmail.com",
  pais: "Argentina",
  fecha_registro: new Date("2026-02-15")
})

db.usuarios.insertOne({
  nombre: "Carlos Gómez",
  email: "carlos.g@hotmail.com",
  pais: "España",
  fecha_registro: new Date("2025-11-10")
})

db.usuarios.insertOne({
  nombre: "Elena Rossi",
  email: "elena.rossi@gmail.com",
  pais: "Italia",
  fecha_registro: new Date("2026-06-01")
})

db.usuarios.insertOne({
  nombre: "Mateo Silva",
  email: "mateo.silva@yahoo.com",
  pais: "Uruguay",
  fecha_registro: new Date("2024-08-20")
})


//CONTENIDO

db.contenido.insertOne(
	{
		tipo: "pelicula",
		titulo: "Spider-Man 2",
		generos: ["Ciencia Ficción", "Superheroes"],
		año_lanzamiento: 2004,
		duracion: 127,
		calificacion_prom: 9.3,
		elenco: ["Tobey Maguire",
		"Kirsten Dunst",
		"James Franco",
		"Alfred Molina",
		"Rosemary Harris",
		"J.K. Simmons",]
	}
)

db.contenido.insertOne({
  tipo: "pelicula",
  titulo: "Dune: Part Two",
  generos: ["Ciencia Ficción", "Aventura"],
  año_lanzamiento: 2024,
  duracion: 166,
  calificacion_prom: 8.8,
  elenco: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"]
})

db.contenido.insertOne({
  tipo: "serie",
  titulo: "Dark",
  generos: ["Ciencia Ficción", "Drama", "Misterio"],
  año_lanzamiento: 2017,
  duracion: 60,
  calificacion_prom: 8.7,
  elenco: ["Louis Hofmann", "Oliver Masucci", "Jördis Triebel"]
})

db.contenido.insertOne({
  tipo: "pelicula",
  titulo: "Oppenheimer",
  generos: ["Drama", "Historia", "Biografía"],
  año_lanzamiento: 2023,
  duracion: 180,
  calificacion_prom: 8.9,
  elenco: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."]
})

db.contenido.insertOne({
  tipo: "serie",
  titulo: "The Bear",
  generos: ["Comedia", "Drama"],
  año_lanzamiento: 2022,
  duracion: 35,
  calificacion_prom: 8.6,
  elenco: ["Jeremy Allen White", "Ebon Moss-Bachrach", "Ayo Edebiri"]
})

//VISUALIZACION

db.visualizaciones.insertOne(
	{
		usuario_id: ObjectId('6a8b57b24adcbb85269df8a3'),
		contenido_id: ObjectId('6a8b57b24adcbb85269df8a4'),
		fecha_visualizacion: new Date("2018-02-13"),
		tiempo_visto: 127,
		completo: true
	}
)		

db.visualizaciones.insertOne({
  usuario_id: ObjectId("6a8b57b24adcbb85269df8a3"),
  contenido_id: ObjectId("6a8b583a4adcbb85269df8a9"),
  fecha_visualizacion: new Date("2026-03-01T20:30:00Z"),
  tiempo_visto: 90,
  completo: false
})

db.visualizaciones.insertOne({
  usuario_id: ObjectId("6a8b58344adcbb85269df8a5"),
  contenido_id: ObjectId("6a8b583a4adcbb85269df8aa"),
  fecha_visualizacion: new Date("2026-03-05T22:15:00Z"),
  tiempo_visto: 60,
  completo: true
})

db.visualizaciones.insertOne({
  usuario_id: ObjectId("6a8b58344adcbb85269df8a6"),
  contenido_id: ObjectId("6a8b583a4adcbb85269df8ab"),
  fecha_visualizacion: new Date("2026-03-10T18:00:00Z"),
  tiempo_visto: 180,
  completo: true
})

db.visualizaciones.insertOne({
  usuario_id: ObjectId("6a8b58344adcbb85269df8a7"),
  contenido_id: ObjectId("6a8b583a4adcbb85269df8ac"),
  fecha_visualizacion: new Date("2026-04-02T14:20:00Z"),
  tiempo_visto: 20,
  completo: false
})

db.visualizaciones.insertOne({
  usuario_id: ObjectId("6a8b58344adcbb85269df8a8"),
  contenido_id: ObjectId("6a8b583a4adcbb85269df8a9"),
  fecha_visualizacion: new Date("2026-04-15T21:00:00Z"),
  tiempo_visto: 166,
  completo: true
})

db.visualizaciones.insertOne({
  usuario_id: ObjectId("6a8b57b24adcbb85269df8a3"),
  contenido_id: ObjectId("6a8b583a4adcbb85269df8ab"),
  fecha_visualizacion: new Date("2026-05-01T19:45:00Z"),
  tiempo_visto: 110,
  completo: false
})

db.visualizaciones.insertOne({
  usuario_id: ObjectId("6a8b58344adcbb85269df8a5"),
  contenido_id: ObjectId("6a8b57b24adcbb85269df8a4"),
  fecha_visualizacion: new Date("2026-05-18T16:10:00Z"),
  tiempo_visto: 127,
  completo: true
})

db.visualizaciones.insertOne({
  usuario_id: ObjectId("6a8b58344adcbb85269df8a6"),
  contenido_id: ObjectId("6a8b583a4adcbb85269df8ac"),
  fecha_visualizacion: new Date("2026-06-12T23:00:00Z"),
  tiempo_visto: 35,
  completo: true
})

//CONSULTAS

//a) Listar todos los contenidos del género "Ciencia Ficción".  
db.contenido.find(
	{generos: "Ciencia Ficción"}
)

//b) Mostrar los usuarios registrados en el último año.
db.usuarios.find({
  fecha_registro: { $gte: new Date("2025-01-01") }
})
  
//c) Obtener las películas lanzadas después de 2020.  
db.contenido.find(
	{
		"año_lanzamiento": {$gt: 2020},
		tipo: "pelicula"
	}
)

//d) Ver el historial de visualizaciones de un usuario específico.
db.visualizaciones.find(
	{usuario_id: ObjectId('6a8b57b24adcbb85269df8a3'),}
)

//e) Listar los contenidos que tienen una duración mayor a 120 minutos.
db.contenido.find(
	{duracion: {$gt: 120}}
)

//f) Calcular el promedio de tiempo visto por usuario.  
db.visualizaciones.aggregate([
	{
		$match: { usuario_id: ObjectId('6a8b57b24adcbb85269df8a3') }
	},
	{
		$group:{
			_id: "$usuario_id",
			total_visto: {$avg: "$tiempo_visto"}
		}
	}
])

//de todos los users
db.visualizaciones.aggregate([
  {
    $group: {
      _id: "$usuario_id",
      promedio_tiempo_visto: { $avg: "$tiempo_visto" }
    }
  }
])

//g) Obtener el contenido más visualizado.  
db.visualizaciones.aggregate([
  {
    $group: {
      _id: "$usuario_id",
      tiempo_visto: { $sum: "$tiempo_visto" }
    }
  },
  {
  	$sort: {
  		tiempo_visto: -1
  	}
  },

  {
  	$limit: 1
  }
])
//h) Listar los géneros más populares según visualizaciones.  
db.visualizaciones.aggregate([
	{
		$lookup: {
			from: "contenido",
			localField: "contenido_id",
			foreignField: "_id",
			as: "result"
		}
	},
	{
		$unwind: "$result"  //aplana el array del lookup
	},
	{
		$unwind: "$result.generos"  //desglosa cada género del contenido
	},
	{
		$group: {
			_id: "$result.generos",
			cant: {$sum: 1}
		}
	},
	{
		$sort: {
			cant: -1
		}
	}
])
//i) Calcular la tasa de finalización (porcentaje de visualizaciones completadas)
// por contenido.

db.visualizaciones.aggregate([
	{
		$group: {
			_id: "$contenido_id",
			porcentaje: {$avg: "$completo"}
		}
	},
	{
		$sort: {porcentaje: -1}
	}
]) //funcionaria pero completo es una flag, entonces no sirve, no puedo calcular un avg de un flag
db.visualizaciones.aggregate([
  {
    $group: {
      _id: "$contenido_id",
      tasa_finalizacion: {
        $avg: {
          $cond: [{ $eq: ["$completo", true] }, 1, 0]
        }
      }
    }
  },
  {
    $sort: { tasa_finalizacion: -1 }
  }
])


//j) Mostrar el top 3 de usuarios que más tiempo han pasado viendo
// contenido
db.usuarios.aggregate([
	{
		$lookup: {
			from: "visualizaciones",
			localField: "_id",
			foreignField: "usuario_id",
			as: "result"
		}
	},
	{
		$unwind: "$result"
	},
	{
		$group: {
			_id: "$_id",
			nombre: { $first: "$nombre" }, //rescata el nombre del usuario para no perderlo al agrupar.
			visto: {$sum: "$result.tiempo_visto"}
		}
	},
	{
		$sort: {visto: -1}
	},
	{
		$limit: 3
	}
])
