import { Directive, ElementRef, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[vtSwipeChar]',
  standalone: true,
})
export class SwipeCharDirective implements OnInit, OnDestroy, OnChanges {
  @Input() char: string | number| null = null;
  @Input() duration: number = 1500;
  @Input() interval: number = 75;

  private intervalId: any;
  private originalChar: string | number | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['char']) {
      this.originalChar = this.char;
      this.updateElementText();
    }
  }

  ngOnInit() {
    this.startAnimation();
      this.originalChar = this.char;
  }

  ngOnDestroy() {
    this.stopAnimation();
  }

  startAnimation() {
    this.stopAnimation(); 
    this.intervalId = setInterval(() => this.changeSymbol(), this.interval);
    this.elementRef.nativeElement.classList.add('no-event');
    setTimeout(() => this.stopAnimation(), Math.floor(Math.random() * ((this.duration + 500) - (this.duration - 200) + 1)) + (this.duration - 200))
  }

  stopAnimation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.updateElementText();
      if(this.elementRef.nativeElement.classList.contains('no-event')) {
        this.elementRef.nativeElement.classList.remove('no-event');
      }
    }
  }

  changeSymbol() {
    const symbols = '$%!@#&()_+|}{:?><-=*';
    const randomIndex = Math.floor(Math.random() * symbols.length);
    this.elementRef.nativeElement.innerText = symbols[randomIndex];
  }

  private updateElementText() {
    if (this.originalChar === null) {
      this.elementRef.nativeElement.innerText = '';
    } else {
      this.elementRef.nativeElement.innerText = this.originalChar.toString();
    }
  }
}