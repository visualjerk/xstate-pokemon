import { computed, Ref } from 'vue'
import { useMachine } from '@xstate/vue'
import { pokemonDetails } from '@infrastructure/state/pokemon-details'

export function usePokemonDetails(name: Ref<string>) {
  const { state } = useMachine(pokemonDetails(name.value))

  return {
    hasState: computed(() => state.value.matches),
    details: computed(() => state.value.context.details),
    error: computed(() => state.value.context.error),
  }
}
