export interface IAbility {
  name: string
}

export interface IPokemon {
  name: string
  abilities: IAbility[]
  imageUrl: string
}