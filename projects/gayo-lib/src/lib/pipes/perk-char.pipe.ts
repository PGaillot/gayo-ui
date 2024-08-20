import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perkChar',
  standalone: true
})
export class PerkCharPipe implements PipeTransform {

  transform(perkName: string): string {
    return perkName.charAt(0).toUpperCase();
  }

}
