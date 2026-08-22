use causas

/*
CAUSAS JUDICIALES
	-nro expediente 
	-caratula
	-causantes []
	-abogados_defensores []
	-fiscal	
	-fecha_presentacion
	-fecha_vencimiento
	-juzgado_denuncia
	-juzgado_actual
	-juez
	-area
	-escritos[]

ABOGADOS -> incrustado en causas
	- nombre
	- nro matricula

JUECES y FISCALES -> incrustado en causas
	- nombre
	- nro matricula
	- juzgado_trabajo
	- tipo_juzgado //federal, casacio, etc.

CAUSANTES -> incrustado en causas
	- nombre
	- documento
	- ultima_direccion

ESCRITOS -> incrustado en causas.
	- fecha
	- realizado_por //abogado o fiscal
	- texto
	- peritos
	- dictamines

COMO HAY un fiscal y un juez
Ponerlos como subdocumentos directos ({ ... })
simplifica las lecturas y evita arrays innecesarios de un solo elemento.
*/

db.causas.insertOne({
	nro_expediente: "EXP-2024-001",
	caratula: "Fiscalía c/ Gómez, Juan s/ Hurto agravado",
	causantes: [
	  {
	    nombre: "Agustin Monetti",
	    documento: "22485012",
	    ultima_direccion: "Perito Moreno 92"
	  }
	],
	abogados_defensores: [
	  {
	    nombre: "Luca Penal",
	    nro_matricula: "MAT-001"
	  },
	  {
	    nombre: "Pedro Picapiedras",
	    nro_matricula: "MAT-REY-001"
	  }
	],
	fiscal: {
	  nombre: "Juan el fiscal",
	  nro_matricula: "FISC-001",
	  juzgado_trabajo: "Lobos",
	  tipo_juzgado: "Federal"
	},
	fecha_presentacion: new Date("2018-01-20T21:00:00Z"),
	fecha_vencimiento: new Date("2018-02-20T21:00:00Z"),
	juzgado_denuncia: "Peperolo",
	juzgado_actual: "Lobos",
	juez: {
	  nombre: "Fran el juez",
	  nro_matricula: "JU-001",
	  juzgado_trabajo: "Lobos",
	  tipo_juzgado: "Federal"
	},
	area: "Penal",
	escritos: [
	  {
	    fecha: new Date("2018-01-25T13:00:00Z"),
	    realizado_por: "Juan el fiscal",
	    texto: "Se solicita prisión preventiva por riesgo de fuga.",
	    peritos: ["Dr. Forense Rossi"],
	    dictamenes: "Dictamen pericial toxicológico positivo."
	  }
	]
})

db.causas.insertOne({
	nro_expediente: "EXP-2024-002",
	caratula: "Fiscalía c/ Rossi, Martín s/ Estafa electrónica",
	causantes: [
	  {
	    nombre: "Martín Rossi",
	    documento: "38999111",
	    ultima_direccion: "Av. Corrientes 1420, CABA"
	  }
	],
	abogados_defensores: [
	  {
	    nombre: "Luca Penal",
	    nro_matricula: "MAT-001"
	  }
	],
	fiscal: {
	  nombre: "Juan el fiscal",
	  nro_matricula: "FISC-001",
	  juzgado_trabajo: "Lobos",
	  tipo_juzgado: "Federal"
	},
	fecha_presentacion: new Date("2024-03-10T10:00:00Z"),
	fecha_vencimiento: new Date("2024-09-10T10:00:00Z"),
	juzgado_denuncia: "CABA",
	juzgado_actual: "Lobos",
	juez: {
	  nombre: "Fran el juez",
	  nro_matricula: "JU-001",
	  juzgado_trabajo: "Lobos",
	  tipo_juzgado: "Federal"
	},
	area: "Penal Económico",
	escritos: [
	  {
	    fecha: new Date("2024-03-15T11:30:00Z"),
	    realizado_por: "Luca Penal",
	    texto: "Solicitud de excarcelación bajo caución juratoria.",
	    peritos: ["Lic. Informática Vega"],
	    dictamenes: "No se hallaron registros de transferencias directas en la IP analizada."
	  },
	  {
	    fecha: new Date("2024-03-20T09:15:00Z"),
	    realizado_por: "Juan el fiscal",
	    texto: "Oposición al pedido de excarcelación.",
	    peritos: [],
	    dictamenes: "Riesgo de entorpecimiento probatorio por borrado remoto de servidores."
	  }
	]
	})

db.causas.insertOne({
	nro_expediente: "EXP-2024-003",
	caratula: "López, Roberto c/ Transporte Sur s/ Daños y perjuicios",
	causantes: [
	  {
	    nombre: "Esteban Morales",
	    documento: "30444555",
	    ultima_direccion: "Ruta 205 Km 100, Lobos"
	  },
	  {
	    nombre: "Transporte Sur SRL",
	    documento: "30712345678",
	    ultima_direccion: "Calle 12 N° 450, La Plata"
	  }
	],
	abogados_defensores: [
	  {
	    nombre: "Carla Benítez",
	    nro_matricula: "MAT-CIV-044"
	  }
	],
	fiscal: {
	  nombre: "María Fiscala",
	  nro_matricula: "FISC-002",
	  juzgado_trabajo: "La Plata",
	  tipo_juzgado: "Civil y Comercial"
	},
	fecha_presentacion: new Date("2023-11-01T08:00:00Z"),
	fecha_vencimiento: new Date("2025-11-01T08:00:00Z"),
	juzgado_denuncia: "Lobos",
	juzgado_actual: "La Plata",
	juez: {
	  nombre: "Héctor Juez",
	  nro_matricula: "JU-002",
	  juzgado_trabajo: "La Plata",
	  tipo_juzgado: "Civil y Comercial"
	},
	area: "Civil",
	escritos: []
	})

