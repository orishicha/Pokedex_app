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

//Create a FOR loop
for (let i = 0; i < pokemonList.length; i++) {
  document.write('<br>' + pokemonList[i].name + (' \(height: ') + pokemonList[i].height + '\)');
  //Add a conditional
  if (pokemonList[i].height >= 1) {
    document.write(' - Wow! That\'s big!');
  }
}

