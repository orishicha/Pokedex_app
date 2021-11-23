//IIFE wrap
let pokemonRepository = (function () {
  //Pokemon list
  let repository = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');
    // Close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h2');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  // ESC-key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // also triggered when clicking INSIDE the modal - close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  }

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
