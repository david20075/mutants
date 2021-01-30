const express = require('express')
const {Sequelize,  Model, DataTypes } = require('sequelize');
const bodyParser = require("body-parser");
const app = express()
const port = 10000;
const sequelize = new Sequelize('mysql://david2007514:mocion.2040@db4free.net:3306/xmen2007514');
class Dna extends Model {}
Dna.init({
	dna: DataTypes.JSON,
	mutant: DataTypes.BOOLEAN
  }, { sequelize, modelName: 'dna' });

  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/mutant', (req, res) => {
	let {dna} = req.body;
	if(analysisDna(dna) > 1){
		saveDna(dna, true);
		return res.status(200).send({response:'ok'});
	}else{
		saveDna(dna, false);
		return res.status(403).send();
	}
	
  })
  app.get('/stats', async (req, res) => {
	let mutant = await Dna.count({ where: {'mutant': true} });
	let human = await Dna.count({ where: {'mutant': false} });
	let ratio = mutant / human;
	return res.send({"count_mutant_dna":mutant, "count_human_dna":human, "ratio":ratio});
  })

app.listen(port, () => {

  
})

function analysisDna(dna){
	let matches = [];
	dna.forEach((rowDna, index)=>{
	  let countHorinzonantal = horinzontalMatches(rowDna, dna);
	  let countVertical = verticalMatches(rowDna, dna,index);
	  let countDiagonalRight = diagonalRight(rowDna, dna,index); 
	  let countDiagonalLeft = diagonalLeft(rowDna, dna,index);  
		matches.push(countHorinzonantal);
		matches.push(countVertical);
		matches.push(countDiagonalRight);
		matches.push(countDiagonalLeft);
	})
	let items = matches.reduce((a,b)=> a+b);
	return items
}

//verify if exist a horizontal match
function horinzontalMatches(row, Dna){
	let res = [];
	[...row].forEach((letter, index)=>{
	 let matches =  [row[index] == row[index+1], row[index] == row[index+2] , row[index] == row[index+3]]; 
	
	 let valueMatch = matches.every(value=> value) ? 1: 0;
	 res.push(valueMatch)
	})
	let items = res.reduce((a,b)=> a+b); 
	return items;
}
//verify if exist a vertical match
function verticalMatches(row, Dna, indexRow){

	let res = [];
	[...row].forEach((letter, index)=>{
	 let matches =  [row[index] == isExistRow(Dna, indexRow+1, index) ,row[index] == isExistRow(Dna, indexRow+2, index) ,row[index] == isExistRow(Dna, indexRow+3, index)];
	 let valueMatch = matches.every(value=> value) ? 1: 0;
	 res.push(valueMatch)
	})
	let items = res.reduce((a,b)=> a+b);
	return items;
}

//verify if exist a diagonal match
function diagonalRight(row, Dna,indexRow){
	let res = [];
	[...row].forEach((letter, index)=>{
	 let matches =  [row[index] == isExistRow(Dna, indexRow+1, index+1) ,row[index] == isExistRow(Dna, indexRow+2, index+2) ,row[index] == isExistRow(Dna, indexRow+3, index+3)];
	 let valueMatch = matches.every(value=> value) ? 1: 0;
	 res.push(valueMatch)
	})
	let items = res.reduce((a,b)=> a+b);
	return items;
}
//verify if exist a diagonal match
function diagonalLeft(row, Dna,indexRow){
	let res = [];
	[...row].forEach((letter, index)=>{
	 let matches =  [row[index] == isExistRow(Dna, indexRow+1, index-1) ,row[index] == isExistRow(Dna, indexRow+2, index-2) ,row[index] == isExistRow(Dna, indexRow+3, index-3)];
	 let valueMatch = matches.every(value=> value) ? 1: 0;
	 res.push(valueMatch)
	})
	let items = res.reduce((a,b)=> a+b);
	return items;
}


function isExistRow(dna, i, i2){
    return (dna[i] && dna[i][i2]) ? dna[i][i2]: null;
}
//Save Dna in db
const saveDna= async (dna,isMutant)=>{
	await sequelize.sync();
	const jane = await Dna.create({
	  mutant: isMutant,
	  dna: dna,
	});
	console.log(jane.toJSON());
}

