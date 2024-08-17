import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[vtTypingEffet]',
  standalone: true,
})
export class TypingEffetDirective {

  constructor(private elementRef: ElementRef) {}

  private typeText(
    element: HTMLElement,
    text: string,
    index: number,
    baseDelay: number,
  ): Promise<void> {
    return new Promise((resolve) => {
      if (index < text.length) {
        // Définir un delta maximum pour la variabilité
        const maxDelta: number = 60;
        // S'assurer que le délai ne descend pas en dessous d'une valeur minimale
        const minDelay: number = 40;
        const randomDelta: number = Math.floor(Math.random() * maxDelta);
        const finalDelay: number =
          baseDelay + (Math.random() > 0.5 ? randomDelta : -randomDelta);
        const actualDelay: number = Math.max(minDelay, finalDelay);
        setTimeout(() => {
          element.innerHTML += text.charAt(index);
          this.typeText(element, text, index + 1, baseDelay).then(resolve);
        }, actualDelay);
      } else {
        resolve();
      }
    });
  }

  ngOnInit(): void {
    // Retourner une erreur si l'élément n'est pas trouvé
    if (!this.elementRef || !this.elementRef.nativeElement) {
      throw new Error('Element not found');
    }

    // Retourner une erreur si le texte est vide
    if (
      !this.elementRef.nativeElement.innerText ||
      this.elementRef.nativeElement.innerText.length === 0 ||
      this.elementRef.nativeElement.innerText === ' '
    ) {
      throw new Error('Text not found');
    }
    const element: HTMLElement = this.elementRef.nativeElement;
    const text: string = element.innerText;

    element.innerHTML = '';

    this.typeText(element, text, 0, 60).then(() => {
      setInterval(() => {
        if (element.innerText === text) {
          element.innerText = text + '_';
        } else {
          element.innerText = text;
        }
      }, 500);
    });
  }
}
