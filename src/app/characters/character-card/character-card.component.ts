import { Component,  Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Character } from '../interfaces/character';

@Component({
  selector: 'fs-character-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent {
  @Input() character!: Character;
}
