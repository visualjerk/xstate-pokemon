import { useMachine } from '@xstate/vue'
import { favorites } from '@infrastructure/state/favorites'

export function useFavorites() {
  const { state, send } = useMachine(favorites)

  const contains = (name: string) => state.value.context.items.has(name)

  return {
    toggle: (name: string) => send(contains(name) ? 'REMOVE' : 'ADD', { name }),
    contains,
  }
}
