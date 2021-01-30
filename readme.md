#### Mutants

## Requerimientos
- node 8

## Para correr el proyecto en la terminal
- Npm i
- node index.js

## Peticiones al api
Para verificar si un adn enviado es mutante y registrarlo se debe enviar al siguiente endpoint por post:
http://almo.com.co:10000/mutant

con el siguiente formato de ejemplo:
{
    "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}

### Reporte api
Para obtener el reporte del api de los mutantes y humanos registrados se puede realizar una peticion get al siguiente api:
http://almo.com.co:10000/stats