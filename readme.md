#### Mutants

## Requerimientos
- node 8

## Para correr el proyecto en la terminal
- Npm i
- node index.js

## Peticiones al api
Para verificar si un adn enviado es mutante y registrarlo se debe enviar al siguiente enpoint por post:
http://almo.com.co:10000/mutant

con el siguiente formato de ejemplo:
{
    "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}

### Para obtener reporte de api
Para obter el reporte de api de los mutantes y humano registrados se puede realizar una peticion get al siguiente api:
http://almo.com.co:10000/stats