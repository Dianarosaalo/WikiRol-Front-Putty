import { Pipe, PipeTransform } from "@angular/core";
import { Character, Class } from "src/app/characters/interfaces/character";

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

    //stats

    else if (order==="fuerza"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true)
          a.fue=0;
        if (b.privateStats==true)
          b.fue=0;

        if (a.fue===b.fue) return 0;
        return a.fue < b.fue ? 1 : -1
      });
    }

    else if (order==="destreza"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true)
          a.des=0;
        if (b.privateStats==true)
          b.des=0;

        if (a.des===b.des) return 0;
        return a.des < b.des ? 1 : -1
      });
    }

    else if (order==="constitucion"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true)
          a.con=0;
        if (b.privateStats==true)
          b.con=0;

        if (a.con===b.con) return 0;
        return a.con < b.con ? 1 : -1
      });
    }

    else if (order==="inteligencia"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true)
          a.int=0;
        if (b.privateStats==true)
          b.int=0;

        if (a.int===b.int) return 0;
        return a.int < b.int ? 1 : -1
      });
    }

    else if (order==="sabiduria"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true)
          a.sab=0;
        if (b.privateStats==true)
          b.sab=0;

        if (a.sab===b.sab) return 0;
        return a.sab < b.sab ? 1 : -1
      });
    }

    else if (order==="carisma"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true)
          a.car=0;
        if (b.privateStats==true)
          b.car=0;

        if (a.car===b.car) return 0;
        return a.car < b.car ? 1 : -1
      });
    }

    else if (order==="armadura"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true)
          a.ca=0;
        if (b.privateStats==true)
          b.ca=0;

        if (a.ca===b.ca) return 0;
        return a.ca < b.ca ? 1 : -1
      });
    }

    else if (order==="vida"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true)
          a.pv=0;
        if (b.privateStats==true)
          b.pv=0;

        if (a.pv===b.pv) return 0;
        return a.pv < b.pv ? 1 : -1
      });
    }

    else if (order==="movimiento"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true)
          a.movimiento=0;
        if (b.privateStats==true)
          b.movimiento=0;

        if (a.movimiento===b.movimiento) return 0;
        return a.movimiento < b.movimiento ? 1 : -1
      });
    }

    /*else if (order==="Nivel"){
      myCharacters.sort((a,b)=>{
        if (a.clases?.array.forEach(element => {
          level
        });===b.clases?.level) return 0;
        return a.pv < b.pv ? 1 : -1
      });
    }*/

    //ordena los personajes
    return myCharacters;
  }
}
