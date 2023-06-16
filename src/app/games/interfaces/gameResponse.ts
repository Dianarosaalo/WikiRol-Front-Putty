import { Game } from "./game"

export interface GamesResponse{
  partidas: Game[]
}

export interface GameResponse{
  partida: Game
}
