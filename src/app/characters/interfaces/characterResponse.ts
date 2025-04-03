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

export interface DeidadGroup {
  deidad: string; // Name of the group
  deidades: Character[]; // Characters belonging to this group
}

export interface BestiaGroup {
  bestia: string; // Name of the group
  bestias: Character[]; // Characters belonging to this group
}
