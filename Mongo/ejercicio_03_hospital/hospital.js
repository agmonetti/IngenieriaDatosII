use hospital

/*
Conceptos a modelar
pacientes:
	- datos filatorios (nombre apellido edad)
	- obra social, patologia cronica
historia clinica:
	- actualizaciones del paciente, practicas, estudios
	- medicamentos, tratamientos
medicos:
	- matricula, nombre, especialidad
procedimientos:
	-nombre, descripcion, razon, quien solicita
	- fecha, hora, profesionales que participan
	- rol de dichos profesionales
estudios
	- nombre, desc, quien solicita, fecha, hora
	- profesionales [], funcion de cada uno
internaciones
	- desc de estado inicial, diagnostico, quien solicita
	- fecha ingreso, hora ingreso, profesionales que atendieron
	- fecha alta, hora alta, derivaciones
medicamentos
	- nombre, drogra , dosis, fecha, hora, medico auth
	

*/

// Limpieza previa opcional
db.pacientes.drop()
db.medicos.drop()
db.estudios.drop()
db.procedimientos.drop()
db.internaciones.drop()
db.medicamentos.drop()
db.historia_clinica.drop()

//documentos estables, pocos cambiantes.
db.pacientes.insertOne(
	{
		nombre: "Agustin", // _id: ObjectId('6a87837cfda13a36dc9df8a3'),
		apellido: "Trezeguet",
		edad: 29,
		obra_social: "OSDE",
		patologias: ["Hipertension", "Diabetes"]
	}
)

db.medicos.insertOne(
	{
		nombre: "Jose",
		apellido: "Perez",
		edad: 59,
		matricula: "MN1001",
		especialidad: "Medico Quirurgico"
	}
)

db.medicos.insertOne(
	{
	  nombre: "Carlos",
	  apellido: "Tevez",
	  edad: 41,
	  matricula: "MN2002",
	  funcion: "Radiólogo"
	}
)

//resto de documentos, cada documento referencia a determinado documento estable
estudios
/*
	- nombre, desc, quien solicita, fecha, hora
	- profesionales [], funcion de cada uno
*/
db.estudios.insertOne({
  paciente_id: ObjectId("6a88bc5c274ff97b0d9df8a7"), // referencia paciente
  nombre_estudio: "Resonancia magnética de cráneo",
  descripcion: "Evaluación para posible operación",
  solicitado_por: {
    medico_id: ObjectId("6a88bc60274ff97b0d9df8a8"),
    nombre: "Dr Jose Perez Perez"
  },
  fecha: new Date("2018-01-20T21:00:00Z"), // Fecha + Hora unificadas
  profesionales: [
    {
      medico_id: ObjectId("6a88bc64274ff97b0d9df8a9"),
      nombre: "Dr Carlos Tevez",
      matricula: "MN2002",
      funcion: "Radiólogo"
    }
  ],
  resultados: {
    informe: "Estructuras cerebrales dentro de límites normales, sin lesiones agudas.",
    conclusiones: "Favorable para procedimiento quirúrgico"
  },
  costo: 45000 // Obligatorio para calcular gastos del paciente
})


/*
historia clinica:
	- actualizaciones del paciente, practicas, estudios
	- medicamentos, tratamientos
*/

db.historia_clinica.insertOne({
  paciente_id: ObjectId("6a88bc5c274ff97b0d9df8a7"),
  actualizaciones: [
    {
      fecha: new Date("2026-03-11T08:30:00Z"),
      medico: "MN2002 - Dr. Carlos Tevez",
      nota: "Paciente evoluciona favorablemente sin dolor de cabeza."
    },
    {
      fecha: new Date("2026-03-12T10:00:00Z"),
      medico: "MN1001 - Dr Jose Perez",
      nota: "Se autoriza el alta ambulatoria."
    }
  ],
  estudios: [
    {
      nombre: "Resonancia magnetica",
      fecha: new Date("2026-03-10T14:30:00Z"),
      medico_solicitante: "MN1001 - Dra. Laura Perez",
      profesionales: [
        { matricula: "MN2002", nombre: "Dr. Carlos Tevez", rol: "Radiologo" }
      ],
      resultado: "Sin particularidades ni lesiones agudas",
      costo: 45000
    }
  ],
  practicas_y_procedimientos: [
    {
      nombre: "Cateterismo Cardiaco",
      descripcion: "Intervencion hemodinamica diagnostica",
      razon: "Dolor precordial tipico",
      fecha: new Date("2026-03-12T09:00:00Z"),
      medico_solicitante: "MN1001 - Dra. Laura Perez",
      profesionales: [
        { matricula: "MN1001", nombre: "Dra. Laura Perez", rol: "Cirujana Principal" }
      ]
    }
  ],
  tratamientos: [
    {
      descripcion: "Plan de rehabilitacion cardiovascular",
      fecha_inicio: new Date("2026-03-15T00:00:00Z"),
      estado: "En curso"
    }
  ],
  medicamentos: [
    {
      nombre: "Lotrial",
      droga: "Enalapril",
      dosis: "10mg cada 12hs",
      fecha: new Date("2026-03-10T11:00:00Z"),
      medico_autorizante: "MN1001 - Dra. Laura Perez"
    }
  ]
})

/*
procedimientos:
	-nombre, descripcion, razon, quien solicita
	- fecha, hora, profesionales que participan
	- rol de dichos profesionales
*/

