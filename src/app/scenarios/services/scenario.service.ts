import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Scenario } from "../interfaces/scenario";
import { ScenarioResponse, ScenariosResponse } from "../interfaces/scenarioResponse";

@Injectable({
  providedIn: 'root',
})
export class ScenarioService{
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Scenario[]> {
    return this.http
      .get<ScenariosResponse>('escenarios')
      .pipe(map((e) => e.escenarios));
  }

  getById(_id: string): Observable<Scenario> {
    return this.http
      .get<ScenarioResponse>(`escenarios/${_id}`)
      .pipe(map((p) => p.escenario));
  }

  post(escenario: Scenario): Observable<Scenario> {
    return this.http
      .post<Scenario>('escenarios', escenario)
      .pipe(map((p) => p));
  }

  delete(_id: string): Observable<void> {
    return this.http.delete<void>(`escenarios/${_id}`).pipe();
  }

  edit(escenario: Scenario): Observable<Scenario> {
    return this.http
      .put<ScenarioResponse>(`escenarios/${escenario._id}`, escenario)
      .pipe(map((resp) => resp.escenario));
  }
}
