import { IPokemonReference } from './pokemon'

export interface IUserSettings {
  favorites: Map<IPokemonReference['name'], IPokemonReference['name']>
}
