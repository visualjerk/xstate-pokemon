import { favoritesStorageRepository } from '@infrastructure/repositories/favorites-storage'
import { reactive } from 'vue'

const favoritesStorageRef = reactive(favoritesStorageRepository)

export function useFavorites() {
  return favoritesStorageRef
}
