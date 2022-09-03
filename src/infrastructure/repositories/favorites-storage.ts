import { IFavoritesService } from '@domain/services/favorites-service'

const STORAGE_KEY = 'POKEMON_FAVORITES'

function loadItems() {
  const storageItems = localStorage.getItem(STORAGE_KEY)
  if (storageItems == null) {
    return new Map()
  }
  return new Map(JSON.parse(storageItems))
}

function saveItems(items: Map<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(items.entries())))
}

export const _favoritesStorageRepository: IFavoritesService = {
  items: loadItems(),
  toggle(name: string) {
    const items = favoritesStorageRepository.items
    if (items.has(name)) {
      items.delete(name)
    } else {
      items.set(name, name)
    }
    saveItems(items)
  },
  contains(name: string) {
    console.log('contains', favoritesStorageRepository.items, name)
    return favoritesStorageRepository.items.has(name)
  },
}

export class FavoritesStorageRepository implements IFavoritesService {
  items: Map<string, string>

  constructor() {
    this.items = loadItems()
    console.log(this)
  }

  toggle(name: string) {
    const items = this.items
    if (items.has(name)) {
      items.delete(name)
    } else {
      items.set(name, name)
    }
    saveItems(items)
  }

  contains(name: string) {
    console.log('contains', this)
    return this.items.has(name)
  }
}

export const favoritesStorageRepository = new FavoritesStorageRepository()
