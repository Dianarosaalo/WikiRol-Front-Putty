import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from 'src/app/characters/interfaces/character';
import { CharacterService } from 'src/app/characters/services/character.service';
import { ActivatedRoute, Router,RouterLink, NavigationEnd} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CharacterFilterPipe } from '../pipes/character.filter.pipe';
import { GameFilterPipe } from '../pipes/game.filter.pipe';
import { Game } from 'src/app/games/interfaces/game';
import { GameService } from 'src/app/games/services/game.service';

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
  faction="El Imperio de la Humanidad"
  order=""
  design=localStorage.getItem('design');

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
    private readonly gameService:GameService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
    this.id=String((this.route.snapshot.paramMap.get('id'))) ;
    this.characterService.getAll().subscribe({
      next: (characters) => this.characters=characters, //characters.forEach((c)=>this.characters.push(c)),
      error: (error) => console.log("Ha habido un error" + error + this.characters),
      complete: () => this.characters=this.characters.filter((c)=>c.campanya===this.id)
    })
    this.gameService.getAll().subscribe({
      next: (partidas) => this.partidas=partidas.sort((a, b) => a.num - b.num),
      error: (error) => console.log("Ha habido un error" + error + this.partidas),
      complete: () => this.partidas=this.partidas.filter((p)=>p.campanya===this.id)
    })
    if (!this.design)
      this.design='new';
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

}
