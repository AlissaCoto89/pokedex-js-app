let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=900";
  //let modalContainer = document.querySelector("#modal-container"); old modal
  let searchField = document.querySelector("#pokedex-search");
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();
    //declare Name, image, height, weight, type, and abilities
    let nameElement = $("<h2>" + pokemon.name + "</h2>");
    let imageElement = $('<img class="pokemon-img">');
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");
    let typeElement = $("<p>" + "Types : " + pokemon.types + "</p>");
    let abilitiesElement = $(
      "<p>" + "Abilities: " + pokemon.abilities + "</p>"
    );
    //add stats to modal
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);
  }

  function hideModal() {
    modalContainer.classList.remove("show-modal");
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("show-modal")) {
      hideModal();
    }
  });

  searchField.addEventListener("input", function () {
    let pokeList = document.querySelectorAll(".pokemonButton");
    let filterValue = searchField.value.toUpperCase();

    pokeList.forEach(function (pokemon) {
      console.log(pokemon.innerText);
      if (pokemon.innerText.toUpperCase().indexOf(filterValue) > -1) {
        pokemon.style.display = "inline-block";
      } else {
        pokemon.style.display = "none";
      }
    });
  });

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct!");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let pokemonItem = document.createElement("li");
    pokemonList.classList.add("group-list-item");
    let buttonItem = document.createElement("button");
    buttonItem.classList.add("pokemonButton");
    buttonItem.innerText = pokemon.name;
    buttonItem.setAttribute("data-toggle", "modal");
    buttonItem.setAttribute("data-target", "#pokemon-modal");
    $(buttonItem).addClass("button-class btn-block btn m1");
    pokemonItem.appendChild(buttonItem);
    pokemonList.appendChild(pokemonItem);
    buttonItem.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //details added to the pokemon
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map((type) => type.type.name).join(", ");
        pokemon.weight = details.weight;
        pokemon.abilities = details.abilities
          .map((ability) => ability.ability.name)
          .join(", ");
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    showModal: showModal,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
