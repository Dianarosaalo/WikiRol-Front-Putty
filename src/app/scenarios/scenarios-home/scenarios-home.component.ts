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
  scenarios!: Scenario[];
  search = "";
  currentColor = localStorage.getItem('color');
  me = JSON.parse(localStorage.getItem("user")!);

  imageIndexes: { [key: string]: number } = {};

  constructor(private readonly scenarioService: ScenarioService) {}

  ngOnInit(): void {
    this.scenarioService.getAll().subscribe({
      next: (escenarios) => {
        this.scenarios = escenarios;

        // Ensure each scenario has a starting index of 0
        this.scenarios.forEach(scenario => {
          if (scenario._id && scenario.galeria.length > 0) {
            this.imageIndexes[scenario._id as string] = 0; // ✅ Type assertion
          }
        });

        console.log("Loaded scenarios:", this.scenarios);
        console.log("Initialized image indexes:", this.imageIndexes);
      },
      error: (error) => console.log("Ha habido un error: " + error)
    });
  }

  nextImage(scenarioId: string | undefined, galleryLength: number) {
    if (!scenarioId || galleryLength === 0) return;
    this.imageIndexes[scenarioId as string] = (this.imageIndexes[scenarioId] + 1) % galleryLength; // ✅ Type assertion
  }

  prevImage(scenarioId: string | undefined, galleryLength: number) {
    if (!scenarioId || galleryLength === 0) return;
    this.imageIndexes[scenarioId as string] = (this.imageIndexes[scenarioId] - 1 + galleryLength) % galleryLength; // ✅ Type assertion
  }

  getImageSrc(scenario: Scenario): string {
    const index = this.imageIndexes[scenario._id!] ?? 0;
    return scenario.galeria[index];
  }

}


