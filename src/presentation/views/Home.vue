<template>
  <h1 class="text-3xl mb-5">Pokemon List</h1>
  <div v-if="hasState('loading')">Loading ...</div>
  <div v-if="hasState('failed')">
    <h2>Failed to load</h2>
    <p>Error: {{ error }}</p>
  </div>
  <ul v-if="hasState('loaded')" class="grid gap-2">
    <li v-for="pokemon in list" :key="pokemon.name">
      <router-link
        :to="`/pokemon/${pokemon.name}`"
        class="block p-4 shadow-md rounded-sm"
      >
        {{ pokemon.displayName }}
        <template v-if="pokemon.isFavorite"> ⭐ </template>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { usePokemonList } from '@application/pokemon-list'

const { hasState, list, error } = usePokemonList()
</script>
