import { Pipe, PipeTransform } from "@angular/core";
import { Scenario } from "src/app/scenarios/interfaces/scenario";

@Pipe({
  name: 'scenarioFilter',
  standalone: true,
})

export class ScenarioFilterPipe implements PipeTransform {
  transform(
    escenarios: Scenario[],
    search: string
  ): Scenario[] {
    return search
      ? escenarios.filter((e) =>
          e.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      : escenarios;
  }
}
