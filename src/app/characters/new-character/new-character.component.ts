import { Component,OnInit,ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, /*ActivatedRoute*/ } from '@angular/router';
import { Character,Trait,Class,Song } from '../interfaces/character';
import { CharacterService } from '../services/character.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'fs-new-character',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.css']
})
export class NewCharacterComponent implements OnInit {

  newCharacter!:Character
  @ViewChild('characterForm') characterForm!:NgForm

  saved = false;
  edit = false;

  imagenGaleria!:string
  currentRelic!:string
  singularidades!:string
  traitTitle!:string
  traitInfo!:string
  className!:string
  classLevel!:number
  songTitle!:string
  songTheme!:string

  songPrivacy=false
  traitPrivacy=false

  constructor(
    private readonly characterService:CharacterService,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.newCharacter = this.resetCharacter();

    const currentUrl = this.location.path(); // all of this means im editing
    currentUrl.split('/');
    const id = currentUrl.split('/')[2];
    if (currentUrl.split('/')[3]==="edit")
    {
      this.edit = true;
      console.log(id);
      this.characterService.getById(String(id)).subscribe(
        c => {
          this.newCharacter = c
        });
    }
  }

  canDeactivate() {
    return this.saved || this.characterForm.pristine || confirm("Do you really want to leave?. Changes will be lost");
  }

  resetCharacter():Character{
    return{
      nombre:'',
      titulo:'',
      descripcion:'',
      edad:0,
      clases:[],
      campanya:'',
      fotoPerfil:'',
      reliquia:[],
      intergalactico:false,
      singularidad:[],
      facciones:[],
      partidaAparicion:'',
      muerto:false,
      galeria:[],
      lore:'',
      rasgos:[],
      pv:0,
      ca:0,
      fue:0,
      des:0,
      con:0,
      int:0,
      sab:0,
      car:0,
      jugador:'',
      tipoJuego:'',
      creator:JSON.parse(String(localStorage.getItem("user")))!,
      movimiento:0,
      private:false,
      tier:'',
      canciones:[]
    }
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newCharacter.fotoPerfil = reader.result as string;
    });
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

  addImagenGaleria()
  {
    this.newCharacter.galeria.push(this.imagenGaleria);
    this.imagenGaleria="";
  }

  addReliquia()
  {
    this.newCharacter.reliquia.push(this.currentRelic);
    this.currentRelic="";
  }

  addSingularidad()
  {
    this.newCharacter.singularidad.push(this.singularidades);
    this.singularidades="";
  }

  addRasgo()
  {
    const trait:Trait = {"title":this.traitTitle,"info":this.traitInfo,"privacy":this.traitPrivacy}
    this.newCharacter.rasgos.push(trait);
    this.traitInfo="";
    this.traitTitle="";
    this.traitPrivacy=false;
  }

  addClases()
  {
    const myClass:Class = {"class":this.className,"level":this.classLevel}
    this.newCharacter.clases.push(myClass);
    this.className="";
    this.classLevel=0;
  }

  addCanciones()
  {
    const mySong:Song = {"title":this.songTitle,"link":this.songTheme,"privacy":this.songPrivacy}
    this.newCharacter.canciones.push(mySong);
    this.songTitle="";
    this.songTheme="";
    this.songPrivacy=false
  }

  addCharacter() {
    this.saved = true;

    if (!this.edit)
    {
      this.characterService.post(this.newCharacter).subscribe({
        next: () => {
          console.log("Correcto");
        }
      });
      this.router.navigate(['/campaigns','home']);
    }

    else{
      this.characterService.edit(this.newCharacter).subscribe({
        next: () => {console.log("correcto")},

        error: (error) => console.error(error),
      });
      //this.router.navigate(['/characters', this.newCharacter._id]);
      this.router.navigate(['/campaigns','home']);

    }

  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  campaigns=[
    {value:'Egathea',label:"Egathea"},
    {value:'Caminos de Sangre',label:"Caminos de Sangre"},
    {value:'Aryma',label:"Aryma"},
    {value:'Yggdrassil',label:"Yggdrassil"}];

  intergalactic=[
    {value:true,label:"Sí"},
    {value:false,label:"No"}];

  factions=[{value:"El Imperio de la Humanidad", label:"El Imperio de la Humanidad"}];

  dead=[
    {value:true,label:"Sí"},
    {value:false,label:"No"}];

  player=[{value:"Adriwebo",label:"Adriwebo"}]

  privacy=[{value:false,label:"Público"},
  {value:true,label:"Privado"}]

  tiers=[{value:"0.- Deus Ex Machina", label:"Deus Ex Machina"},
  {value:"0.5.- SSSSS", label:"SSSSS"},
  {value:"1.- SSSS", label:"SSSS"},
  {value:"2.- SSS", label:"SSS"},
  {value:"3.- SS", label:"SS"},
  {value:"4.- S", label:"S"},
  {value:"5.- A", label:"A"},
  {value:"6.- B", label:"B"},
  {value:"7.- C", label:"C"},
  {value:"8.- D", label:"D"},
  {value:"9.- E", label:"E"},
  {value:"9.5.- F", label:"F"},
  {value:"9.9.- Desconocido", label:"Desconocido"},
  ];

  typeOfGame=[{value:"DnD",label:"DnD"}];
}
