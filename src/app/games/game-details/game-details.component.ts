import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../interfaces/game';
import { RouterLink/*,Router*/,ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { UserService } from 'src/app/users/services/user.service';
import { User } from 'src/app/auth/interfaces/login';
import { Character } from 'src/app/characters/interfaces/character';
import { CharacterService } from 'src/app/characters/services/character.service';

@Component({
  selector: 'fs-game-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit{
  partida!: Game;
  dateOfTheGame!:string
  gameCreator!:User
  me=false;

  characters!:Character[]; // show chars of the current game

  constructor(
    private readonly characterService:CharacterService,
    private readonly route: ActivatedRoute,
    private readonly gameService:GameService,
    private readonly router:Router,
    private readonly userService:UserService
  ) {}

  ngOnInit(): void {
    const posibleId=(this.route.snapshot.paramMap.get('id')) ;
    this.gameService.getById(String(posibleId)).subscribe({
      next: (partida) => {
        this.partida=partida
        this.dateOfTheGame = this.transformDate(partida.fechaJugada);

        this.characterService.getAll().subscribe({
          next: (characters) => this.characters=characters, //characters.forEach((c)=>this.characters.push(c)),
          error: (error) => console.log("Ha habido un error" + error + this.characters),
          complete: () => this.characters=this.characters.filter((c)=>c.campanya===partida.campanya && Number(c.partidaAparicion)===partida.num)
        })

        this.userService.getUserId(String(this.partida.creator)).subscribe(
          u => this.gameCreator = u
        );
        if (this.partida.creator===JSON.parse(localStorage.getItem("user")!)) //to see if the user is yourself, so you can edit.
          this.me=true;
      }
    })
  }

  deleteGame(){
    this.gameService.delete(String(this.partida._id)).subscribe(p=>{console.log("Removed: "+p)});
    this.router.navigate(['/campaigns']);
  }

  transformDate(date:Date):string{
    const myDate=String(date);
    return myDate.substring(0,10);
  }

}
