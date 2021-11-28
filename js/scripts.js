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
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let container = document.createElement('div');
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    //adds class to button for css styling
    container.classList.add('pokeball');
    button.classList.add('name');

    //append children
    container.appendChild(button);
    pokemonItem.appendChild(container);
    pokemonList.appendChild(pokemonItem);

    //add onclick listener
    onclickEventListener(button, pokemon);
  }

  function onclickEventListener(element, object) {
    element.addEventListener('click', function (){
      showDetails(object);
    });
  }

  const loader = document.querySelector('#loading');

  function showLoadingMessage() {
    loader.classList.add('show');
  }

  function hideLoadingMessage() {
    loader.classList.remove('show');
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function loadDetails(pokemon) {
    showLoadingMessage();
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function(details) {
      hideLoadingMessage();
      //add details to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;
    }).catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    // Clear all existing modal content
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    modalTitle.empty();
    modalBody.empty();

    // Create new content
    let nameElement = $('<h1>' + pokemon.name + '</h1>')
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + ' m' + '</p>');
    let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + ' kg' +'</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);

    $('#exampleModalLive').modal();
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  }

})();

pokemonRepository.loadList().then(function() {
  //Search//
  document.querySelector('.search-pokemon').addEventListener('submit', function() {
    let query = document.querySelector('#myInput').value;
    document.querySelector('.pokemon-list').innerHTML = "";
    if (query === '') {
      pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    } else {
      pokemonRepository.getAll().forEach(function (pokemon) {
        if (pokemon.name.indexOf(query) > -1) {
          pokemonRepository.addListItem(pokemon);
        }
      });
    }
  });

  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
