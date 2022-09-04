import { favoritesStorageDataSource } from '@infrastructure/data-sources/favorites-storage'
import { reactive } from 'vue'

const favoritesStorageRef = reactive(favoritesStorageDataSource)

export function useFavorites() {
  return {
    toggle: favoritesStorageRef.toggle.bind(favoritesStorageRef),
    contains: favoritesStorageRef.contains.bind(favoritesStorageRef),
  }
}
