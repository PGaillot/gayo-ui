import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface UserData {
  username: string;
  email: string;
  id: number;
  avatar_url: string;
}

@Component({
  selector: 'lib-user-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() userData!: UserData;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get classes(): string[] {
    return [`user-card-${this.size}`];
  }
}
