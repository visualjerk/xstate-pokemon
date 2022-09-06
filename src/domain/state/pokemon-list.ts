import {
  IUserPokemonReference,
  UserPokemonReference,
} from '@domain/entities/pokemon'
import { IPokemonRepository } from '@domain/repositories/pokemon'
import { IUserSettingsRepository } from '@domain/repositories/user-settings'
import { createMachine, assign } from 'xstate'

interface TPokemonListContext {
  list: IUserPokemonReference[]
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

export const createPokemonList = (
  pokemonDataSource: IPokemonRepository,
  userSettingsDataSource: IUserSettingsRepository
) => {
  async function getList(): Promise<IUserPokemonReference[]> {
    const settings = await userSettingsDataSource.get()
    const list = await pokemonDataSource.getList()
    return list.map(
      (pokemon) =>
        new UserPokemonReference({
          ...pokemon,
          isFavorite: settings.favorites.has(pokemon.name),
        })
    )
  }

  return createMachine<TPokemonListContext, any, TPokemonListStateContext>(
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
        getList,
      },
    }
  )
}
