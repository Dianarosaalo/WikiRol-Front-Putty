import { Character } from "src/app/characters/interfaces/character";

export interface Game{
  _id?:string
  num:number,
  titulo:string,
  campanya:string,
  fechaJugada:Date,
  resumen:string,
  creator:string,
  personajes?:string[]
  //personajesPresentes: Character[]
}
