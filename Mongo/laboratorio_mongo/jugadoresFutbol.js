//limpiar consola
cls

/*
1- EXPRESIONES REGULARES - COMANDOS DE ACTUALIZACION
*/

use lab

//Insertar documento en la coleccion 'players'
db.players.insertOne(
	{name:'Aaron Appindangoye', height: 182, weight: 187}
)

//Revisar las colecciones
db.getCollectionNames()

//Comando 'coleccion'.find() para traer los docs
db.players.find()

//Para ver la coleccion de indices del sistema
db.system.indexes.find() //obsoleto
db.players.getIndexes()

//para ver como mongo hace la busqueda de mi jugador
db.players.find({name: "Aaron Appindangoye"}).explain("executionStats")


//borrar un docmento, si no se indica nada, se borran todos
db.players.remove() //obsoleto
/*
DeprecationWarning: Collection.remove() is deprecated. Use deleteOne, deleteMany, findOneAndDelete, or bulkWrite.
MongoshInvalidInputError: [COMMON-10001] Missing required argument at position 0 (Collection.remove)
*/

//mas inserciones
db.players.insertOne({name:'Edinson Cavani', height: 182, dob: new Date(1987,2,14,0,0)})

db.players.insertOne({name:'Luka Modric', height: 180, weight:143, dob: new Date(1985,9,9,0,0), preferred_foot:'right', hobbies:['Playing football','Watching TV series','Swimming']})

db.players.insertOne({name:'Harry Kane', weight:143, dob: new Date(1993,7,28,0,0), preferred_foot:'right', hobbies:['Watching Movies','Swimming']})

db.players.insertOne({name:'Neymar', height:175, weight:150, dob:new Date(1992,2,5,0,0), preferred_foot:'right', hobbies:['Video games','Watching TV series','Swimming']})

db.players.insertOne({name:'David Silva', height:170, weight:148, dob:new Date(1986,8,1,0,0), preferred_foot:'left', hobbies:['Playing football','Watching Movies']})

db.players.insertOne({name:'Eden Hazard', height:172, weight:163, dob:new Date(1991,1,7,0,0), preferred_foot:'right', hobbies:['Watching Movies','Video games','Watching TV series']})

db.players.insertOne({name:'Antoine Griezmann', height:175, weight:148, dob:new Date(1991,3,21,0,0), preferred_foot:'left', hobbies:['Video games','Swimming']})

db.players.insertOne({name:'Lionel Messi', height:170, weight:159, dob:new Date(1987,6,24,0,0), preferred_foot:'left', hobbies:['Watching Movies','Video games','Watching TV series','Swimming']})

db.players.insertOne({name:'Cristiano Ronaldo', height:185, weight:176, dob:new Date(1985,2,5,0,0), preferred_foot:'left', hobbies:['Video games','Swimming']})

db.players.insertOne({name:'Toni Kroos', height:182, weight:172, dob:new Date(1990,1,4,0,0), preferred_foot:'right', hobbies:['Watching Movies','Video games','Watching TV series']})

db.players.insertOne({name:'Sergio Ramos', height:182, weight:165, dob:new Date(1986,3,30,0,0), preferred_foot:'right', hobbies:['Video games','Watching TV series']})

db.players.insertOne({name:'Samuel Umtiti', height:180, weight:165, dob:new Date(1993,11,14,0,0), preferred_foot:'left', hobbies:['Playing football','Swimming']})

db.players.insertOne({name:'Paulo Dybala', height:175, weight:161, dob:new Date(1993,11,15,0,0), preferred_foot:'left', hobbies:['Playing football','Watching TV series','Swimming']})

//busqueda de left foot y peso mayor a 170 libras
db.players.find({preferred_foot: 'left', weight:{$gt:170}})

//para ver los documentos cuyo campo altura de no existe
db.players.find({height:{$exists:false}})

