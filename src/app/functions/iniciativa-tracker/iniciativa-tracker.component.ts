import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterIni } from 'src/app/characters/interfaces/characterIni';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fs-iniciativa-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciativa-tracker.component.html',
  styleUrls: ['./iniciativa-tracker.component.css']
})

export class IniciativaTrackerComponent {

  characters: CharacterIni[] = [];

  newCharacter: CharacterIni = {
    name: '',
    initiative: 0,
    notes: ''
  };

  addCharacter() {
    if (this.newCharacter.name.trim()) {
      // Clone and push
      this.characters.push({ ...this.newCharacter });

      // Sort descending by initiative
      this.characters.sort((a, b) => b.initiative - a.initiative);

      // Reset the form
      this.newCharacter = { name: '', initiative: 0, notes: '' };
    }
  }

}
