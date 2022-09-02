import { createMachine, assign } from 'xstate';

// TODO: Implement Actors
// https://xstate.js.org/docs/tutorials/reddit.html#spawning-subreddit-actors

function fetchPokemonList() {
  return fetch(`https://pokeapi.co/api/v2/pokemon`)
    .then((response) => response.json())
    .then((json) => json);
}

export const pokemonList = createMachine({
  id: 'pokemon',
  initial: 'loading',
  context: {
    list: [],
    error: null,
  },
  states: {
    loading: {
      invoke: {
        id: 'fetch-pokemon-list',
        src: fetchPokemonList,
        onDone: {
          target: 'loaded',
          actions: assign({
            list: (context, event) => event.data.results,
          }),
        },
        onError: {
          target: 'failed',
          actions: assign({
            error: (context, event) => event.data,
          }),
        },
      },
    },
    loaded: {},
    failed: {},
  },
});
