//IIFE wrap
let pokemonRepository = (function () {
  //Pokemon list
  let repository = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  //check if added information is an object
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    } else {
      console.log('This pokemon is not an object!');
    }
  }
  
  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    //assign the list of pokemons to html
    let repository = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    //adds class to button for css styling
    button.classList.add('name_button');

    //append children
    pokemonItem.appendChild(button);
    repository.appendChild(pokemonItem);

    //add onclick listener
    onclickEventListener(button, pokemon);
  }

  function onclickEventListener(element, object) {
    element.addEventListener('click', function (){
      showDetails(object);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //add details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails:loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
