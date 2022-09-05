import { createMachine, assign } from 'xstate'
import { IPokemon } from '@domain/entities/pokemon'
import { IPokemonRepository } from '@domain/repositories/pokemon'

interface TPokemonDetailsContext {
  details: IPokemon
  error: Error
}

type TPokemonDetailsStateContext =
  | {
      value: 'loading'
      context: TPokemonDetailsContext & {
        details: null
        error: null
      }
    }
  | {
      value: 'loaded'
      context: TPokemonDetailsContext & {
        error: null
      }
    }
  | {
      value: 'failed'
      context: TPokemonDetailsContext & {
        details: null
      }
    }

export const createPokemonDetails =
  (pokemonDataSource: IPokemonRepository) => (name: string) =>
    createMachine<TPokemonDetailsContext, any, TPokemonDetailsStateContext>({
      id: 'pokemon',
      initial: 'loading',
      predictableActionArguments: true,
      states: {
        loading: {
          invoke: {
            id: 'fetch-pokemon-details',
            src: () => pokemonDataSource.getDetails(name),
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
    })
