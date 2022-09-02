import { IPokemon, IPokemonReference } from '@domain/entities/pokemon'

export interface IPokemonService {
  getList: () => Promise<IPokemonReference[]>
  getDetails: (name: string) => Promise<IPokemon>
}
