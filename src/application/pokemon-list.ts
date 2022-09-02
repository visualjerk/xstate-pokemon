import { computed } from 'vue'
import { useMachine } from '@xstate/vue'
import { pokemonList } from '@infrastructure/state/pokemon-list'

export function usePokemonList() {
  const { state } = useMachine(pokemonList)

  return {
    hasState: computed(() => state.value.matches),
    list: computed(() => state.value.context.list),
    error: computed(() => state.value.context.error),
  }
}
