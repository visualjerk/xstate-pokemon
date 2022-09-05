import { IPokemon } from '@domain/entities/pokemon'
import { IPokemonRepository } from '@domain/repositories/pokemon'
import { createMachine, assign } from 'xstate'

interface TPokemonListContext {
  list: IPokemon[]
  error: Error
}

type TPokemonListStateContext =
  | {
      value: 'loading'
      context: TPokemonListContext & {
        list: null
        error: null
      }
    }
  | {
      value: 'loaded'
      context: TPokemonListContext & {
        error: null
      }
    }
  | {
      value: 'failed'
      context: TPokemonListContext & {
        list: null
      }
    }

export const createPokemonList = (pokemonDataSource: IPokemonRepository) =>
  createMachine<TPokemonListContext, any, TPokemonListStateContext>(
    {
      id: 'pokemon',
      initial: 'loading',
      predictableActionArguments: true,
      states: {
        loading: {
          invoke: {
            id: 'fetch-pokemon-list',
            src: 'getList',
            onDone: {
              target: 'loaded',
              actions: assign({
                list: (context, event) => event.data,
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
    },
    {
      services: {
        getList: pokemonDataSource.getList,
      },
    }
  )
