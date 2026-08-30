// creamos un nodo de tipo persona con nombre y apellido
CREATE (os {name: 'Oscar', surname: 'Garcia'})

// comando para buscar los nodos y traerlos a todos
match (n) return (n)

//creamos mas nodos
CREATE (na {name: 'Napolitana', type: 'Dessert'})
CREATE (co {name: 'Coffe', type: 'Drink'})
CREATE (va {name: 'Vanessa', surname: 'Gomez'})

// creamos labels -> identificadores que le asignás a los nodos para agruparlos, clasificarlos y tipificarlos

MATCH (os {name: 'Oscar'}) SET os: Person //decimos que ese ondo es un nodo de tipo persona

MATCH (va {name:'Vanessa'}) SET va: Person

MATCH (co{name:'Coffe'}) SET co: Food

MATCH (na{name:'Napolitana'}) SET na: Food

//Ahora, pasamos a establecer una relacion entre los nodos.
//os, na, co o n en las queries anteriores) no son nombres que queden guardados en la base de datos, sino variables locales temporales
MATCH (o {name:'Oscar'}), (c{name:'Coffe'}) CREATE (o)-[:ADDICTED_TO]-> (c)


//Crear relaciones masivas entre dos etiquetas:

MATCH (p:Person), (f:Food) CREATE (p)-[:CONSUME]->(f)
//Qué hace:** Realiza un producto cartesiano. Busca **todas** las personas (`p`) y **todas** las comidas (`f`) y le crea una relación `[:CONSUME]` desde cada persona hacia cada comida existente.


//Crear nodos y relaciones encadenadas en un solo bloque:
CREATE (sug:Ingredient {name:'Sugar', type:'Liquid'}),
       (wat:Ingredient {name:'Water', type:'Liquid'})
WITH sug, wat
MATCH (na {name:'Napolitana'}),
      (co {name:'Coffee'})
CREATE (sug)-[:REQUIRED]->(na),
       (wat)-[:REQUIRED]->(co)

//Qué hace: Crea dos ingredientes y utiliza la cláusula `WITH` para pasar esas dos variables temporales (`sug` y `wat`) al siguiente paso, donde busca los nodos ya existentes de Napolitana y Coffee para trazarles las relaciones `[:REQUIRED]`.


//Visualizar nodos y formatear atributos en forma tabular:**

MATCH (n:Person) RETURN n

//Qué hace:Devuelve los nodos completos de tipo `Person` (mostrando las burbujas gráficas en el browser).


MATCH (n:Person) RETURN n.name AS Names, n.surname AS Surnames

//Qué hace: Devuelve una tabla plana extrayendo solo las propiedades `name` y `surname`, renombrando las columnas con el alias `AS`.


//Queries relacionales (Navegación por el grafo):

MATCH (o {name:'Óscar'})-[:CONSUME]->(f) RETURN f

//Qué hace: Busca al nodo llamado "Óscar", sigue las flechas de salida `[:CONSUME]` y retorna los nodos de comida (`f`) a los que apunta.


MATCH (o {name:'Óscar'})-[:CONSUME]->(f) RETURN f.name AS Food
//Qué hace: Igual a la anterior, pero devuelve únicamente el valor textual de la propiedad `name` en una columna llamada `Food`.


//("Un par de queries más. ¿Qué hacen?"):**

//Query A:
MATCH (o {name:'Óscar'})-[r]-(f) RETURN type(r)
//Qué hace: Busca todas las relaciones (entrantes o salientes, representadas por `-[r]-`) conectadas al nodo "Óscar" con cualquier otro nodo `f`, y utiliza la función `type(r)` para devolver únicamente los **nombres/tipos de las relaciones** (por ejemplo: `CONSUME`, `ADDICTED_TO`).


//Query B:
MATCH (n:Person) WHERE n.name = 'Vanessa' RETURN n.surname AS Surname
//Qué hace:Filtra entre los nodos con etiqueta `Person` aquel cuya propiedad `name` sea exactamente `'Vanessa'`, y retorna únicamente su apellido (`n.surname`) bajo la columna `Surname`.


//Limpiar toda la base de datos:
MATCH (n) DETACH DELETE n
