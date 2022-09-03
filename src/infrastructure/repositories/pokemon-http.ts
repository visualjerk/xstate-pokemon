import { IPokemonService } from '@domain/services/pokemon-service'

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

export const pokemonHttpRepository: IPokemonService = {
  getList() {
    return fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => response.json() as Promise<PokemonListDTO>)
      .then((json) => json.results.map(({ name }) => ({ name })))
  },
  getDetails(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json() as Promise<PokemonDetailsDTO>)
      .then((json) => ({
        name: json.name,
        abilities: json.abilities.map(({ ability }) => ({
          name: ability.name,
        })),
        imageUrl: json.sprites.front_default,
      }))
  },
}
