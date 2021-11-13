//IIFE wrap
let pokemonRepository = (function () {
  //Pokemon list
  let pokemonList = [
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
      pokemonList.push(pokemon);
    } else {
      alert('Check and rewrite everything!')
    }
  }
  
  function getAll() {
    return pokemonList;
  }
  
  return {
    add: add,
    getAll: getAll,
  };
})();

//Declare function to show Pokemon
function myPokemonPrintout(pokemon) {
  document.write('<li>' + pokemon.name + ' (height: ' + pokemon.height + ')');
  //Add a conditional to show big Pokemon
  if (pokemon.height >= 1) {
    document.write(' - Wow! That\'s big!');
  }
  document.write('</li>');
}

document.write('<ul>');

//Add a pokemon
pokemonRepository.add({name: 'Rapidash', height: 1.7, type: ['fire']});

//Call forEach function to show Pokemon list
pokemonRepository.getAll().forEach(myPokemonPrintout);

document.write('</ul>');