/*
Busca jugadores que cumplan:
1- preferred_foot: 'right'
Y además:
2- al menos UNA de estas condiciones ($or):
	tenga "Playing football" en hobbies
	tenga "Video games" en hobbies
	tenga weight < 150
*/

db.players.find(
{
	preferred_foot:'right',
	$or:[
		{hobbies:'Playing football'},
		{hobbies:'Video games'},
		{weight:{$lt:150}}
	]
}
)

// jugadores que empiecen con letra 'S'
db.players.find({name: { $regex: "^S"}})

//update de un jugador -deprecado
db.players.update({name: 'Lionel Messi'},{weight:180})
/*
DeprecationWarning: Collection.update() is deprecated. Use updateOne, updateMany, or bulkWrite.
MongoInvalidArgumentError: Update document requires atomic operators
- Si ejecutaba eso, se remplazaba todo la coleccion con ese campo solamente.
*/
// La forma correcta de hacerlo:
db.players.updateOne(
  { name: 'Lionel Messi' },           // 1. Filtro (¿A quién busco?)
  { $set: { weight: 180 } }           // 2. Operación (¿Qué cambio específicamente?)
)

//david silva, ahora le gusta nadar:
db.players.update({name: 'David Silva'},{$push:{hobbies:'Swimming'}})

// agregar el campo 'hits' al documento 'players', 'inc' funciona como incremento
db.hits.update(
    { page: 'players' },
    { $inc: { hits: 1 } },
    true //deprecated, ahora: {upsert:true} en lugar de solo 'true'
);



/*
2- COMANDOS DE SELECCION DE CAMPOS
*/

//ver todos los nombres de los jugadores
db.players.find(null,{name:1}); //deprecado
db.players.find(
    {}, // -> traeme todos los documentos
    { name: 1 }
)

//si no quiero ver el id
db.players.find(
    {},
    {
        _id: 0,
        name: 1
    }
) //antes era asi: db.players.find(null,{name:1, _id:0});

//ver los jugadores mas altos primeros
db.players.find().sort({height:-1})

//ver los jugadores, organizados primero por nombre y luego por peso
db.players.find().sort({name:1, weight:-1})

//paginar los resultados con limit y skip -> obtener el segundo y tercer jugador mas pesado
db.players.find().sort({weight:-1}).limit(2).skip(1)

//se puede hacer un count para contar los elementos que cumplen con cierta condicion
/*lab> db.players.count({hobbies:'Swimming'})
DeprecationWarning: Collection.count() is deprecated. Use countDocuments or estimatedDocumentCount.
9   -> funcionó, pero esta deprecado.
*/
lab> db.players.countDocuments({hobbies:'Swimming'})
9


/*
3- DOCUMENTOS EMBEBIDOS
*/

//a ronaldo, le agregamos un documento adentro, con la info de su equipo

/*
db.players.update(
	{name: 'Cristiano Ronaldo'},
	{$set:
		{
			team:{
				team_long_name: 'Juventus',
			 	team_short_name: 'JUV'
		 	}
			 	
		}
	}
)
---> tambien deprecado, nuevo:
*/

db.players.updateOne(
    { name: 'Cristiano Ronaldo' },
    {
        $set: {
            team: {
                team_long_name: 'Juventus',
                team_short_name: 'JUV'
            }
        }
    }
)

//se puede acceder a este documetno embebido asi:
db.players.find({'team.team_short_name': 'JUV'})

/*
4- INDICES Y ADMINISTRACION
*/
//creacion
db.players.ensureIndex({name:1})

//eliminacion
db.players.dropIndex({name:1})
//creacion indice unico
db.players.ensureIndex({name:1},{unique:true})
//indice compuesto
db.players.ensureIndex({name:1, weight:1})

//puedo usar explain, para ver si la querie esta usando indices o no
db.players.find().explain()

//ahi esta usando el indice 'name'
db.players.find({name: 'Lionel Messi'}).explain()
