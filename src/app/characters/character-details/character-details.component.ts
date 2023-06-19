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
        this.userService.getUserId(String(this.character.creator)).subscribe(
          u => this.charCreator = u
        );
        if (this.character.creator===JSON.parse(localStorage.getItem("user")!)) //to see if the user is yourself, so you can edit.
          this.me=true;
      }
    })
  }

  deleteCharacter(){
    this.characterService.delete(String(this.character._id)).subscribe(r=>{console.log("Removed: "+r)});
    this.router.navigate(['/campaigns']);
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

}
