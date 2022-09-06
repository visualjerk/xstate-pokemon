import { capitalize } from 'lodash-es'

export interface IAbility {
  name: string
}

export interface IPokemon {
  name: string
  displayName: string
  abilities: IAbility[]
  imageUrl: string
  isSkilled: boolean
}

export type IPokemonReference = Pick<IPokemon, 'name'>

export interface IUserPokemon extends IPokemon {
  isFavorite: boolean
}

export type IUserPokemonReference = Pick<
  IUserPokemon,
  'name' | 'displayName' | 'isFavorite'
>

export class Pokemon implements IPokemon {
  name: string
  abilities: IAbility[]
  imageUrl: string

  constructor(options: Omit<IPokemon, 'isSkilled' | 'displayName'>) {
    this.name = options.name
    this.abilities = options.abilities
    this.imageUrl = options.imageUrl
  }

  get displayName() {
    return capitalize(this.name)
  }

  get isSkilled() {
    return this.abilities.length > 2
  }
}

export class UserPokemon extends Pokemon implements IUserPokemon {
  isFavorite: boolean

  constructor(options: Omit<IUserPokemon, 'isSkilled'>) {
    super(options)
    this.isFavorite = options.isFavorite
  }
}

export class PokemonReference implements IPokemonReference {
  name: string

  constructor(options: Omit<IPokemonReference, 'displayName'>) {
    this.name = options.name
  }

  get displayName() {
    return capitalize(this.name)
  }
}

export class UserPokemonReference
  extends PokemonReference
  implements IUserPokemonReference
{
  isFavorite: boolean

  constructor(options: Omit<IUserPokemonReference, 'displayName'>) {
    super(options)
    this.isFavorite = options.isFavorite
  }
}
