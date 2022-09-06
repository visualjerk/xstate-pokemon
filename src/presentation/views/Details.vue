<template>
  <div class="mb-6">
    <router-link to="/" class="text-blue-600">Back to List</router-link>
  </div>
  <div v-if="hasState('loading')">Loading ...</div>
  <div v-if="hasState('failed')">
    <h2>Failed to load</h2>
    <p>Error: {{ error }}</p>
  </div>
  <div v-if="hasState('loaded')">
    <div class="flex items-center gap-4 mb-8">
      <div
        class="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-full shadow-md"
      >
        <img :src="details.imageUrl" />
      </div>
      <h1 class="text-3xl flex-grow">
        {{ details.displayName }}
        <template v-if="details.isFavorite"> ⭐ </template>
      </h1>
    </div>

    <div class="mb-6">
      <button
        @click="toggleFavorite"
        :disabled="
          hasState({
            loaded: 'togglingFavorite',
          })
        "
        class="px-2 py-1 bg-blue-700 text-blue-50 rounded-sm"
        :class="
          hasState({
            loaded: 'togglingFavorite',
          }) && 'bg-blue-400'
        "
      >
        <template v-if="details.isFavorite">Remove from favorites</template>
        <template v-else>Add to favorites</template>
      </button>
    </div>
    <h2 class="text-2xl mb-3">Abilities</h2>
    <p v-if="details.isSkilled" class="text-gray-600 font-bold">Very Skilled</p>
    <ul class="grid gap-2">
      <li
        v-for="ability in details.abilities"
        :key="ability.name"
        class="p-3 shadow-md rounded-sm"
      >
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

const { hasState, error, details, toggleFavorite } = usePokemonDetails(name)
</script>
