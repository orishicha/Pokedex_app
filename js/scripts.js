//IIFE wrap
let pokemonRepository = (function () {
  //Pokemon list
  let repository = [
    {
      name: 'Charmander',
      height: 0.6,
      type: ['fire']
    },
    {
      name: 'Beedrill',
      height: 1,
      type: ['bug', 'poison']
    },
    {
      name: 'Pikachu',
      height: 0.4,
      type: ['electric']
    },
    {
      name: 'Jigglypuff',
      height: 0.5,
      type: ['fairy', 'normal']
    },
    {
      name: 'Psyduck',
      height: 0.8,
      type: ['water']
    }
  ];
  
  //check if added information is an object
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    } else {
      alert('This pokemon is not an object!')
    }
  }
  
  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    //assign the list of pokemons to html
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    //adds class to button for css styling
    button.classList.add('name_button');

    //append children
    pokemonItem.appendChild(button);
    pokemonList.appendChild(pokemonItem);

    //add onclick listener - 1.6.advanced
    onclickEventListener(button, pokemon);

    //add onclick listener - 1.6.basic
    // button.addEventListener('click', function (){
    //   showDetails(pokemon);
    // });
  }

  function onclickEventListener(element, object) {
    element.addEventListener('click', function (){
      showDetails(object);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

//Add a pokemon
pokemonRepository.add({name: 'Rapidash', height: 1.7, type: ['fire']});

//Call forEach function to show Pokemon list
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
