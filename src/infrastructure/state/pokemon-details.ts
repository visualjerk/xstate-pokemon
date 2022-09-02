import { createMachine, assign } from 'xstate';

function fetchPokemonDetails({ name }) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then((json) => json);
}

export const pokemonDetails = (name: string) =>
  createMachine({
    id: 'pokemon',
    initial: 'loading',
    context: {
      name,
      details: [],
      error: null,
    },
    states: {
      loading: {
        invoke: {
          id: 'fetch-pokemon-details',
          src: fetchPokemonDetails,
          onDone: {
            target: 'loaded',
            actions: assign({
              details: (context, event) => event.data,
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
