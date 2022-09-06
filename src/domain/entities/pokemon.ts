export interface IAbility {
  name: string
}

export interface IPokemon {
  name: string
  abilities: IAbility[]
  imageUrl: string
  isSkilled: boolean
}

export type IPokemonReference = Pick<IPokemon, 'name'>

export interface IUserPokemon extends IPokemon {
  isFavorite: boolean
}

export type IUserPokemonReference = Pick<IUserPokemon, 'name' | 'isFavorite'>

export class Pokemon implements IPokemon {
  name: string
  abilities: IAbility[]
  imageUrl: string

  constructor(options: Omit<IPokemon, 'isSkilled'>) {
    this.name = options.name
    this.abilities = options.abilities
    this.imageUrl = options.imageUrl
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
