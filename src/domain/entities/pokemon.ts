export interface IAbility {
  name: string
}

export interface IPokemon {
  name: string
  abilities: IAbility[]
  imageUrl: string
  isSkilled: boolean
}

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

export type IPokemonReference = Pick<IPokemon, 'name'>
