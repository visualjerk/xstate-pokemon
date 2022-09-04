import { IPokemonReference } from '@domain/entities/pokemon'

export interface IFavoritesRepository {
  items: Map<IPokemonReference['name'], IPokemonReference['name']>
  toggle: (name: IPokemonReference['name']) => void
  contains: (name: IPokemonReference['name']) => boolean
}
