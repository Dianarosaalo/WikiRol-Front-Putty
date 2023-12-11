import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Faction } from "../interfaces/faction";
import { FactionResponse,FactionsResponse } from "../interfaces/factionResponse";

@Injectable({
  providedIn: 'root',
})
export class FactionService{
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Faction[]> {
    return this.http
      .get<FactionsResponse>('facciones')
      .pipe(map((f) => f.facciones));
  }

  getById(_id: string): Observable<Faction> {
    return this.http
      .get<FactionResponse>(`facciones/${_id}`)
      .pipe(map((f) => f.faccion));
  }

  post(faction: Faction): Observable<Faction> {
    return this.http
      .post<Faction>('facciones', faction)
      .pipe(map((f) => f));
  }

  delete(_id: string): Observable<void> {
    return this.http.delete<void>(`facciones/${_id}`).pipe();
  }

  edit(faction: Faction): Observable<Faction> {
    return this.http
      .put<FactionResponse>(`facciones/${faction._id}`, faction)
      .pipe(map((resp) => resp.faccion));
  }
}
