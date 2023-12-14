import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from 'src/app/characters/interfaces/character';
import { CharacterService } from 'src/app/characters/services/character.service';
import { ActivatedRoute, Router,RouterLink, NavigationEnd} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CharacterFilterPipe } from '../pipes/character.filter.pipe';
import { GameFilterPipe } from '../pipes/game.filter.pipe';
import { Game } from 'src/app/games/interfaces/game';
import { GameService } from 'src/app/games/services/game.service';
import { HttpClient } from '@angular/common/http';
import { CharactersResponse } from 'src/app/characters/interfaces/characterResponse';
import { map } from 'rxjs';
import { FactionsResponse } from 'src/app/factions/interfaces/factionResponse';
import { Faction } from 'src/app/factions/interfaces/faction';

@Component({
  selector: 'fs-campanya-details',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule,CharacterFilterPipe,GameFilterPipe],
  templateUrl: './campanya-details.component.html',
  styleUrls: ['./campanya-details.component.css']
})
export class CampanyaDetailsComponent implements OnInit,OnDestroy{

  characters!:Character[];
  id!:string;
  search="";
  searchGame="";
  partidas!:Game[];
  activeTab="Personajes";
  faction=""
  order=""
  design=localStorage.getItem('design');
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
    {value:"edad", label:"Edad"}
  ];

  constructor(
    private readonly characterService:CharacterService,
    private readonly gameService:GameService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
    this.id=String((this.route.snapshot.paramMap.get('id'))) ;
    this.loadCharacters();
    this.loadFactions();
    /*this.characterService.getAll().subscribe({
      next: (characters) => this.characters=characters, //characters.forEach((c)=>this.characters.push(c)),
      error: (error) => console.log("Ha habido un error" + error + this.characters),
      complete: () => this.characters=this.characters.filter((c)=>c.campanya===this.id)
    })*/
    this.gameService.getAll().subscribe({
      next: (partidas) => this.partidas=partidas.sort((a, b) => a.num - b.num),
      error: (error) => console.log("Ha habido un error" + error + this.partidas),
      complete: () => this.partidas=this.partidas.filter((p)=>p.campanya===this.id)
    })
    if (!this.design)
      this.design='new';

    document.title = "WikiRol | " + this.id;
  }

  ngOnDestroy(): void{
    this.id="";
  }

  transformDescription(description:string):string{
    const myDate=String(description);
    return myDate.substring(0,160);
  }

  transformTitle(description:string):string{
    const myDate=String(description);
    return myDate.substring(0,55);
  }

  onTabClick(tab:string)
  {
    this.activeTab=tab;
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
        pageSize: this.pageSize.toString(),
        campanya: this.id
      }
    }).pipe(map((c) => c.personajes)).subscribe((characters: Character[]) => {

      //characters.forEach((c) => this.characters.push(c));
      //this.characters=characters;
      //const characterNumber=this.characters.length;
      this.characters=[...this.characters, ...characters];
      this.characters = this.characters.filter((c)=>!c.private || (c.private && c.creator===JSON.parse(String(localStorage.getItem("user")))) || (c.private && c.reader===JSON.parse(String(localStorage.getItem("user")))) );
      characters.forEach((c)=>this.whichTier(c));
      console.log('Characters loaded:', characters);
      //this.characters=this.characters.filter((c)=>c.campanya===this.id);

      // Trigger change detection after appending characters
      this.cdr.detectChanges();

      this.pageNumber++;
      console.log(this.characters);

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
        pageSize: this.pageSize.toString(),
        campanya: this.id
      }
    }).pipe(map((c) => c.personajes)).subscribe((characters: Character[]) => {

      this.characters= characters;
      this.characters = this.characters.filter((c)=>!c.private || (c.private && c.creator===JSON.parse(String(localStorage.getItem("user")))) || (c.private && c.reader===JSON.parse(String(localStorage.getItem("user")))) );
      this.characters.forEach((c)=>this.whichTier(c));
      console.log('Characters loaded:', characters);
      //this.characters=this.characters.filter((c)=>c.campanya===this.id);
      this.pageNumber++;
      this.buttonShow=true;
    });
  }

  whichTier(char:Character)
  {
    if(char.tier==="0.- Deus Ex Machina")
      this.DeusChars.push(char);

    if(char.tier==="0.25.- Supremo")
      this.SupremeChars.push(char);

    if(char.tier==="0.5.- SSSSS")
      this.SSSSSChars.push(char);

    if(char.tier==="1.- SSSS")
      this.SSSSChars.push(char);

    if(char.tier==="2.- SSS")
      this.SSSChars.push(char);

    if(char.tier==="3.- SS")
      this.SSChars.push(char);

    if(char.tier==="4.- S")
      this.SChars.push(char);

    if(char.tier==="5.- A")
      this.AChars.push(char);

    if(char.tier==="6.- B")
      this.BChars.push(char);

    if(char.tier==="7.- C")
      this.CChars.push(char);

    if(char.tier==="8.- D")
      this.DChars.push(char);

    if(char.tier==="9.- E")
      this.EChars.push(char);

    if(char.tier==="9.5.- F")
      this.FChars.push(char);

    if(char.tier==="9.9.- Desconocido")
      this.UnknownChars.push(char);
  }

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

  loadFactions(): void {
    this.http.get<FactionsResponse>('facciones/').pipe(
      map((f) => f.facciones.filter((f)=>f.campanya==="t"||f.campanya===this.id).map((faction: Faction) => ({ value: faction.titulo, label: faction.titulo })))
    ).subscribe((factions: { value: string; label: string }[]) => {
      this.factions = [...this.factions, ...factions];
    });
  }

  queryBuscar():void{
    this.pageNumber=1;
    this.characters=[];
    this.buttonShow=false;

    this.http.get<CharactersResponse>('personajes/busqueda', {
      params: {
        faccion: this.faction,
        nombre: this.search
      }
    }).pipe(map((c) => c.personajes)).subscribe((characters: Character[]) => {
      this.characters= characters;
      this.characters = (this.characters.filter((c)=>!c.private || (c.private && c.creator===JSON.parse(String(localStorage.getItem("user")))) || (c.private && c.reader===JSON.parse(String(localStorage.getItem("user"))))) )
      .filter((c)=>c.campanya === this.id || c.campanyasSecundarias?.includes(this.id));
      this.cdr.detectChanges();
      this.volverButtonShow=true;
      console.log('Characters loaded:', characters)});

  }

  cargarDesdeCero()
  {
    window.location.reload();
  }

}
