import { Pokemon } from '@domain/entities/pokemon'
import { IPokemonRepository } from '@domain/repositories/pokemon'

interface PokemonListDTO {
  results: {
    name: string
  }[]
}

interface PokemonDetailsDTO {
  name: string
  abilities: { ability: { name: string } }[]
  sprites: {
    front_default: string
  }
}

export const pokemonHttpDataSource: IPokemonRepository = {
  getList() {
    return fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => response.json() as Promise<PokemonListDTO>)
      .then((json) => json.results.map(({ name }) => ({ name })))
  },
  getDetails(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json() as Promise<PokemonDetailsDTO>)
      .then(
        (json) =>
          new Pokemon({
            name: json.name,
            abilities: json.abilities.map(({ ability }) => ({
              name: ability.name,
            })),
            imageUrl: json.sprites.front_default,
          })
      )
  },
}
