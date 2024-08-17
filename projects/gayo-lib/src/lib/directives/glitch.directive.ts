import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[vtGlitch]',
  standalone: true,
})
export class GlitchDirective {
  @Input() duration: number = 8;
  @Input() delay: number | null = null;

  interval: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (!this.elementRef || !this.elementRef.nativeElement) {
      throw new Error('Element not found');
    }
    if (this.duration < 1.5) {
      throw new Error('Duration must be greater than 1.5');
    } else {
      this.elementRef.nativeElement.style.setProperty(
        '--animation-duration',
        `${this.duration}s`,
      );
    }

    if (this.delay === null) {
      this.glitch();
      return;
    } else if (this.delay < 1000) {
      throw new Error('Delay must be greater than 1000');
    } else {
      this.interval = setInterval(() => this.glitch(), this.delay);
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  glitch() {
    if (this.elementRef.nativeElement.classList.contains('glitch')) {
      this.elementRef.nativeElement.classList.remove('glitch');
    } else {
      this.elementRef.nativeElement.classList.add('glitch');
    }
  }
}
