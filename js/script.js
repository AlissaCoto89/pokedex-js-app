let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let modalContainer = document.querySelector('#modal-container');

function showModal(title, text) {
	modalContainer.innerHTML = '';
	let modal = document.createElement('div');
    modal.classList.add('modal');

      
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
	modalContainer.classList.add('is-visible');
}

function showModalImage(title, text, vurlimag) {
    modalContainer.innerHTML = '';
	let modal = document.createElement('div');
    modal.classList.add('modal');

      
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.src = vurlimag;


    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
	modalContainer.classList.add('is-visible');
}  

let dialogPromiseReject;

function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
    	dialogPromiseReject();
    	dialogPromiseReject = null;
    }
}

function showDialog(title, text) {
	showModal(title, text);

    let modalContainer = document.querySelector('#modal-container');
    let modal = modalContainer.querySelector('.modal');
	let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    
    confirmButton.focus();
    
    return new Promise((resolve, reject) => {
    	cancelButton.addEventListener('click', hideModal);
    	confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; 
        hideModal();
        resolve();
    });

    dialogPromiseReject = reject;
    });
}



window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    	hideModal();  
    	}
    });

modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
    	hideModal();
    	}
    });

function add(pokemon){
	if (
  	typeof pokemon === 'object' &&
  	'name' in pokemon
  	) {
       pokemonList.push (pokemon);
    }else{
    	console.log("Pokemon is not correct!");
      
    }
}

function getAll() {
    return pokemonList;
}

function addListItem(pokemon) {
	let pokemonList = document.querySelector('.pokemon-list');  
	let listItem = document.createElement('li');
	let button = document.createElement('button');
	button.innerText = pokemon.name;
	button.classList.add('button');
	listItem.appendChild(button);  
	pokemonList.appendChild(listItem);
	button.addEventListener('click', function(event){
		showDetails(pokemon)
	});
}

function loadList() {
    return fetch(apiUrl).then(function (response) {
    	return response.json();
    }).then(function (json) {
    	json.results.forEach(function (item) {
        let pokemon = {
        	name: item.name,
        	detailsUrl: item.url
        };
        add(pokemon);
    	//console.log(pokemon);
    });
    }).catch(function (e) {
    	console.error(e);
    })
}

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
    	return response.json();
    }).then(function (details) {
    	//details added to the item
    	item.imageUrl = details.sprites.front_default;
    	item.height = details.height;
    	item.types = details.types;
    	item.weight = details.weight;
    }).catch(function (e) {
    	console.error(e);
    });

}

function showDetails(pokemon){
	loadDetails(pokemon).then(function () {
	showModalImage(pokemon.name, pokemon.height, pokemon.imageUrl, pokemon.weight, pokemon.types);
    //console.log(pokemon);
	});
}


return {
    add: add,
    getAll: getAll,
    showModal: showModal,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
	};
})();


pokemonRepository.loadList().then(function () {
	//pokemonRepository.showAll();
    pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    });

});

