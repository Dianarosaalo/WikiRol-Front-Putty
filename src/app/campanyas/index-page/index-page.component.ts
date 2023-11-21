import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from 'src/app/characters/services/character.service';
import { Router,RouterLink } from '@angular/router';
import { Character } from 'src/app/characters/interfaces/character';
import { CharacterCardComponent } from 'src/app/characters/character-card/character-card.component';
import { CharacterFilterPipe } from '../pipes/character.filter.pipe';
import { FormsModule } from '@angular/forms';
import { CharactersResponse } from 'src/app/characters/interfaces/characterResponse';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

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
  design=localStorage.getItem('design');
  faction=""
  order=""
  pageNumber = 1;       //
  pageSize = 18;        //
  buttonShow=false;

  factions=[
    {value:"", label:"Todos"},
    {value:'El Imperio de la Humanidad',label:"El Imperio de la Humanidad"}];

  typeOfOrders=[
    {value:"", label:"Ninguno"},
    {value:"nombre", label:"Nombre"},
    {value:"tier", label:"Tier"},
    {value:"edad", label:"Edad"}
  ];

  constructor(
    private readonly characterService:CharacterService,
    private readonly router: Router,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
    /*this.characterService.getAll().subscribe({
      next: (characters) => this.characters=characters, //characters.forEach((c)=>this.characters.push(c)),
      error: (error) => console.log("Ha habido un error" + error + this.characters),
      complete: () => console.log("")
    })*/
    if (!this.design)
      this.design='new';

    document.title = "WikiRol"
  }

  transformDescription(description:string):string{
    const myDate=String(description);
    return myDate.substring(0,160);
  }

  transformTitle(description:string):string{
    const myDate=String(description);
    return myDate.substring(0,55);
  }

  changeDesign(type:string)
  {
    localStorage.setItem("design",type);
    this.design=localStorage.getItem('design');
  }

  onScroll(): void {
    this.buttonShow=false;
    this.http.get<CharactersResponse>('personajes/scroll', {
      params: {
        pageNumber: this.pageNumber.toString(),
        pageSize: this.pageSize.toString()
      }
    }).pipe(map((c) => c.personajes)).subscribe((characters: Character[]) => {
      console.log('Characters loaded:', characters);
      //characters.forEach((c) => this.characters.push(c));
      //this.characters=characters;
      this.characters=[...this.characters, ...characters];

      // Trigger change detection after appending characters
      this.cdr.detectChanges();

      this.pageNumber++;
      console.log(this.characters);
      this.buttonShow=true;
    });
  }

  //loadCharacters
  loadCharacters(): void {
    this.http.get<CharactersResponse>('personajes/scroll', {
      params: {
        pageNumber: this.pageNumber.toString(),
        pageSize: this.pageSize.toString()
      }
    }).pipe(map((c) => c.personajes)).subscribe((characters: Character[]) => {
      console.log('Characters loaded:', characters);
      this.characters= characters;
      this.pageNumber++;
      this.buttonShow=true;
    });
  }
}
