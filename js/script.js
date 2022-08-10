let pokemonRepository = (function () {
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

//getAll and add function

function getAll() {
        return pokemonList;
    }

function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    }
})();

//create forEach function that iterates for Pokemons name and weight

let pokemonList = pokemonRepository.getAll();

pokemonList.forEach(function(pokemon) {
    if (pokemon.weight>40) {
        document.write('<p>' + pokemon.name + ', weight: ' + pokemon.weight + ' - Wow, that\'s a big Pokemon!' + '</p>')
    } else {
        document.write('<p>' + pokemon.name + ', weight: ' + pokemon.weight + ' - Awe, that\'s a small Pokemon!' + '</p>')
    }

});



