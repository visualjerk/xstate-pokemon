import { IPokemonReference } from '@domain/entities/pokemon'

export interface IFavoritesService {
  items: Map<IPokemonReference['name'], IPokemonReference['name']>
  toggle: (name: IPokemonReference['name']) => void
  contains: (name: IPokemonReference['name']) => boolean
}
