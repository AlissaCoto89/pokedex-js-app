let pokemonList = [
	{	name: 'Venusaur', 
		height: 2,
		weight: 100, 
		types: ['grass' , 'poison']},
	
	{	name: 'Butterfree',
		height: 1.1,
		weight: 32,
		types: ['bug' , 'flying']},
	
	{	name: 'Jigglypuff',
		height: 0.5,
		weight: 5.5,
		types: ['fairy' , 'normal']},

	{	name: 'Bellsprout',
		height: 0.7,
		weight: 4,
		types: ['grass' , 'poison']}
];

//create for loop that iterates for Pokemons name and weight

for (let i = 0; i < pokemonList.length; i++) { //conditionals added for weight
	if (pokemonList[i].weight > 40) {
		document.write('<p>' + pokemonList[i].name + ' (weight: ' + pokemonList[i].weight + ') - Wow, that\'s big!')
	} else if (pokemonList[i].weight <= 40 && pokemonList[i].weight > 20) {
		document.write('<p>' + pokemonList[i].name + ' (weight: ' + pokemonList[i].weight + ') - That\'s a normal size.')
	} else	if (pokemonList[i].weight < 20) {
		document.write('<p>' + pokemonList[i].name + ' (weight: ' + pokemonList[i].weight + ') - Awe, that\'s tiny!')
	}}