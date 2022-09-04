import { IFavoritesRepository } from '@domain/repositories/favorites'

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

export class FavoritesStorageDataSource implements IFavoritesRepository {
  items: Map<string, string>

  constructor() {
    this.items = loadItems()
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
    return this.items.has(name)
  }
}

export const favoritesStorageDataSource = new FavoritesStorageDataSource()
