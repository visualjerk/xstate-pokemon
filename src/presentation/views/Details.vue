<template>
  <router-link to="/">Back to List</router-link>
  <h1>Pokemon {{ name }}</h1>
  <div v-if="hasState('loading')">Loading ...</div>
  <div v-if="hasState('failed')">
    <h2>Failed to load</h2>
    <p>Error: {{ error }}</p>
  </div>
  <div v-if="hasState('loaded')">
    <img :src="details.imageUrl" />
    <h2>Abilities</h2>
    <ul>
      <li v-for="ability in details.abilities" :key="ability.name">
        {{ ability.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonDetails } from '@application/pokemon-details'

const route = useRoute()
const name = computed(() => route.params.name as string)

const { hasState, error, details } = usePokemonDetails(name)
</script>
