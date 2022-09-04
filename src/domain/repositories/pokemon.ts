import { IPokemon, IPokemonReference } from '@domain/entities/pokemon'

export interface IPokemonRepository {
  getList: () => Promise<IPokemonReference[]>
  getDetails: (name: string) => Promise<IPokemon>
}
