import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { Game } from '../interfaces/game';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'fs-new-game',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit{
  newGame!:Game
  @ViewChild('gameForm') gameForm!:NgForm

  saved = false;
  edit = false;

  constructor(
    private readonly gameService:GameService,
    private readonly router: Router,
    private readonly location: Location
  ){}

  ngOnInit(): void {
    this.newGame = this.resetGame();

    const currentUrl = this.location.path(); // all of this means im editing
    currentUrl.split('/');
    const id = currentUrl.split('/')[2];
    if (currentUrl.split('/')[3]==="edit")
    {
      this.edit = true;
      console.log(id);
      this.gameService.getById(String(id)).subscribe(
        g => {
          this.newGame = g
        });
    }
  }

  resetGame():Game{
    return{
      num:0,
      titulo:"",
      campanya:"",
      fechaJugada:new Date('19/06/2019'),
      resumen:"",
      creator:JSON.parse(localStorage.getItem("user")!)
      //personajesPresentes:[]
    }
  }

  canDeactivate() {
    return this.saved || this.gameForm.pristine || confirm("Do you really want to leave?. Changes will be lost");
  }

  campaigns=[
    {value:'Egathea',label:"Egathea"},
    {value:'Caminos de Sangre',label:"Caminos de Sangre"},
    {value:'Aryma',label:"Aryma"},
    {value:'Yggdrassil',label:"Yggdrassil"},

    {value:'Djuna',label:"(Aventura) Djuna & Co"},
    {value:'Mario',label:"(Aventura) Cruzados Mario"},
    {value:'Reinos Olvidados',label:"(Aventura) Reinos Olvidados"},
    {value:'Miscelanea',label:"(Conjunto de cosas Miscelaneas)"},
    {value:'Guerreros de la Luz',label:"(Aventura) Guerreros de la Luz"},
    {value:'Guardianes del Cosmos',label:"(Aventura) Guardianes del Cosmos"},
    {value:'Pruebas',label:"Pruebas DM"},
    {value: 'Historias Yggdrassil', label: 'Historias Yggdrassil'}
  ];

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  addGame() {
    this.saved = true;

    if (!this.edit)
    {
      this.gameService.post(this.newGame).subscribe({
        next: () => {
          console.log("Correcto");
        }
      });
      this.router.navigate(['/campaigns','home']);
    }
    else{
      this.gameService.edit(this.newGame).subscribe({
        next: () => {console.log("correcto")},

        error: (error) => console.error(error),
      });
      //this.router.navigate(['/characters', this.newCharacter._id]);
      this.router.navigate(['/campaigns','home']);
    }

  }
}
