import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from "../interfaces/character";
import { CharactersResponse,CharacterResponse } from "../interfaces/characterResponse";

@Injectable({
  providedIn: 'root',
})
export class CharacterService{
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Character[]> {
    return this.http
      .get<CharactersResponse>('personajes')
      .pipe(map((c) => c.personajes));
  }

  getById(_id: string): Observable<Character> {
    return this.http
      .get<CharacterResponse>(`personajes/${_id}`)
      .pipe(map((c) => c.personaje));
  }

  post(character: Character): Observable<Character> {
    return this.http
      .post<Character>('personajes', character)
      .pipe(map((c) => c));
  }

  delete(_id: string): Observable<void> {
    return this.http.delete<void>(`personajes/${_id}`).pipe();
  }

  edit(character: Character): Observable<Character> {
    return this.http
      .put<CharacterResponse>(`personajes/${character._id}`, character)
      .pipe(map((resp) => resp.personaje));
  }

}
