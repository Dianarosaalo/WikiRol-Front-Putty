import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character, Song, Trait } from '../interfaces/character';
import { RouterLink,Router,/*NavigationEnd,*/ ActivatedRoute } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { User } from 'src/app/auth/interfaces/login';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'fs-character-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly characterService:CharacterService,
    private router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    const posibleId=(this.route.snapshot.paramMap.get('id')) ;
    //this.id="641d7104bade5c8508ec077b" //optimizable
    this.characterService.getById(String(posibleId)).subscribe({
      next: (character) => {
        this.character=character
        document.title="WR | "+this.character.nombre;
        if ((character.reader===JSON.parse(String(localStorage.getItem("user")))))
          this.reader=true;
        console.log(this.reader);
        this.userService.getUserId(String(this.character.creator)).subscribe(
          u => this.charCreator = u
        );
        if (this.character.creator===JSON.parse(localStorage.getItem("user")!)) //to see if the user is yourself, so you can edit.
          this.me=true;
        if (this.me || !this.character.privateStats===true)
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
    console.log(stat, saving);
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

}
