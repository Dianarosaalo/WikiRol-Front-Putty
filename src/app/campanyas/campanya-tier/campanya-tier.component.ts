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
import { FactionsResponse } from 'src/app/factions/interfaces/factionResponse';
import { Faction } from 'src/app/factions/interfaces/faction';

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

  faction=`""`;
  order=""

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

    this.loadFactions();
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
      const filteredCharacters = characters.filter(c => !c.private || (c.private && c.creator === JSON.parse(String(localStorage.getItem("user")))) || (c.private && c.reader===JSON.parse(String(localStorage.getItem("user")))) );
      myChars.push(...filteredCharacters);
      console.log('Characters loaded:', filteredCharacters.length);
    })
  ).subscribe(() => {
    // Trigger change detection after characters are loaded and filtered
    this.cdr.detectChanges();
  });
}

loadFactions(): void {
  this.http.get<FactionsResponse>('facciones/').pipe(
    map((f) => f.facciones.map((faction: Faction) => ({ value: faction.titulo, label: faction.titulo })))
  ).subscribe((factions: { value: string; label: string }[]) => {
    this.factions = [...this.factions, ...factions];

    this.search = "";
    this.order = "";
    this.cdr.detectChanges();
    this.faction="";
    this.cdr.detectChanges();

    setTimeout(() => {
      this.faction = "Dioses Supremos";
      this.cdr.detectChanges();
    }, 500);

    setTimeout(() => {
      this.faction = "";
      this.cdr.detectChanges();
    }, 500);

  });
}

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
    {value:'Guardianes del Cosmos',label:"Guardianes del Cosmos"},
    {value:'Pruebas',label:"Pruebas DM"}
];

  selectedCampaigns: string[] = this.campaigns.map(campaign => campaign.value);

  onCampaignChange(event: any, value: string): void {
    console.log('Checkbox changed:', value, event.target.checked);
    if (event.target.checked) {
      if (!this.selectedCampaigns.includes(value)) {
        this.selectedCampaigns = [...this.selectedCampaigns, value]; // create a new reference
      }
    } else {
      this.selectedCampaigns = this.selectedCampaigns.filter(c => c !== value);
    }

    console.log('Updated selectedCampaigns:', this.selectedCampaigns);
  }

  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
