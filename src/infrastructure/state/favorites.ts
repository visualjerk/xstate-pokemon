import { IFavoritesService } from '@domain/services/favorites-service'
import { favoritesStorageRepository } from '@infrastructure/repositories/favorites-storage'
import { createMachine } from 'xstate'

interface TFavoritesContext {
  items: IFavoritesService
}

type TFavoritesEvent =
  | { type: 'ADD'; name: string }
  | { type: 'REMOVE'; name: string }

export const favorites = createMachine<TFavoritesContext, TFavoritesEvent>(
  {
    id: 'favorites',
    predictableActionArguments: true,
    context: {
      items: favoritesStorageRepository,
    },
    initial: 'no-items',
    states: {
      'no-items': {
        on: {
          ADD: {
            target: 'has-items',
            actions: 'addItem',
          },
        },
      },
      'has-items': {
        on: {
          ADD: {
            actions: 'addItem',
          },
          REMOVE: {
            actions: 'removeItem',
          },
        },
      },
    },
  },
  {
    actions: {
      addItem: (context, event) => {
        context.items.set(event.name, event.name)
      },
      removeItem: (context, event) => {
        context.items.delete(event.name)
      },
    },
  }
)
