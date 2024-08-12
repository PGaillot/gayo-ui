import { Injectable } from '@angular/core';

export type PerksType =
  | 'strength'
  | 'perception'
  | 'endurance'
  | 'charisma'
  | 'intelligence'
  | 'agility'
  | 'luck';

@Injectable({
  providedIn: 'root',
})

export class PerksService {}
