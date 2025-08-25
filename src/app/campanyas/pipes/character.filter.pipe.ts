/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Pipe, PipeTransform } from "@angular/core";
import { Character} from "src/app/characters/interfaces/character";

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
    selectedCampaigns?: string[],
    selectedVersion?: string,
    selectedBestiary?:string,
    SelectedMarcaNegra?:string, //cuidadin que este es el unico en mayuscula
    selectedDead?:string

  ): Character[] {
    // First, filter by faction if provided
    const filteredByFaction = faction
      ? characters.filter((c) =>
          c.facciones.some((f) => f.toLocaleLowerCase().includes(faction.toLocaleLowerCase()))
        )
      : characters;

    // If selectedCampaigns are provided, filter characters based on their campaigns
    const filteredByCampaigns = selectedCampaigns
      ? filteredByFaction.filter((c) =>
          selectedCampaigns.some((campaign) =>
            c.campanya === campaign || c.campanyasSecundarias!.includes(campaign)
          )
        )
      : filteredByFaction;

    // Filter by selectedVersion if provided
    let filteredByVersion: Character[] = [];
    switch (selectedVersion) {
      case 'O': // Filter characters without a version
        filteredByVersion = filteredByCampaigns.filter((c) => !c.version);
        break;
      case 'V': // Filter characters with a version
        filteredByVersion = filteredByCampaigns.filter((c) => c.version);
        break;
      case 'T': // Return all characters without additional filtering
      default:
        filteredByVersion = filteredByCampaigns;
        break;
    }

    let filteredByBestiary: Character[] = [];
    switch (selectedBestiary) {
      case 'P': // Filter characters that arent bestiary
        filteredByBestiary = filteredByVersion.filter((c) => !c.bestiario);
        break;
      case 'B': // Filter characters that are bestiary
        filteredByBestiary = filteredByVersion.filter((c) => c.bestiario);
        break;
      case 'T': // Return all characters without additional filtering
      default:
        filteredByBestiary = filteredByVersion;
        break;
    }

    let filteredByMarcaNegra: Character[] = [];
    switch (SelectedMarcaNegra) {
      case 'Y': // return all characters (redundant but it helps me)
      filteredByMarcaNegra = filteredByBestiary;
        break;
      case 'N': // Filter characters that do not have MarcaNegra
      filteredByMarcaNegra = filteredByBestiary.filter((c) => !c.marcaNegra===true);
        break;
      default:
        filteredByMarcaNegra = filteredByBestiary;
        break;
    }

    let filteredByDeath: Character[] = [];
    switch (selectedDead) {
      case 'T': // return all characters (redundant but it helps me)
      filteredByDeath = filteredByMarcaNegra;
        break;
      case 'V': // Filter characters vivos
      filteredByDeath = filteredByMarcaNegra.filter((c) => !c.muerto===true);
        break;
      case 'M': // Filter characters muertos
      filteredByDeath = filteredByMarcaNegra.filter((c) => c.muerto===true);
        break;
      default:
        filteredByDeath = filteredByMarcaNegra;
        break;
    }

    // Now, filter by search term if provided
    return search
      ? filteredByDeath.filter((c) =>
          c.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : this.OrderBy(order, filteredByDeath);
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
    else if (order==="partidaAparicion"){
      myCharacters.sort((a,b)=>{
        if (a.partidaAparicion===b.partidaAparicion) return 0;
        return a.partidaAparicion > b.partidaAparicion ? 1 : -1
      });
    }

    //stats

    else if (order==="fuerza"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          a.fue=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          b.fue=0;

        if (a.fue===b.fue) return 0;
        return a.fue < b.fue ? 1 : -1
      });
    }

    else if (order==="destreza"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          a.des=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          b.des=0;

        if (a.des===b.des) return 0;
        return a.des < b.des ? 1 : -1
      });
    }

    else if (order==="constitucion"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          a.con=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          b.con=0;

        if (a.con===b.con) return 0;
        return a.con < b.con ? 1 : -1
      });
    }

    else if (order==="inteligencia"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          a.int=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          b.int=0;

        if (a.int===b.int) return 0;
        return a.int < b.int ? 1 : -1
      });
    }

    else if (order==="sabiduria"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          a.sab=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          b.sab=0;

        if (a.sab===b.sab) return 0;
        return a.sab < b.sab ? 1 : -1
      });
    }

    else if (order==="carisma"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          a.car=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          b.car=0;

        if (a.car===b.car) return 0;
        return a.car < b.car ? 1 : -1
      });
    }

    else if (order==="armadura"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          a.ca=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          b.ca=0;

        if (a.ca===b.ca) return 0;
        return a.ca < b.ca ? 1 : -1
      });
    }

    else if (order==="vida"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          a.pv=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          b.pv=0;

        if (a.pv===b.pv) return 0;
        return a.pv < b.pv ? 1 : -1
      });
    }

    else if (order==="movimiento"){
      myCharacters.sort((a,b)=>{

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          a.movimiento=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          b.movimiento=0;

        if (a.movimiento===b.movimiento) return 0;
        return a.movimiento < b.movimiento ? 1 : -1
      });
    }

    else if (order==="altura"){
      myCharacters.sort((a,b)=>{

        if (!a.altura)
          a.altura=0;

        if (a.altura===b.altura) return 0;
        return a.altura < b.altura ? 1 : -1
      });
    }

    else if (order==="peso"){
      myCharacters.sort((a,b)=>{

        if (!a.peso)
          a.peso=0;

        if (a.peso===b.peso) return 0;
        return a.peso < b.peso ? 1 : -1
      });
    }

    else if (order==="nivel"){
      myCharacters.sort((a,b)=>{

        const sumLevels = (character:Character) => {
          let sum = 0;
          if (character.clases) {
            character.clases.forEach((clase) => {
              sum += clase.level;
            });
          }
          return sum;
        };

        // Calculate sum of levels for each character
        let sumA = sumLevels(a);
        let sumB = sumLevels(b);

        if (a.privateStats==true && a.creator!==JSON.parse(String(localStorage.getItem("user"))))
          sumA=0;
        if (b.privateStats==true && b.creator!==JSON.parse(String(localStorage.getItem("user"))))
          sumB=0;

        // Compare based on the sum of levels
        if (sumA === sumB) return 0;
        return sumA < sumB ? 1 : -1;
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
