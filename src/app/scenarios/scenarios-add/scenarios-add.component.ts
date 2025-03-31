import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { Scenario } from '../interfaces/scenario';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ScenarioService } from '../services/scenario.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'fs-scenarios-add',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './scenarios-add.component.html',
  styleUrls: ['./scenarios-add.component.css']
})
export class ScenariosAddComponent implements OnInit{
  newScenario!:Scenario
  @ViewChild('scenarioForm') scenarioForm!:NgForm

  saved = false;
  edit = false;
  imagenGaleria!:string

  currentColor = localStorage.getItem('color') || 'light'

  constructor(
    private readonly scenarioService:ScenarioService,
    private readonly router: Router,
    private readonly location: Location
  ){}

  ngOnInit(): void {
      this.newScenario = this.resetScenario();

      const currentUrl = this.location.path(); // all of this means im editing
      currentUrl.split('/');
      const id = currentUrl.split('/')[2];
      if (currentUrl.split('/')[3]==="edit")
      {
        this.edit = true;
        console.log(id);
        this.scenarioService.getById(String(id)).subscribe(
          s => {
            this.newScenario = s
          });
      }
    }

    resetScenario():Scenario{
      return{
        nombre:'',
        descripcion:"",
        galeria:[],
        creator:JSON.parse(localStorage.getItem("user")!)
      }
    }

    canDeactivate() {
      return this.saved || this.scenarioForm.pristine || confirm("Do you really want to leave?. Changes will be lost");
    }

    validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
      return {
        [validClass]: ngModel.touched && ngModel.valid,
        [errorClass]: ngModel.touched && ngModel.invalid,
      };
    }

    addImage(fileInput2: HTMLInputElement) {
      if (!fileInput2.files || fileInput2.files.length === 0) {
        return;
      }
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(fileInput2.files[0]);
      reader.addEventListener('loadend', () => {
        this.imagenGaleria=(reader.result as string);
      });
    }

    showNewImage = false;

    showNewImageForm() {
    this.showNewImage = true;
    }

    addImagenGaleria()
  {
    this.newScenario.galeria.push(this.imagenGaleria);
    this.imagenGaleria="";
  }

  deleteImagen(imagen: any) {
    const index = this.newScenario.galeria.indexOf(imagen);
    if (index !== -1) {
      this.newScenario.galeria.splice(index, 1);
    }
  }

    addScenario() {
      this.saved = true;

      if (!this.edit)
      {
        this.scenarioService.post(this.newScenario).subscribe({
          next: () => {
            console.log("Correcto");
          }
        });
        this.router.navigate(['/campaigns','home']);
      }
      else{
        this.scenarioService.edit(this.newScenario).subscribe({
          next: () => {console.log("correcto")},

          error: (error) => console.error(error),
        });
        //this.router.navigate(['/characters', this.newCharacter._id]);
        this.router.navigate(['/campaigns','home']);
      }

    }

}
