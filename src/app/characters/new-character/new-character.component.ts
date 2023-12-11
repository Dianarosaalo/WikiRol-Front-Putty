import { Component,OnInit,ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, /*ActivatedRoute*/ } from '@angular/router';
import { Character,Trait,Class,Song } from '../interfaces/character';
import { CharacterService } from '../services/character.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/auth/interfaces/login';
import { UserService } from 'src/app/users/services/user.service';
import { FactionsResponse } from 'src/app/factions/interfaces/factionResponse';
import { Faction } from 'src/app/factions/interfaces/faction';
import { map } from 'rxjs';

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
  campanyaExtra!:string;
  currentFaction!:string;

  users!:User[];

  factions=[
    {value:"", label:"Todos"}];

  constructor(
    private readonly characterService:CharacterService,
    private readonly router: Router,
    private readonly location: Location,
    private readonly userService:UserService,
    private readonly http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.newCharacter = this.resetCharacter();

    this.loadFactions();

    this.userService.getAllUsers().subscribe({
      next: (users) => this.users=users,
      error: (error) => console.log("Ha habido un error" + error + this.users)
    });

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
      canciones:[],
      reader:JSON.parse(String(localStorage.getItem("user")))!,
      campanyasSecundarias:[]
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

  addCampanya()
  {
    this.newCharacter.campanyasSecundarias?.push(this.campanyaExtra);
    this.campanyaExtra="";
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
    {value:'Yggdrassil',label:"Yggdrassil"},

    {value:'Djuna',label:"(Aventura) Djuna & Co"},
    {value:'Mario',label:"(Aventura) Cruzados Mario"},
    {value:'Reinos Olvidados',label:"(Aventura) Reinos Olvidados"},
    {value:'Miscelanea',label:"(Conjunto de cosas Miscelaneas)"}
    ];

  intergalactic=[
    {value:true,label:"Sí"},
    {value:false,label:"No"}];

  dead=[
    {value:true,label:"Sí"},
    {value:false,label:"No"}];

  player=[{value:"Adriwebo",label:"Adriwebo"}]

  privacy=[{value:false,label:"Público"},
  {value:true,label:"Privado"}]

  tiers=[{value:"0.- Deus Ex Machina", label:"Deus Ex Machina"},
  {value:"0.25.- Supremo", label:"Supremo"},
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
  {value:"9.99.- No Existe Aún", label: "No Existe"}
  ];

  typeOfGame=[{value:"DnD",label:"DnD"}];

  transformString(description:string):string{
    const myDate=String(description);
    return myDate.substring(0,20);
  }

  // Trait manager

  showNewTrait = false;

  newTrait = {
    title: '',
    text: '',
    isPrivate: false,
  };

  showNewTraitForm() {
    this.showNewTrait = true;
  }

  addTrait() {
    if (this.newTrait.title && this.newTrait.text) {
      const trait:Trait = {"title":this.newTrait.title,"info":this.newTrait.text,"privacy":this.newTrait.isPrivate}
      this.newCharacter.rasgos.push({ ...trait });
      this.newTrait = { title: '', text: '', isPrivate: false };
      this.showNewTrait = false;
      console.log(this.newCharacter.rasgos)

    }
  }

  editTrait(trait: any) {
    console.log('Received trait:', trait);
    this.newTrait.title = trait.title;
    this.newTrait.text = trait.info;
    this.newTrait.isPrivate = trait.privacy;
    console.log('Updated newTrait:', this.newTrait);
    this.showNewTrait = true;
  }

  deleteTrait(trait: any) {
    const index = this.newCharacter.rasgos.indexOf(trait);
    if (index !== -1) {
      this.newCharacter.rasgos.splice(index, 1);
    }
  }

  // Class manager

  showNewClass = false;

  newClass = {
    class: '',
    level: 0,
  };

  showNewClassForm() {
    this.showNewClass = true;
  }

  addClass() {
    if (this.newClass.class && this.newClass.level) {
      const clase:Class = {"class":this.newClass.class,"level":this.newClass.level}
      this.newCharacter.clases.push({ ...clase });
      this.newClass = { class: '', level: 0};
      this.showNewClass = false;

    }
  }

  editClass(clase: any) {
    this.newClass = { ...clase };
    this.showNewClass = true;
  }

  deleteClass(clase: any) {
    const index = this.newCharacter.clases.indexOf(clase);
    if (index !== -1) {
      this.newCharacter.clases.splice(index, 1);
    }
  }

  // Song manager

  showNewSong = false;

  newSong = {
    title: '',
    link: '',
    isPrivate: false,
  };

  showNewSongForm() {
    this.showNewSong = true;
  }

  addSong() {
    if (this.newSong.title && this.newSong.link) {
      const song:Song = {"title":this.newSong.title,"link":this.newSong.link,"privacy":this.newSong.isPrivate}
      this.newCharacter.canciones.push({ ...song });
      this.newSong = { title: '', link: '', isPrivate: false };
      this.showNewSong = false;
    }
  }

  editSong(song: any) {
    this.newSong = { ...song };
    this.newSong.isPrivate = song.privacy
    this.showNewSong = true;
  }

  deleteSong(song: any) {
    const index = this.newCharacter.canciones.indexOf(song);
    if (index !== -1) {
      this.newCharacter.canciones.splice(index, 1);
    }
  }

  // factions
  showNewFaction = false;

  showNewFactionForm() {
    this.showNewFaction = true;
  }

  addFaction() {
    if (this.currentFaction) {
      this.newCharacter.facciones.push(this.currentFaction);
      this.currentFaction="";
      this.showNewClass = false;
    }
  }

  deleteFaction(faccion: any) {
    const index = this.newCharacter.facciones.indexOf(faccion);
    if (index !== -1) {
      this.newCharacter.facciones.splice(index, 1);
    }
  }

  loadFactions(): void {
    this.http.get<FactionsResponse>('http://vps-5eb41e5a.vps.ovh.net:8080/facciones/').pipe(
      map((f) => f.facciones.map((faction: Faction) => ({ value: faction.titulo, label: faction.titulo })))
    ).subscribe((factions: { value: string; label: string }[]) => {
      this.factions = [...this.factions, ...factions];
    });
  }
}

