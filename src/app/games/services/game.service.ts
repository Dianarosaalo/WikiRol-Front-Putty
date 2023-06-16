import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Game } from "../interfaces/game";
import { GameResponse,GamesResponse } from "../interfaces/gameResponse";

@Injectable({
  providedIn: 'root',
})
export class GameService{
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Game[]> {
    return this.http
      .get<GamesResponse>('partidas')
      .pipe(map((p) => p.partidas));
  }

  getById(_id: string): Observable<Game> {
    return this.http
      .get<GameResponse>(`partidas/${_id}`)
      .pipe(map((p) => p.partida));
  }

  post(partida: Game): Observable<Game> {
    return this.http
      .post<Game>('partidas', partida)
      .pipe(map((p) => p));
  }

  delete(_id: string): Observable<void> {
    return this.http.delete<void>(`partidas/${_id}`).pipe();
  }

  edit(game: Game): Observable<Game> {
    return this.http
      .put<GameResponse>(`partidas/${game._id}`, game)
      .pipe(map((resp) => resp.partida));
  }
}
