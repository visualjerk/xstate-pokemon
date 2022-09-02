<template>
  <router-link to="/">Back to List</router-link>
  <h1>Pokemon {{ name }}</h1>
  <div v-if="state.value === 'loading'">Loading ...</div>
  <div v-if="state.value === 'failed'">Failed to load</div>
  <div v-if="state.value === 'loaded'">
    <img :src="state.context.details.sprites.front_default" />
    <h2>Abilities</h2>
    <ul>
      <li
        v-for="{ ability } in state.context.details.abilities"
        :key="ability.name"
      >
        {{ ability.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMachine } from '@xstate/vue'
import { pokemonDetails } from '@infrastructure/state/pokemon-details'

const route = useRoute()
const name = computed(() => route.params.name)

const { state, send } = useMachine(pokemonDetails(name.value))
</script>
