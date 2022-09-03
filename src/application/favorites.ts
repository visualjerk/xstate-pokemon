import { favoritesStorageRepository } from '@infrastructure/repositories/favorites-storage'
import { reactive } from 'vue'

const favoritesStorageRef = reactive(favoritesStorageRepository)

export function useFavorites() {
  return {
    toggle: favoritesStorageRef.toggle.bind(favoritesStorageRef),
    contains: favoritesStorageRef.contains.bind(favoritesStorageRef),
  }
}
