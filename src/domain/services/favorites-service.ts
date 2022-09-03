import { IPokemonReference } from '@domain/entities/pokemon'

export interface IFavoritesService
  extends Map<IPokemonReference['name'], IPokemonReference['name']> {}
