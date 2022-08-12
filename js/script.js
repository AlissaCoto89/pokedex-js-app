let pokemonRepository = (function (pokemon) {
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


//getAll and add function with object passed 
function add(pokemon){
  if (typeof pokemon === 'object') {
    if ( ('name' in pokemon) && 
         ('height' in pokemon) && 
         ('weight' in pokemon) && 
         ('types' in pokemon) )
    {
       pokemonList.push (pokemon);
    }
      
    }
  }

function getAll() {
    return pokemonList;
}

function showDetails(pokemon) {
	console.log(pokemonRepository.getAll());
}

function addListItem(pokemon) {
	let pokemonList = document.querySelector('.pokemon-list');  
	let listItem = document.createElement('li');
	let button = document.createElement('button');
	button.innerText = pokemon.name;
	button.classList.add('button');
	listItem.appendChild(button);  
	pokemonList.appendChild(listItem)
	button.addEventListener('click', function(button){showDetails(pokemon)});
};
    
return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    }
})();


console.log(pokemonRepository.getAll());


pokemonRepository.getAll().forEach(function(pokemon){
pokemonRepository.addListItem(pokemon);

});


  

