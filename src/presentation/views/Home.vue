<template>
  <h1>Pokemon List</h1>
  <div v-if="hasState('loading')">Loading ...</div>
  <div v-if="hasState('failed')">
    <h2>Failed to load</h2>
    <p>Error: {{ error }}</p>
  </div>
  <ul v-if="hasState('loaded')">
    <li v-for="pokemon in list" :key="pokemon.name">
      <router-link :to="`/pokemon/${pokemon.name}`">
        {{ pokemon.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { usePokemonList } from '@application/pokemon-list'

const { hasState, list, error } = usePokemonList()
</script>
