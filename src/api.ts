import {random} from './utils';

export const fetchData = async (setPokemon: Function) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${random(500)}`)
    .then(response => response.json())
    .then(json => {
      setPokemon({
        name: json.name,
        img: json.sprites.other.dream_world.front_default,
        health: 100,
        wins: 0,
        losses: 0,
      });
    })
    .catch(error => {
      console.error(error);
    });
};
