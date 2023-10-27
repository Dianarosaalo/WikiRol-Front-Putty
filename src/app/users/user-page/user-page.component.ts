/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { User } from 'src/app/auth/interfaces/login';
import { UserService } from '../services/user.service';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { CharacterService } from 'src/app/characters/services/character.service';
import { Character } from 'src/app/characters/interfaces/character';
import { CharacterCardComponent } from 'src/app/characters/character-card/character-card.component';
import { CharactersResponse } from 'src/app/characters/interfaces/characterResponse';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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
  pageNumber = 1;       //
  pageSize = 18;        //
  buttonShow=false;     //
  id=""                 //
  currentUrl=""

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private location: Location,
    private readonly characterService: CharacterService,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //const id=(this.route.snapshot.paramMap.get('id'));
    //const currentUrl = this.location.path();
    this.id=(this.route.snapshot.paramMap.get('id'))!;
    this.currentUrl=this.location.path();

    /*this.characterService.getAll().subscribe(
      chars => {
        const myCharacters = chars.filter((c)=>c.creator===id) //reviews of the current user
        this.characters = myCharacters;
        if ((currentUrl=="/users/me"))
        this.characters=chars.filter((c)=>c.creator===this.userID) //this is in case we are accessing by /me instead of an ID
      });*/
      this.loadCharacters();

      if (this.currentUrl!=="/users/me"){
        this.userService.getUserId(String(this.id)).subscribe(
          u => {this.user = u;}
        );
        if((String(this.id))===this.userID) this.me=true; //just in case it's you but you didnt access by the button of /me
      }
      else{
        this.me=true
        this.userService.getUserId(this.userID).subscribe(
          u => this.user = u
      );
    }
  }

  loadCharacters(): void {

    let idWeUse="";
    idWeUse=this.id;
    if ((this.currentUrl=="/users/me"))
      idWeUse=this.userID;

    this.http.get<CharactersResponse>('personajes/scroll', {

      params: {
        pageNumber: this.pageNumber.toString(),
        pageSize: this.pageSize.toString(),
        creator: idWeUse
      }
    }).pipe(map((c) => c.personajes)).subscribe((characters: Character[]) => {
      console.log('Characters loaded:', characters);
      this.characters= characters;
      this.pageNumber++;
      this.buttonShow=true;
    });
  }

  onScroll(): void {

    let idWeUse="";
    idWeUse=this.id;
    if ((this.currentUrl=="/users/me"))
      idWeUse=this.userID;

    this.buttonShow=false;
    this.http.get<CharactersResponse>('personajes/scroll', {
      params: {
        pageNumber: this.pageNumber.toString(),
        pageSize: this.pageSize.toString(),
        creator: idWeUse
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
}
