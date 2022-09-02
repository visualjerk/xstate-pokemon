<template>
  <h1>Pokemon List</h1>
  <div v-if="state.value === 'loading'">Loading ...</div>
  <div v-if="state.value === 'failed'">Failed to load</div>
  <ul v-if="state.value === 'loaded'">
    <li v-for="pokemon in state.context.list" :key="pokemon.name">
      <router-link :to="`/pokemon/${pokemon.name}`">
        {{ pokemon.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useMachine } from '@xstate/vue'
import { pokemonList } from '@infrastructure/state/pokemon-list'

const { state, send } = useMachine(pokemonList)
</script>
