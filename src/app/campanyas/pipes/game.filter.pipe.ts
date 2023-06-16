import { Pipe, PipeTransform } from "@angular/core";
import { Game } from "src/app/games/interfaces/game";

@Pipe({
  name: 'gameFilter',
  standalone: true,
})

export class GameFilterPipe implements PipeTransform {
  transform(
    partidas: Game[],
    search: string
  ): Game[] {
    return search
      ? partidas.filter((p) =>
          p.titulo.toLocaleLowerCase().includes(search.toLocaleLowerCase())|| p.num===(Number(search)))
      : partidas;
  }
}
