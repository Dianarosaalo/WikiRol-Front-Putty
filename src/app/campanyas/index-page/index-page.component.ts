/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from 'src/app/characters/services/character.service';
import { Router,RouterLink } from '@angular/router';
import { Character } from 'src/app/characters/interfaces/character';
//import { CharacterCardComponent } from 'src/app/characters/character-card/character-card.component';
import { CharacterFilterPipe } from '../pipes/character.filter.pipe';
import { FactionsFilterPipe } from '../pipes/faction.filter.pipe';
import { FormsModule } from '@angular/forms';
import { CharactersResponse } from 'src/app/characters/interfaces/characterResponse';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
//import { FactionService } from 'src/app/factions/services/faction.service';
import { FactionsResponse } from 'src/app/factions/interfaces/factionResponse';
import { Faction } from 'src/app/factions/interfaces/faction';

@Component({
  selector: 'fs-index-page',
  standalone: true,
  imports: [CommonModule,RouterLink,CharacterFilterPipe,FormsModule,FactionsFilterPipe], //el router link una vez implemente lo que es la card no me será necesario // cuidadín con las responses
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
  volverButtonShow=false;

  factions=[
    {value:"", label:"Todos"}];

    typeOfOrders=[
      {value:"", label:"Ninguno"},
      {value:"nombre", label:"Nombre"},
      {value:"tier", label:"Tier"},
      {value:"nivel", label:"Nivel"},
      {value:"edad", label:"Edad"},
      {value:"altura", label:"Altura"},
      {value:"peso", label:"Peso"},
      {value:"fuerza", label:"Fuerza"},
      {value:"destreza", label:"Destreza"},
      {value:"constitucion", label:"Constitución"},
      {value:"inteligencia", label:"Inteligencia"},
      {value:"sabiduria", label:"Sabiduría"},
      {value:"carisma", label:"Carisma"},
      {value:"armadura", label:"Armadura"},
      {value:"vida", label:"Vida"},
      {value:"movimiento", label:"Movimiento"},
    ];

  constructor(
    private readonly characterService:CharacterService,
    //private readonly factionService:FactionService,
    private readonly router: Router,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCharacters();

    this.loadFactions();

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
    return myDate.substring(0,280);
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

      //characters.forEach((c) => this.characters.push(c));
      //this.characters=characters;
      //const characterNumber=this.characters.length;
      this.characters=[...this.characters, ...characters];
      this.characters = this.characters.filter((c)=>!c.private || (c.private && c.creator===JSON.parse(String(localStorage.getItem("user")))) || (c.private && c.reader===JSON.parse(String(localStorage.getItem("user")))));
      console.log('Characters loaded:', characters.length);
      // Trigger change detection after appending characters
      this.cdr.detectChanges();

      this.pageNumber++;
      console.log(this.characters.length);

      this.buttonShow=true;
      /*if (characterNumber===this.characters.length)
        this.buttonShow=false;
      else{
        this.buttonShow=true;
      }*/

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
      this.characters= characters;
      this.characters = this.characters.filter((c)=>!c.private || (c.private && c.creator===JSON.parse(String(localStorage.getItem("user")))) || (c.private && c.reader===JSON.parse(String(localStorage.getItem("user")))) );
      console.log('Characters loaded:', characters.length);
      this.pageNumber++;
      this.buttonShow=true;
    });
  }

  loadFactions(): void {
    this.http.get<FactionsResponse>('facciones/').pipe(
      map((f) => f.facciones.map((faction: Faction) => ({ value: faction.titulo, label: faction.titulo })))
    ).subscribe((factions: { value: string; label: string }[]) => {
      this.factions = [...this.factions, ...factions];
    });
  }

  queryBuscar():void{
    this.pageNumber=1;
    this.characters=[];
    this.buttonShow=false;

    if (this.search=="" && this.faction=="")
    {
      console.log("No es una búsqueda correcta")
    }
    else{
      this.http.get<CharactersResponse>('personajes/busqueda', {
        params: {
          faccion: this.faction,
          nombre: this.search
        }
      }).pipe(map((c) => c.personajes)).subscribe((characters: Character[]) => {
        this.characters= characters;
        this.characters = this.characters.filter((c)=>!c.private || (c.private && c.creator===JSON.parse(String(localStorage.getItem("user")))) || (c.private && c.reader===JSON.parse(String(localStorage.getItem("user")))) );
        this.cdr.detectChanges();
        //this.buttonShow=true;
        this.volverButtonShow=true;
        console.log(this.volverButtonShow);
        console.log('Characters loaded:', characters.length)});
    }



  }

  cargarDesdeCero()
  {
    window.location.reload();
  }

  //campaigns

  campaigns = [
    {value:'Egathea',label:"Egathea"},
      {value:'Caminos de Sangre',label:"Caminos de Sangre"},
      {value:'Aryma',label:"Aryma"},
      {value:'Yggdrassil',label:"Yggdrassil"},

      {value:'Djuna',label:"Djuna & Co"},
      {value:'Mario',label:"Cruzados Mario"},
      {value:'Reinos Olvidados',label:"Reinos Olvidados"},
      {value:'Miscelanea',label:"Miscelanea"},
      {value:'Guerreros de la Luz',label:"Guerreros de la Luz"},
      {value:'Guardianes del Cosmos',label:"Guardianes Cosmos"},
      {value:'Pruebas',label:"Guerreros Oscuros"},
      {value: 'Historias Yggdrassil', label: 'Historias Yggdrassil'}
  ];

    selectedCampaigns: string[] = this.campaigns.map(campaign => campaign.value);

    onCampaignChange(event: any, value: string): void {
      if (event.target.checked) {
        if (!this.selectedCampaigns.includes(value)) {
          this.selectedCampaigns = [...this.selectedCampaigns, value]; // create a new reference
        }
      } else {
        this.selectedCampaigns = this.selectedCampaigns.filter(c => c !== value);
      }
    }

    isDropdownOpen = false;

    toggleDropdown(): void {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

    //versions

    selectedVersion = "T"

    versionOptions = [
      {value:'T',label:"Todos"},
      {value:'O',label:"Solo Originales"},
      {value:'V',label:"Solo Versiones"},
    ]

    //
    factionSearch="";
    alphabetical=false;
    showFactionSelect=false;
}