db.procedimientos.insertOne({
  paciente_id: ObjectId("6a87837cfda13a36dc9df8a0"),
  nombre: "Cateterismo Cardiaco",
  descripcion: "Intervencion hemodinamica diagnostica",
  razon: "Dolor precordial tipico",
  fecha: new Date("2026-03-12T09:00:00Z"),
  medico_solicitante: ObjectId("6a87837cfda13a36dc9df8a3"),
  profesionales: [
    {
      matricula: "MN1001",
      nombre: "Dra. Laura Perez",
      rol: "Cirujana Principal"
    }
  ]
})

/*

internaciones
	- desc de estado inicial, diagnostico, quien solicita
	- fecha ingreso, hora ingreso, profesionales que atendieron
	- fecha alta, hora alta, derivaciones
*/

db.internaciones.insertOne({
  paciente_id: ObjectId("6a87837cfda13a36dc9df8a0"),
  estado_inicial: "Descompostura estomacal aguda",
  diagnostico: "Gastroenteritis moderada con deshidratacion",
  medico_solicitante: ObjectId("6a87837cfda13a36dc9df8a3"),
  fecha_ingreso: new Date("2026-03-18T10:00:00Z"),
  profesionales: [
    {
      matricula: "MN1001",
      nombre: "Dra. Laura Perez",
      rol: "Medica de Guardia"
    }
  ],
  fecha_alta: new Date("2026-03-20T16:30:00Z"),
  derivaciones: "Control ambulatorio por Gastroenterologia en 7 dias"
})

/*medicamentos
	- nombre, drogra , dosis, fecha, hora, medico auth
*/	
db.medicamentos.insertOne({
	paciente_id: ObjectId("6a87837cfda13a36dc9df8a0"),
	nombre: "Lotrial",
    droga: "Enalapril",
    dosis: "10mg cada 12hs",
    fecha: new Date("2026-03-10T11:00:00Z"),
    medico_autorizante: ObjectId("6a87837cfda13a36dc9df8a3")
})

// CONSULTAS
//1-Resultados de un estudio a un paciente determinado.
db.estudios.find(
	{
	  paciente_id: ObjectId("6a87837cfda13a36dc9df8a0"),
	  nombre_estudio: "Resonancia magnética de cráneo"
	},
	{_id:0,resultados:1} //_id:0 para ocultar el id.
)

//2-Pacientes internados en un rango de fechas.
db.internaciones.find(
  {
    fecha_ingreso: { $gte: new Date("2026-03-01T00:00:00Z") },
    fecha_alta: { $lte: new Date("2026-03-31T23:59:59Z") }
  },
  {
    _id: 0,
    paciente_id: 1,
    fecha_ingreso: 1,
    fecha_alta: 1
  }
)

//3-Pacientes mayores de 40 años cuyo nombre comience con "M".
db.pacientes.find(
	{
		edad: {$gt: 40},
		nombre: { $regex: "^M" } // o directamente: nombre: /^M/
	},
	{
		_id: 0
	}
)

//4-Paciente que más dinero gastó en estudios.
db.estudios.ensureIndex({costo:1})

db.estudios.aggregate([

    {
        $group: {
            _id: "$costo",             // MAL: Agrupa por costo en vez de agrupar por paciente. Debe ser "$paciente_id".
            costo_total: { $sum: $costo } // MAL: Falta poner "$costo" entre comillas (sin comillas JS busca una variable inexistente).
        }
    },
    {
        $sort: { 
          costo_total: -1              // BIEN: Ordena descendentemente por el acumulador calculado.
        }
    },

    {
        $limit: 1                      // BIEN: Se queda solo con el primer resultado (el mayor).
    },                                 // MAL (Menor): Coma sobrante al final del último elemento del array.
])

db.estudios.aggregate([
  {
    $group: {
      _id: "$paciente_id",             // 1. Agrupamos por paciente
      costo_total: { $sum: "$costo" }   // 2. Sumamos el campo 'costo' de cada uno
    }
  },
  {
    $sort: { 
      costo_total: -1                   // 3. Ordenamos de mayor a menor gasto
    }
  },
  {
    $limit: 1                           // 4. Nos quedamos con el que más gastó
  }
])

db.estudios.aggregate([
  {
    $group: {
      _id: "$paciente_id",             // 1. Agrupamos por paciente
      costo_total: { $sum: "$costo" }   // 2. Sumamos el campo 'costo' de cada uno
    }
  },
  {
    $sort: { 
      costo_total: -1                   // 3. Ordenamos de mayor a menor gasto
    }
  },
  {
    $project: {
      _id: 0,
      costo_total: "$costo_total"
    }
  }
])

//5-Pacientes con determinada patología.
db.pacientes.find({ patologias: "Hipertension" })

//6-Procedimientos realizados por un médico determinado.
db.procedimientos.find(
	{
		medico_solicitante: ObjectId("6a8783c2fda13a36dc9df8b2")	
	},
	{
		_id:0,
		nombre:1,
		descripcion:1
	}
	
)

db.procedimientos.find(
  {
    "profesionales.matricula": "MN1001" // o "profesionales.nombre": "Dra. Laura Perez"
  },
  {
    _id: 0,
    nombre: 1,
    descripcion: 1,
    fecha: 1
  }
)
