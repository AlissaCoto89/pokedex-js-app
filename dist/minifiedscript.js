let pokemonRepository = (function () {
  let f = [],
    g = document.querySelector("#modal-container");
  function a(a) {
    let b = $(".modal-body"),
      c = $(".modal-title");
    c.empty(), b.empty();
    let e = $("<h3>" + a.name + "</h3>"),
      d = $('<img class="pokemon-img">');
    d.attr("src", a.imageUrl);
    let f = $("<p>Height: " + a.height + "</p>"),
      g = $("<p>Weight: " + a.weight + "</p>"),
      h = $("<p>Types : " + a.types + "</p>"),
      i = $("<p>Abilities: " + a.abilities + "</p>");
    c.append(e),
      b.append(d),
      b.append(f),
      b.append(g),
      b.append(h),
      b.append(i);
  }
  function b(a) {
    "object" == typeof a && "name" in a
      ? f.push(a)
      : console.log("Pokemon is not correct!");
  }
  function c() {
    return f;
  }
  function d(a) {
    return fetch(a.detailsUrl)
      .then(function (a) {
        return a.json();
      })
      .then(function (b) {
        (a.imageUrl = b.sprites.front_default),
          (a.height = b.height),
          (a.types = b.types.map((a) => a.type.name).join(", ")),
          (a.weight = b.weight),
          (a.abilities = b.abilities.map((a) => a.ability.name).join(", "));
      })
      .catch(function (a) {
        console.error(a);
      });
  }
  function e(b) {
    d(b).then(function () {
      a(b);
    });
  }
  return (
    window.addEventListener("keydown", (a) => {
      "Escape" === a.key &&
        g.classList.contains("show-modal") &&
        g.classList.remove("show-modal");
    }),
    {
      add: b,
      getAll: c,
      showModal: a,
      addListItem: function (d) {
        let b = document.querySelector(".list-group");
        document.createElement("li");
        let c = document.createElement("li");
        b.classList.add("group-list-item");
        let a = document.createElement("button");
        a.classList.add("pokemonButton"),
          (a.innerText = d.name),
          a.setAttribute("data-toggle", "modal"),
          a.setAttribute("data-target", "#pokemon-modal"),
          $(a).addClass("button-class btn-block btn m1"),
          c.appendChild(a),
          b.appendChild(c),
          a.addEventListener("click", function (a) {
            e(d);
          });
      },
      loadList: function () {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (a) {
            return a.json();
          })
          .then(function (a) {
            a.results.forEach(function (a) {
              b({ name: a.name, detailsUrl: a.url });
            });
          })
          .catch(function (a) {
            console.error(a);
          });
      },
      loadDetails: d,
      showDetails: e,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (a) {
    pokemonRepository.addListItem(a);
  });
});