db.causas.insertOne({
	nro_expediente: "EXP-2024-004",
	caratula: "Fiscalía c/ Benítez, Marcos y otros s/ Narcotráfico",
	causantes: [
	  {
	    nombre: "Marcos Benítez",
	    documento: "41002003",
	    ultima_direccion: "Calle Falsa 123, Morón"
	  },
	  {
	    nombre: "Agustin Monetti",
	    documento: "22485012",
	    ultima_direccion: "Perito Moreno 92, Lobos"
	  }
	],
	abogados_defensores: [
	  {
	    nombre: "Pedro Picapiedras",
	    nro_matricula: "MAT-REY-001"
	  },
	  {
	    nombre: "Silvia Defensora",
	    nro_matricula: "MAT-PUB-102"
	  }
	],
	fiscal: {
	  nombre: "Juan el fiscal",
	  nro_matricula: "FISC-001",
	  juzgado_trabajo: "Lobos",
	  tipo_juzgado: "Federal"
	},
	fecha_presentacion: new Date("2024-01-15T14:20:00Z"),
	fecha_vencimiento: new Date("2024-12-31T12:00:00Z"),
	juzgado_denuncia: "Morón",
	juzgado_actual: "Lobos",
	juez: {
	  nombre: "Fran el juez",
	  nro_matricula: "JU-001",
	  juzgado_trabajo: "Lobos",
	  tipo_juzgado: "Federal"
	},
	area: "Federal",
	escritos: [
	  {
	    fecha: new Date("2024-01-18T10:00:00Z"),
	    realizado_por: "Juan el fiscal",
	    texto: "Presentación de informe de allanamiento y secuestro de material.",
	    peritos: ["Dr. Químico Suárez"],
	    dictamenes: "Sustancia incautada dio positivo para clorhidrato de cocaína."
	  },
	  {
	    fecha: new Date("2024-02-02T16:45:00Z"),
	    realizado_por: "Pedro Picapiedras",
	    texto: "Nulidad del allanamiento por vicios de procedimiento.",
	    peritos: [],
	    dictamenes: "Acta de allanamiento carece de testigos hábiles requeridos por el CPPN."
	  },
	  {
	    fecha: new Date("2024-02-10T12:00:00Z"),
	    realizado_por: "Silvia Defensora",
	    texto: "Pedido de prisión domiciliaria por motivos de salud.",
	    peritos: ["Dra. Forense Álvarez"],
	    dictamenes: "El imputado presenta cuadro clínico incompatible con régimen carcelario común."
	  }
	]
	})

db.causas.insertOne({
	nro_expediente: "EXP-2024-005",
	caratula: "Banco Central c/ Financiera Delta s/ Infracción Ley Cambiaria",
	causantes: [
	  {
	    nombre: "Claudio Valenzuela",
	    documento: "18333222",
	    ultima_direccion: "San Martín 800, CABA"
	  }
	],
	abogados_defensores: [
	  {
	    nombre: "Luca Penal",
	    nro_matricula: "MAT-001"
	  }
	],
	fiscal: {
	  nombre: "María Fiscala",
	  nro_matricula: "FISC-002",
	  juzgado_trabajo: "La Plata",
	  tipo_juzgado: "Penal Económico"
	},
	fecha_presentacion: new Date("2024-05-02T09:00:00Z"),
	fecha_vencimiento: new Date("2025-05-02T09:00:00Z"),
	juzgado_denuncia: "CABA",
	juzgado_actual: "Lobos",
	juez: {
	  nombre: "Fran el juez",
	  nro_matricula: "JU-001",
	  juzgado_trabajo: "Lobos",
	  tipo_juzgado: "Federal"
	},
	area: "Penal Cambiario",
	escritos: [
	  {
	    fecha: new Date("2024-05-10T11:00:00Z"),
	    realizado_por: "Luca Penal",
	    texto: "Descargo y presentación de balances contables auditados.",
	    peritos: ["Contador Oficial Díaz"],
	    dictamenes: "Operaciones registradas con respaldo en el sistema financiero oficial."
	  }
	]
})

// CONSULTAS
//Consulta 1: Recuperar una causa por alguno de los acusados.
db.causas.find(
	{"causantes.nombre": "Agustin Monetti"}
)

//Consulta 2: Consultar cuántos escritos tiene adosada esa causa.
db.causas.aggregate([
  { $match: { nro_expediente: "EXP-2024-004" } },
  {
    $project: {
      _id: 0,
      nro_expediente: 1,
      cantidad_escritos: { $size: "$escritos" }
    }
  }
])

//Consulta 3: Consultar en qué causas participó un abogado como defensor.
db.causas.aggregate([
  {
    $match: {
      "abogados_defensores.nombre": "Pedro Picapiedras"
    }
  },
  {
    $project: {
      _id: 0,
      nro_expediente: 1,
      caratula: 1,
      area: 1
    }
  }
])

db.causas.find(
  { "abogados_defensores.nombre": "Pedro Picapiedras" },
  { nro_expediente: 1, caratula: 1, _id: 0 }
)
