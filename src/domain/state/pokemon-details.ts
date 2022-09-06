import { createMachine, assign } from 'xstate'
import { IUserPokemon, UserPokemon } from '@domain/entities/pokemon'
import { IPokemonRepository } from '@domain/repositories/pokemon'
import { IUserSettingsRepository } from '@domain/repositories/user-settings'

interface TPokemonDetailsContext {
  details: IUserPokemon
  error: Error
}

type TPokemonDetailsEvents = { type: 'TOGGLE_FAVORITE' }

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
      value: { loaded: 'togglingFavorite' }
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

export const createPokemonDetails = (
  pokemonDataSource: IPokemonRepository,
  userSettingsDataSource: IUserSettingsRepository
) => {
  async function getDetails(name: string): Promise<IUserPokemon> {
    const settings = await userSettingsDataSource.get()
    const pokemon = await pokemonDataSource.getDetails(name)

    return new UserPokemon({
      ...pokemon,
      isFavorite: settings.favorites.has(name),
    })
  }

  async function toggleFavorite(pokemon: IUserPokemon): Promise<IUserPokemon> {
    const settings = await userSettingsDataSource.get()
    if (settings.favorites.get(pokemon.name)) {
      settings.favorites.delete(pokemon.name)
    } else {
      settings.favorites.set(pokemon.name, pokemon.name)
    }
    await userSettingsDataSource.save(settings)

    return new UserPokemon({
      ...pokemon,
      isFavorite: settings.favorites.has(pokemon.name),
    })
  }

  return (name: string) =>
    createMachine<
      TPokemonDetailsContext,
      TPokemonDetailsEvents,
      TPokemonDetailsStateContext
    >({
      id: 'pokemon',
      initial: 'loading',
      predictableActionArguments: true,
      states: {
        loading: {
          invoke: {
            id: 'fetch-pokemon-details',
            src: () => getDetails(name),
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
        loaded: {
          id: 'loaded',
          initial: 'idle',
          states: {
            idle: {},
            togglingFavorite: {
              invoke: {
                id: 'toggle-favorite',
                src: (context) => toggleFavorite(context.details),
                onDone: {
                  target: '#loaded.idle',
                  actions: assign({
                    details: (context, event) => event.data,
                  }),
                },
                onError: {
                  target: '#failed',
                  actions: assign({
                    error: (context, event) => event.data,
                  }),
                },
              },
            },
          },
          on: {
            TOGGLE_FAVORITE: '.togglingFavorite',
          },
        },
        failed: {
          id: 'failed',
        },
      },
    })
}
