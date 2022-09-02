import { IPokemon } from '@domain/entities/pokemon'

export interface IPokemonService {
  getList: () => Promise<IPokemon[]>
  getDetails: (name: string) => Promise<IPokemon>
}
