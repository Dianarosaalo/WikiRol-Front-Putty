import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from 'src/app/characters/services/character.service';
import { Router,RouterLink } from '@angular/router';
import { Character } from 'src/app/characters/interfaces/character';
import { CharacterCardComponent } from 'src/app/characters/character-card/character-card.component';
import { CharacterFilterPipe } from '../pipes/character.filter.pipe';
import { FormsModule } from '@angular/forms';
import { CharactersResponse } from 'src/app/characters/interfaces/characterResponse';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Component({
  selector: 'fs-campanya-tier',
  standalone: true,
  imports: [CommonModule,CharacterCardComponent,RouterLink,CharacterFilterPipe,FormsModule],
  templateUrl: './campanya-tier.component.html',
  styleUrls: ['./campanya-tier.component.css']
})
export class CampanyaTierComponent {

  characters!:Character[];
  search="";

  DeusChars:Character[]=[];
  SupremeChars:Character[]=[];
  SSSSSChars:Character[]=[];
  SSSSChars:Character[]=[];
  SSSChars:Character[]=[];
  SSChars:Character[]=[];
  SChars:Character[]=[];
  AChars:Character[]=[];
  BChars:Character[]=[];
  CChars:Character[]=[];
  DChars:Character[]=[];
  EChars:Character[]=[];
  FChars:Character[]=[];
  UnknownChars:Character[]=[];


  constructor(
    private readonly characterService:CharacterService,
    private readonly router: Router,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCharacters("0.- Deus Ex Machina",this.DeusChars);
    this.loadCharacters("0.25.- Supremo",this.SupremeChars);
    this.loadCharacters("0.5.- SSSSS",this.SSSSSChars);
    this.loadCharacters("1.- SSSS",this.SSSSChars);
    this.loadCharacters("2.- SSS",this.SSSChars);
    this.loadCharacters("3.- SS",this.SSChars);
    this.loadCharacters("4.- S",this.SChars);
    this.loadCharacters("5.- A",this.AChars);
    this.loadCharacters("6.- B",this.BChars);
    this.loadCharacters("7.- C",this.CChars);
    this.loadCharacters("8.- D",this.DChars);
    this.loadCharacters("9.- E",this.EChars);
    this.loadCharacters("9.5.- F",this.FChars);
    this.loadCharacters("9.9.- Desconocido",this.UnknownChars);
    /*this.characterService.getAll().subscribe({
      next: (characters) => {
        this.characters=characters
        this.DeusChars=characters.filter((c)=>c.tier==="0.- Deus Ex Machina")
        this.SSSSSChars=characters.filter((c)=>c.tier==="0.5.- SSSSS")
        this.SSSSChars=characters.filter((c)=>c.tier==="1.- SSSS")
        this.SSSChars=characters.filter((c)=>c.tier==="2.- SSS")
        this.SSChars=characters.filter((c)=>c.tier==="3.- SS")
        this.SChars=characters.filter((c)=>c.tier==="4.- S")
        this.AChars=characters.filter((c)=>c.tier==="5.- A")
        this.BChars=characters.filter((c)=>c.tier==="6.- B")
        this.CChars=characters.filter((c)=>c.tier==="7.- C")
        this.DChars=characters.filter((c)=>c.tier==="8.- D")
        this.EChars=characters.filter((c)=>c.tier==="9.- E")
        this.FChars=characters.filter((c)=>c.tier==="9.5.- F")
        this.UnknownChars=characters.filter((c)=>c.tier==="9.9.- Desconocido")

      }, //characters.forEach((c)=>this.characters.push(c)),
      error: (error) => console.log("Ha habido un error" + error + this.characters),
      complete: () => console.log("")
    })*/

    document.title = "WikiRol | TierList"
  }

  transformDescription(description:string):string{
    const myDate=String(description);
    return myDate.substring(0,160);
  }

  transformTitle(description:string):string{
    const myDate=String(description);
    return myDate.substring(0,55);
  }

  loadCharacters(currentTier:string, myChars:Character[]): void {
    this.http.get<CharactersResponse>('personajes/tier', {
      params: {
        tier: currentTier
      }
    }).pipe(
    map((c) => c.personajes),
    tap((characters: Character[]) => {
      // Filter characters based on privacy before pushing into myChars
      const filteredCharacters = characters.filter(c => !c.private || (c.private && c.creator === JSON.parse(String(localStorage.getItem("user")))));
      myChars.push(...filteredCharacters);
      console.log('Characters loaded:', filteredCharacters);
    })
  ).subscribe(() => {
    // Trigger change detection after characters are loaded and filtered
    this.cdr.detectChanges();
  });
}

}
