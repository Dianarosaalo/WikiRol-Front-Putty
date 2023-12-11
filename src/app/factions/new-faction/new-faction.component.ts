import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { Faction } from '../interfaces/faction';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { FactionService } from '../../factions/services/faction.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'fs-new-faction',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './new-faction.component.html',
  styleUrls: ['./new-faction.component.css']
})
export class NewFactionComponent {
  newFaction!:Faction
  @ViewChild('factionForm') factionForm!:NgForm

  saved = false;
  edit = false;

  constructor(
    private readonly factionService:FactionService,
    private readonly router: Router,
    private readonly location: Location
  ){}

  ngOnInit(): void {
    this.newFaction = this.resetFaction();

    const currentUrl = this.location.path(); // all of this means im editing
    currentUrl.split('/');
    const id = currentUrl.split('/')[2];
    if (currentUrl.split('/')[3]==="edit")
    {
      this.edit = true;
      console.log(id);
      this.factionService.getById(String(id)).subscribe(
        f => {
          this.newFaction = f
        });
    }
  }

  resetFaction():Faction{
    return{
      titulo:"",
      campanya:"",
      creator:JSON.parse(localStorage.getItem("user")!)
      //personajesPresentes:[]
    }
  }

  canDeactivate() {
    return this.saved || this.factionForm.pristine || confirm("Do you really want to leave?. Changes will be lost");
  }

  campaigns=[
    {value:'t',label:"Cualquier Campaña"},

    {value:'Egathea',label:"Egathea"},
    {value:'Caminos de Sangre',label:"Caminos de Sangre"},
    {value:'Aryma',label:"Aryma"},
    {value:'Yggdrassil',label:"Yggdrassil"},

    {value:'Djuna',label:"(Aventura) Djuna & Co"},
    {value:'Mario',label:"(Aventura) Cruzados Mario"},
    {value:'Reinos Olvidados',label:"(Aventura) Reinos Olvidados"},
    {value:'Miscelanea',label:"(Conjunto de cosas Miscelaneas)"}
  ];

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  addFaction() {
    this.saved = true;

    if (!this.edit)
    {
      this.factionService.post(this.newFaction).subscribe({
        next: () => {
          console.log("Correcto");
        }
      });
      this.router.navigate(['/campaigns','home']);
    }
    else{
      this.factionService.edit(this.newFaction).subscribe({
        next: () => {console.log("correcto")},

        error: (error) => console.error(error),
      });
      //this.router.navigate(['/characters', this.newCharacter._id]);
      this.router.navigate(['/campaigns','home']);
    }

  }
}
