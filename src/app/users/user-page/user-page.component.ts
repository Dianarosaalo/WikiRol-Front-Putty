/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { User } from 'src/app/auth/interfaces/login';
import { UserService } from '../services/user.service';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { CharacterService } from 'src/app/characters/services/character.service';
import { Character } from 'src/app/characters/interfaces/character';
import { CharacterCardComponent } from 'src/app/characters/character-card/character-card.component';

@Component({
  selector: 'fs-user-page',
  standalone: true,
  imports: [CommonModule,RouterLink,CharacterCardComponent],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{

  user!: User;
  me=false;
  characters!:Character[];
  userID=JSON.parse(String(localStorage.getItem("user")!))

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private location: Location,
    private readonly characterService: CharacterService
  ) {}

  ngOnInit(): void {
    const id=(this.route.snapshot.paramMap.get('id'));
    const currentUrl = this.location.path();

    this.characterService.getAll().subscribe(
      chars => {
        const myCharacters = chars.filter((c)=>c.creator===id) //reviews of the current user
        this.characters = myCharacters;
        if ((currentUrl=="/users/me"))
        this.characters=chars.filter((c)=>c.creator===this.userID) //this is in case we are accessing by /me instead of an ID
      });

      if (currentUrl!=="/users/me"){
        this.userService.getUserId(String(id)).subscribe(
          u => {this.user = u;}
        );
        if((String(id))===this.userID) this.me=true; //just in case it's you but you didnt access by the button of /me
      }
      else{
        this.me=true
        this.userService.getUserId(this.userID).subscribe(
          u => this.user = u
      );
    }
  }
}
