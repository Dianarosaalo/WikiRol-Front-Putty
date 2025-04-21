import { Component, OnInit } from '@angular/core';
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
export class IniciativaTrackerComponent implements OnInit {
  characters: CharacterIni[] = [];

  newCharacter: CharacterIni = {
    name: '',
    hitPoints: 0,
    initiative: 0,
    notes: ''
  };

  editingIndex: number | null = null; // NEW

  localStorageKey = 'iniciativaCharacters';

  ngOnInit(): void {
    const saved = localStorage.getItem(this.localStorageKey);
    if (saved) {
      try {
        const parsed: CharacterIni[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(c => typeof c.initiative === 'number')) {
          this.characters = parsed.sort((a, b) => b.initiative - a.initiative);
        }
      } catch (e) {
        console.error('Error loading characters from localStorage:', e);
      }
    }
  }

  addCharacter() {
    if (this.newCharacter.name.trim()) {
      if (this.editingIndex !== null) {
        // ✏️ Editing an existing character
        this.characters[this.editingIndex] = { ...this.newCharacter };
        this.editingIndex = null;
      } else {
        // ➕ Adding new
        this.characters.push({ ...this.newCharacter });
      }

      this.characters.sort((a, b) => b.initiative - a.initiative);
      this.newCharacter = { name: '', initiative: 0, hitPoints: 0, notes: '' };
    }
  }

  editCharacter(index: number) {
    this.newCharacter = { ...this.characters[index] };
    this.editingIndex = index;
  }

  saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.characters));
  }

  clearLocalStorage() {
    localStorage.removeItem(this.localStorageKey);
    this.characters = [];
    this.editingIndex = null;
    this.newCharacter = { name: '', initiative: 0, hitPoints: 0, notes: '' };
  }
}
