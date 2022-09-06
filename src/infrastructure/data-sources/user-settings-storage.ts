import { IUserSettingsRepository } from '@domain/repositories/user-settings'

const FAVORITES_STORAGE_KEY = 'pokemon-user-favorites'

export const userSettingsStorageDataSource: IUserSettingsRepository = {
  get() {
    const settings = {
      favorites: new Map(),
    }
    const storageItems = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (storageItems != null) {
      settings.favorites = new Map(JSON.parse(storageItems))
    }
    return Promise.resolve(settings)
  },
  save(settings) {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(Array.from(settings.favorites.entries()))
    )
    return new Promise((resolve) => setTimeout(resolve, 300))
  },
}
