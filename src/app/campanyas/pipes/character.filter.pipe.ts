import { Pipe, PipeTransform } from "@angular/core";
import { Character } from "src/app/characters/interfaces/character";

@Pipe({
  name: 'characterFilter',
  standalone: true,
})

export class CharacterFilterPipe implements PipeTransform {
  transform(
    characters: Character[],
    search: string,
    faction: string,
    order: string,
  ): Character[] {
    const filteredByFaction = faction
      ? characters.filter((c) => c.facciones.some(f => f.toLocaleLowerCase().includes(faction.toLocaleLowerCase())))
      : characters;

    return search
      ? filteredByFaction.filter((c) =>
          c.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : this.OrderBy(order, filteredByFaction);
  }

  OrderBy(order:string, characters:Character[]){
    // eslint-disable-next-line prefer-const
    let myCharacters=[...characters];
    if (order==="nombre")
    {
      myCharacters.sort((a,b)=>{
        if (a.nombre===b.nombre) return 0;
        return a.nombre > b.nombre ? 1 : -1
      });
    }
    else if (order==="edad"){
      myCharacters.sort((a,b)=>{
        if (a.edad===b.edad) return 0;
        return a.edad < b.edad ? 1 : -1
      });
    }
    else if (order==="tier"){
      myCharacters.sort((a,b)=>{
        if (a.tier===b.tier) return 0;
        return a.tier > b.tier ? 1 : -1
      });
    }
    return myCharacters;
  }
}
