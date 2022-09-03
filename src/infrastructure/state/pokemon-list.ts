import { createMachine, assign, ServiceMap } from 'xstate'
import { pokemonHttpRepository } from '@infrastructure/repositories/pokemon-http'
import { IPokemon } from '@domain/entities/pokemon'

// TODO: Implement Actors
// https://xstate.js.org/docs/tutorials/reddit.html#spawning-subreddit-actors

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

export const pokemonList = createMachine<
  TPokemonListContext,
  any,
  TPokemonListStateContext
>(
  {
    id: 'pokemon',
    initial: 'loading',
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
      getList: pokemonHttpRepository.getList,
    },
  }
)
