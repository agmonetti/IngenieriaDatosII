use musicos

/*
La estructura debe permitir tanto musicos como bandas

	- artistas (musicos/banda)
		- nombre, apellido(si es 1 integrante)
		- ciudad, pais, date inicio
		- modo: //banda - artista solitario
		- musicos: [string "Nombre Apellido",]
		un artista tiene habilidades
		un artista tiene discos
		un artista tiene comentarios
		
	- habilidades -> incrustado en artistas
		[{nombre: "",
		    estilo: "",       
		    nivel: ""}]
	- discos -> incrustado en artistas
	[{  titulo: "",
	    anio: n }]
	- comentarios -> incrustado en artistas
	[ texto:""]
*/
db.artistas.insertOne(
	{
		nombre: "Carlos",
		apellido: "Santana",
		modo: "Solista",
		ciudad: "Los Angeles",
		pais: "USA",
		habilidades: [
			{
				nombre: "Guitarrista",
				estilo: "Rockero",
				nivel: "Superlativo"
			}
		],
		//fecha_inicio: no tiene.
		//musicos: solista, asi que vacio.
		discos: [],
		comentarios: []
	}
)

db.artistas.insertOne(
	{
		nombre: "David",
		apellido: "Lebon",
		modo: "Parte de un grupo",
		habilidades: [
			{
				nombre: "Bajista",
				estilo: "Blusero",
				nivel: "Muy bueno"
			}
		],
		//fecha_inicio: no tiene.
		//musicos: solista, asi que vacio.
		discos: [],
		comentarios: []
	}
)
db.artistas.insertOne(
	{
		nombre: "Juana",
		apellido: "Molina",
		modo: "propia",
		ciudad: "Montevideo",
		pais: "Uruguay",
		habilidades: [
			{
				nombre: "Voz",
				nivel: "Superlativa"
			}
		],
		//fecha_inicio: no tiene.
		//musicos: solista, asi que vacio.
		discos: [],
		comentarios: []
	}
)
db.artistas.insertOne(
	{
		nombre: "Angus",
		apellido: "Young",
		modo: "Showman",
		ciudad: "Glasgow",
		pais: "Escocia",
		habilidades: [
			{
				nombre: "Guitarrista",
				nivel: "Increible"
			}
		],
		//fecha_inicio: no tiene.
		//musicos: solista, asi que vacio.
		discos: [],
		comentarios: []
	}
)

db.artistas.insertOne(
	{
		nombre: "Ghost",
		modo: "Banda",
		ciudad: "Linkoping",
		pais: "Suecia",
		habilidades: [
			{
				nivel: "Increible show"
			}
		],
		fecha_inicio: 2006,
		//musicos: solista, asi que vacio.
		discos: [],
		comentarios: []
	}
)

db.artistas.insertOne(
	{
		nombre: "Rammstein",
		modo: "Banda",
		ciudad: "Berlin",
		pais: "Alemania",
		fecha_inicio: 1990,
		musicos:["Christoph Schneider", "Oliver Riedel"],
		discos: [],
		comentarios: []
	}
)


// CONSULTAS
//1- Obtener todos los documentos.
db.artistas.find()
//2- Obtener los documentos con habilidad "guitarrista".
db.artistas.find(
	{"habilidades.nombre":"Guitarrista"}
)
//3- Obtener los documentos con habilidad "blusero".
db.artistas.find(
	{"habilidades.estilo":"Blusero"}
)
//4- Obtener los discos comprendidos entre los años 2000 y 2010.
db.artistas.find(
	{
		"discos.anio": {$gte:2000, $lte:2010}
	}
)/*
puede dar falsos positivos. forma correcta es usar elemMatch
Con $elemMatch, MongoDB obliga a que el mismo elemento cumpla ambas condiciones (2000 <{anio} <2010) a la vez.
*/
db.artistas.find({
  discos: {
    $elemMatch: {
      anio: { $gte: 2000, $lte: 2010 }
    }
  }
})

//Operación 1: Agregar habilidades a un músico. 
db.artistas.updateOne(
  { nombre: "Ghost" },
  {
    $push: {
      habilidades: { estilo: "Pop"}
    }
  }
)
db.artistas.updateOne(
  { nombre: "Rammstein" },
  {
    $push: {
      habilidades: {
        estilo: "Rock Nacional",
        nivel: "Top Global"
      }
    }
  }
)

//Operación 2: Agregar una ciudad a un músico.  
db.artistas.updateOne(
	{nombre:"David"},
	{$set: {ciudad: "Lobos"}}
)

//Operación 3: Agregar discos a una banda.  
/*
	- discos 
	[{  titulo: "",
	    anio: n }]
*/
db.artistas.updateOne(
	{nombre:"Ghost"},
	{
		$push: {
			discos: {
				titulo:"Piloto",
				anio: 2020
			}
		}
	}
)

//Operación 4: Agregar músicos a una banda. 
db.artistas.updateOne(
	{nombre: "Rammstein"},
	{
		$push: {
			musicos: "Agustin Monetti"
		}
	}
)

//Operación 5: Cambiar el país de nacimiento de un intérprete.  
db.artistas.updateOne(
	{nombre:"Carlos"},
	{$set: {pais: "Argentina"}}
)

//Operación 6: Eliminar un disco de una banda.  
db.artistas.updateOne(
  { nombre: "Ghost" },
  {
    $pull: {
      discos: { titulo: "Piloto" }
    }
  }
)

//Operación 7: Cambiar el nivel de una habilidad.  
db.artistas.updateOne(
  { nombre: "Ghost" },
  {
    $set: {
      habilidades: { nivel: "Show normalito" }
    }
  }
)

//Operación 8: Agregar comentarios a una banda, permitiendo más de un comentario.
db.artistas.updateOne(
  { nombre: "Ghost" },
  {
    $push: {
      comentarios: {
        $each: ["Geniales", "Dia 12, mucho mejor"]
      }
    }
  }
)
