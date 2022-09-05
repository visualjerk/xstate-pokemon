import { computed, Ref } from 'vue'
import { useMachine } from '@xstate/vue'
import { createPokemonDetails } from '@domain/state/pokemon-details'
import { pokemonHttpDataSource } from '@infrastructure/data-sources/pokemon-http'

export function usePokemonDetails(name: Ref<string>) {
  const pokemonDetails = createPokemonDetails(pokemonHttpDataSource)
  const { state } = useMachine(pokemonDetails(name.value))

  return {
    hasState: computed(() => state.value.matches),
    details: computed(() => state.value.context.details),
    error: computed(() => state.value.context.error),
  }
}
