use cartelera // 'x' nombre
/*
A - Inserciones en documento 'peliculas'
	{
		title -> string
		writer ->  strubg
		year -> string/int/date
		actors -> [string]
		franchise -> string
		
		B - actualizacion de documentos
		synopsis -> string
	}
*/

db.peliculas.insertMany([
{title: "Fight Club", writer: "Chuck Palahniuk", year: 1999, actors: ["Bradd Pitt", "Edward Norton"]},
{},
])

//one liner para evitar problemaas de crasheo de mongosh:
db.peliculas.insertMany([{title: "Fight Club", writer: "Chuck Palahniuk", year: 1999, actors: ["Brad Pitt", "Edward Norton"]}, {title: "Pulp Fiction", writer: "Quentin Tarantino", year: 1994, actors: ["John Travolta", "Uma Thurman"]}, {title: "Inglorious Basterds", writer: "Quentin Tarantino", year: 2009, actors: ["Brad Pitt", "Diane Kruger", "Eli Roth"]}, {title: "The Hobbit: An Unexpected Journey", writer: "J.R.R. Tolkein", year: 2012, franchise: "The Hobbit"}, {title: "The Hobbit: The Desolation of Smaug", writer: "J.R.R. Tolkein", year: 2013, franchise: "The Hobbit"}, {title: "The Hobbit: The Battle of the Five Armies", writer: "J.R.R. Tolkein", year: 2012, franchise: "The Hobbit", synopsis: "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."}, {title: "Pee Wee Herman's Big Adventure"}, {title: "Avatar"}])

// B - 
db.peliculas.updateOne(
	{title: "The Hobbit: An Unexpected Journey"}, //filtro
	{$set:{synopsis: "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}} //campo a updatear
	)
//busco los documentos que tienen el campo de synopsis. 
db.peliculas.find({ synopsis: { $exists: true, $ne: null } })

db.peliculas.updateOne(
	{title: "The Hobbit: The Desolation of Smaug"}, //filtro
	{$set:{synopsis: "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."}} //campo a updatear
	)

db.peliculas.updateOne(
	{title: "Pulp Fiction"}, //filtro
	{$set: { actors: ["Samuel L. Jackson"] }}, //campo
)

db.peliculas.updateOne(
	{title: "Avatar"}, //filtro
	{$set: { actors: ["Sam Worthington", "Zoe Saldaña", "Stephen Lang", "Sigourney Weaver","Michelle Rodríguez"] }}, //campo
)
db.peliculas.updateOne(
  { title: "Pee Wee Herman's Big Adventure" },
  { 
    $set: { 
      writers: [
        "Tom McCarthy", 
        "Alex Ross Perry", 
        "Allison Schroeder"
      ] 
    } 
  }
)

// C - consultas
//1 - obtener todos los documentos
db.peliculas.find()

//2 - obtener todos los docs de writer de Quentin Tarantino
db.peliculas.find(
	{writer: "Quentin Tarantino"}
)

/*
antes de seguir, quise envolver en array a todos los docs con writer que estaban con string
db.peliculas.updateMany(
  { writer: { $type: "string" } },
  [{ $set: { writer: ["$writer"] } }]
)
*/

//3- OBtener documentos con actor bradd pitt
db.peliculas.find(
	{actors: "Brad Pitt"}
)

//4- obtener documentos confranchise igual a the hobbit
db.peliculas.find(
	{ franchise: "The Hobbit"}
)
//5- obtener todas las peliculas de los 90s
db.peliculas.find(
  {year: { $gte: 1990, $lte: 1999 }}
)

//6- obtener todas las peliculas entre el 2000 y 2010
db.peliculas.find(
	{ year: { $gte: 2000, $lte: 2010 }}
)

// D - busquedas por texto
//1.Encontrar las películas que en la sinopsis contengan la palabra "Bilbo"  
db.peliculas.find(
	{synopsis: {$in: "Bilbo"}} // MongoServerError[BadValue]: $in needs an array - no sirve
)

// Requiere previo: db.peliculas.createIndex({ synopsis: "text" })
db.peliculas.createIndex({ synopsis: "text" })
db.peliculas.find({
  $text: { $search: "Bilbo" }
})

//2.Encontrar las películas que en la sinopsis contengan la palabra "Gandalf"
db.peliculas.find({
  $text: { $search: "Gandalf" }
})

//3.Encontrar las películas que en la sinopsis contengan la palabra "Bilbo" y no la palabra "Gandalf"
db.peliculas.find({
  $text: { $search: 'Bilbo -Gandalf' }
})


//4.Encontrar las películas que en la sinopsis contengan la palabra "dwarves" ó "hobbit"
db.peliculas.find(
	{synopsis: {$exists: "Gandalf"} or {$exists: "hobbit"}} //no sirve
)

db.peliculas.find({
  $text: { $search: "Gandalf hobbit" }
})

//5. Encontrar las películas que en la sinopsis contengan la palabra "gold" y "dragon"
db.peliculas.find({
  $text: { $search: "gold dragon" }
})
