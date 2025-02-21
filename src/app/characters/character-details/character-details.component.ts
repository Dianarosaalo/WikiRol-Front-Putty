import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character, Song, Trait } from '../interfaces/character';
import { RouterLink,Router,/*NavigationEnd,*/ ActivatedRoute } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { User } from 'src/app/auth/interfaces/login';
import { UserService } from 'src/app/users/services/user.service';
import { CharacterResponse,CharactersResponse } from '../interfaces/characterResponse';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'fs-character-details',
  standalone: true,
  imports: [CommonModule, RouterLink,HttpClientModule],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit{

  character!: Character;
  //id!:string;
  charCreator!:User
  me=false;
  activeTab="Stats";
  reader=false
  hidden=true

  versions!:Character[];
  hasVersions=false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly characterService:CharacterService,
    private router: Router,
    private readonly userService: UserService,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const posibleId=(this.route.snapshot.paramMap.get('id')) ;
    //this.id="641d7104bade5c8508ec077b" //optimizable
    this.characterService.getById(String(posibleId)).subscribe({
      next: (character) => {
        this.character=character
        this.findOtherVersions();
        document.title="WR | "+this.character.nombre;
        if ((character.reader===JSON.parse(String(localStorage.getItem("user")))))
          this.reader=true;
        console.log("Reader:" + this.reader);
        this.userService.getUserId(String(this.character.creator)).subscribe(
          u => this.charCreator = u
        );
        if (this.character.creator===JSON.parse(localStorage.getItem("user")!)) //to see if the user is yourself, so you can edit.
          this.me=true;
        if (this.me || !this.character.privateStats===true || this.character.reader===JSON.parse(String(localStorage.getItem("user"))))
          this.hidden=false;
      }
    })
  }

  deleteCharacter(){

    const isConfirmed = window.confirm("Seguro que quieres borrar este personaje?");

    if (isConfirmed) {
      this.characterService.delete(String(this.character._id)).subscribe(r=>{console.log("Removed: "+r)});
      this.router.navigate(['/campaigns']);
    }
    else{
      console.log("El Personaje no ha sido eliminado.");
    }

  }

  navigateUserProfile()
  {
    this.router.navigate(['/users/'+this.charCreator._id]);
  }

  goBack() {
    this.router.navigate(['/campaigns']);
  }

  movementRound(feet:number):number
  {
    return (Math.round(feet));
  }

  calculateWeight(weight:number, divisor:number)
  {
    if (weight>=500)
      return "| " +weight/divisor + " Toneladas"
    else
      return "";
  }

  counts(relics:string[]|Song[]|Trait[]):boolean
  {
    let exists=false;
    let counter=0;

    relics.forEach((r)=>counter++)

    if (counter>0) exists=true;

    return exists
  }

  onTabClick(tab:string)
  {
    this.activeTab=tab;
  }

  calcularStats(stat:number){

    if (stat>10)
    {
      stat-=10
      stat=Math.trunc(stat/2);
      return "+" + stat;
    }

    if (stat<10)
    {
      stat= Math.trunc(stat/2);
      return (stat-5);
    }

    else
      return 0;
  }

  Check(rasgos:Trait[],key:string):boolean
  {
    if (rasgos.filter(r=>r.type===key && (r.privacy === false || (r.privacy === true && this.me) || (r.privacy===true && this.reader))).length>0)
      return true;
    else{
      return false;
    }
  }

  calcularSalvaciones(stat:number, saving:number|undefined){
    //console.log(stat, saving);
    stat=Number(this.calcularStats(stat));

    if (saving===undefined)
    {
      if (stat>0)
        return "+"+(stat);
      else{
        return stat;
      }
    }

    else
    {
      if (stat+saving>0)
        return "+"+(stat+saving);
      else{
        return stat+saving;
      }
    }

  }

  findOtherVersions() {
    this.versions = [];

    const characterId = this.character?._id; // Safely access _id, or undefined if character is not defined

    if (characterId) {
        this.http.get<CharactersResponse>('http://vps-5eb41e5a.vps.ovh.net:8080/personajes/versiones', {
            params: {
                version: characterId
            }
        })
        .pipe(map((c) => c.personajes))
        .subscribe((characters: Character[]) => {
            this.versions = characters;
            console.log(characters);
            if (this.versions.length>0)
              {
                this.hasVersions=true;
                this.versions.unshift(this.character);
              }
            console.log("Versiones: " + this.hasVersions)
            this.versions = this.versions.filter((c) =>
                !c.private ||
                (c.private && c.creator === JSON.parse(String(localStorage.getItem("user")))) ||
                (c.private && c.reader === JSON.parse(String(localStorage.getItem("user"))))
            );
            this.cdr.detectChanges();
            //console.log('Characters loaded:', characters.length);
        });
    } else {
        console.warn('Character ID is undefined. Cannot load other versions.');
    }
  }

  changeCharacterVersion(selectedVersion: Character) {
    this.character = selectedVersion;
    if (this.character.creator===JSON.parse(localStorage.getItem("user")!)) //to see if the user is yourself, so you can edit.
          this.me=true;
    else{
      this.me=false;
    }
    if (this.me || !this.character.privateStats===true || this.character.reader===JSON.parse(String(localStorage.getItem("user"))))
      this.hidden=false;
    else{
      this.hidden=true;
    }
  }

  // formatting XP so its legible
  formatNumberWithPeriods(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }


}
