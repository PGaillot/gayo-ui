import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[vtSymbolReveal]',
  standalone: true,
})
export class SymbolRevealDirective {
  symbols: string = '&#%$€@+:?µ£><=*~!¤';

  constructor(private elementRef: ElementRef) {}

  private replaceSymbols(
    element: HTMLElement,
    text: string,
    symbols: string,
    index: number,
  ): Promise<void> {
    return new Promise((resolve) => {
      if (index < text.length) {
        setTimeout(() => {
          const textPart: string = text.slice((text.length - 1 - index), text.length);
          const symbolPart: string = symbols.slice(0, (symbols.length - 1 - index));          
          element.innerHTML = symbolPart + textPart 
          this.replaceSymbols(element, text, symbols, index + 1)
          .then(resolve);
        }, 30);
      } else {
        resolve();
      }
    });
  }
  getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * this.symbols.length);
    return this.symbols[randomIndex];
  }
  
  ngOnInit(): void {
    const element: HTMLElement = this.elementRef.nativeElement;
    const text: string = this.elementRef.nativeElement.innerText;
    
    // 1 - Retourner une erreur si l'élément n'est pas trouvé
    if (!this.elementRef || !element) {
      throw new Error('Element not found');
    }
    
    // 2 - Retourner une erreur si le texte est vide
    if (!text || text === ' ') {
      console.log('element :', this.elementRef);
      console.log('text :', text);
      
      throw new Error('Text not found');
    }
    
    
    let fakeText: string = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      fakeText += this.getRandomSymbol();
    }

    this.elementRef.nativeElement.innerHTML = fakeText;

    this.replaceSymbols(element, text, fakeText, 0);
  }
}
