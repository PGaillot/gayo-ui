import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
  standalone: true,
})
export class TimerPipe implements PipeTransform {
  transform(time: number, ...args: string[]): string {

    if (isNaN(time) || time === null || time === undefined) {
      throw new Error('Invalid time value');
    }

    if (time < 0) {
      return '00:00';
    }

    const h: string = (Math.floor(time / 1000 / 60 / 60) % 24)
      .toString()
      .padStart(2, '0');
    const m: string = (Math.floor(time / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0');
    const s: string = (Math.floor(time / 1000) % 60)
      .toString()
      .padStart(2, '0');

    if (args.includes('short')) {
      return `${m}:${s}`;
    } else if (args.includes('long')) {
      return `${h}:${m}:${s}`;
    }


    return `${Math.floor(time / 1000 / 60 / 60) % 24 > 0 ? h + ':' : ''}${m}:${s}`;
  }
}
