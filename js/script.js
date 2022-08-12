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


//getAll and add function with object passed BONUS
function add(pokemon){
  if (typeOf pokemon === 'object') {
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
    
return {
        getAll: getAll,
        add: add
    }
})();
pokemonRepository.getAll().forEach(function(pokemon){
  
   let pokemonList = document.querySelector('ul');  
   let listItem = document.createElement('li');
   let button = document.createElement('button');
   button.innerText = pokemon.name;
   button.classList.add('button');
   listItem.appendChild(button);  
   pokemonList.appendChild(listItem);
};
