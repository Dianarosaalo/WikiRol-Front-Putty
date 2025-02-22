import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioService } from '../services/scenario.service';
import { Scenario } from '../interfaces/scenario';
import { FormsModule } from '@angular/forms';
import { ScenarioFilterPipe } from 'src/app/campanyas/pipes/scenario.filter.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fs-scenarios-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ScenarioFilterPipe,RouterLink],
  templateUrl: './scenarios-home.component.html',
  styleUrls: ['./scenarios-home.component.css']
})
export class ScenariosHomeComponent implements OnInit {

  scenarios!:Scenario[]
  search="";
  currentColor=localStorage.getItem('color');
  currentImageIndex = 0;
  me=JSON.parse(localStorage.getItem("user")!);
  imageIndexes: { [key: string]: number } = {}; // Track current image per scenario;

  constructor(
  private readonly scenarioService:ScenarioService,
  ){}

  ngOnInit(): void {
    this.scenarioService.getAll().subscribe({
      next: (escenarios) => this.scenarios=escenarios,
      error: (error) => console.log("Ha habido un error" + error + this.scenarios)
    })
  }

  nextImage(scenarioId: string, galleryLength: number) {
    this.imageIndexes[scenarioId] = (this.imageIndexes[scenarioId] + 1) % galleryLength;
  }

  prevImage(scenarioId: string, galleryLength: number) {
    this.imageIndexes[scenarioId] = (this.imageIndexes[scenarioId] - 1 + galleryLength) % galleryLength;
  }

}
