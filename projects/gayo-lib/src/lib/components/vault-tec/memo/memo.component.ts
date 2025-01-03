import { Component, Input } from '@angular/core';


export type DifficultyType = 'easy' | 'medium' | 'hard';
enum DifficultyRatioEnum {
  'easy' = 6,
  'medium' = 10,
  'hard' = 16
}

@Component({
  selector: 'vt-memo',
  standalone: true,
  imports: [],
  templateUrl: './memo.component.html',
  styleUrl: './memo.component.scss'
})
export class MemoComponent {
  @Input() difficulty: DifficultyType = 'easy'
  difficultyRatio: DifficultyRatioEnum = DifficultyRatioEnum[this.difficulty];
  cards: string[] = [
    'strength',
    'perception',
    'endurance',
    'charisma',
    'intelligence',
    'agility',
    'luck',
    'intelligence2',
    'agility2',
    'luck2',
    'intelligence23',
    'agility23',
    'luck23',
    'intelligence2546',
    'agility4562',
    'l45645uck2',
    'intel6456ligence23',
    'agil45645ity23',
    'luc45645646k23',
  ]

  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Index aléatoire entre 0 et i
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Échange les éléments
    }
    return shuffled;
  }

  constructor() { }

  ngOnInit(): void {
    this.cards = this.shuffleArray(this.cards).slice(0, this.difficultyRatio);
    this.cards.forEach((card:string) => {
      this.cards = [ ...this.cards, card]
    });
    this.cards = this.shuffleArray(this.cards)
    console.log(this.cards);
    console.log( this.difficultyRatio % 3);

    


  }
}
