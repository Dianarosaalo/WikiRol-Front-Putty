import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from 'src/app/characters/services/character.service';
import { Router,RouterLink } from '@angular/router';
import { Character } from 'src/app/characters/interfaces/character';
import { CharacterCardComponent } from 'src/app/characters/character-card/character-card.component';
import { CharacterFilterPipe } from '../pipes/character.filter.pipe';
import { FormsModule } from '@angular/forms';

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

  DeusChars!:Character[];
  SSSSSChars!:Character[];
  SSSSChars!:Character[];
  SSSChars!:Character[];
  SSChars!:Character[];
  SChars!:Character[];
  AChars!:Character[];
  BChars!:Character[];
  CChars!:Character[];
  DChars!:Character[];
  EChars!:Character[];
  FChars!:Character[];
  UnknownChars!:Character[];


  constructor(
    private readonly characterService:CharacterService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.characterService.getAll().subscribe({
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
    })
  }

  transformDescription(description:string):string{
    const myDate=String(description);
    return myDate.substring(0,160);
  }

  transformTitle(description:string):string{
    const myDate=String(description);
    return myDate.substring(0,55);
  }

}
