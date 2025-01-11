import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idPipe',
  standalone: true,
})
export class IdPipe implements PipeTransform {
  transform(id: number): string {
    let idString:string = id.toString();
    if(idString.length >= 3) return idString

    for (let index = 0; index <= 3 - idString.length; index++) {
        idString = '0' + idString;
    }
    return idString;
  }
}
