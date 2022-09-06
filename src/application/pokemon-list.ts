import { computed } from 'vue'
import { useMachine } from '@xstate/vue'
import { createPokemonList } from '@domain/state/pokemon-list'
import { pokemonHttpDataSource } from '@infrastructure/data-sources/pokemon-http'
import { userSettingsStorageDataSource } from '@infrastructure/data-sources/user-settings-storage'

export function usePokemonList() {
  const pokemonList = createPokemonList(
    pokemonHttpDataSource,
    userSettingsStorageDataSource
  )
  const { state } = useMachine(pokemonList)

  return {
    hasState: computed(() => state.value.matches),
    list: computed(() => state.value.context.list),
    error: computed(() => state.value.context.error),
  }
}
