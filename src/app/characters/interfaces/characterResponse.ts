import { Character } from "./character";

export interface CharactersResponse{
  personajes: Character[]
}

export interface CharacterResponse{
  personaje: Character
}

export interface TypeCounts {
  [key: string]: number;
}

