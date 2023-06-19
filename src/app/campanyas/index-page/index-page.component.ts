import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from 'src/app/characters/services/character.service';
import { Router,RouterLink } from '@angular/router';
import { Character } from 'src/app/characters/interfaces/character';
import { CharacterCardComponent } from 'src/app/characters/character-card/character-card.component';
import { CharacterFilterPipe } from '../pipes/character.filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fs-index-page',
  standalone: true,
  imports: [CommonModule,CharacterCardComponent,RouterLink,CharacterFilterPipe,FormsModule], //el router link una vez implemente lo que es la card no me será necesario // cuidadín con las responses
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  characters!:Character[];
  search="";

  constructor(
    private readonly characterService:CharacterService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.characterService.getAll().subscribe({
      next: (characters) => this.characters=characters, //characters.forEach((c)=>this.characters.push(c)),
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
