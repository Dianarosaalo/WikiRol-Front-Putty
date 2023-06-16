import { Pipe, PipeTransform } from "@angular/core";
import { Character } from "src/app/characters/interfaces/character";

@Pipe({
  name: 'characterFilter',
  standalone: true,
})

export class CharacterFilterPipe implements PipeTransform {
  transform(
    characters: Character[],
    search: string
  ): Character[] {
    return search
      ? characters.filter((c) =>
          c.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      : characters;
  }
}
