import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[lsdDeleteCard]',
    standalone: true,
})
export class DeleteCardDirective {
    @Input() cardSelector: string = '[id$="-card"]';

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        if (!this.elementRef?.nativeElement) {
            throw new Error('Element not found');
        }

        // Sélectionne l'élément de la carte
        const cardElement = this.elementRef.nativeElement.querySelector(this.cardSelector);

        if (!cardElement) {
            throw new Error(`Card element not found with selector: ${this.cardSelector}`);
        }

        // Conteneur pour l'effet
        const burnContainer = document.createElement('div');
        Object.assign(burnContainer.style, {
            width: 'min-content',
            height: '100%',

            position: 'relative',
            overflow: 'hidden',
            visibility: 'hidden',
            animation: 'burnEffect 2.5s 0.5s ease-out forwards',
        });

        // Création du SVG avec un effet de bruit
        const burnNoise: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        burnNoise.setAttribute('viewBox', '0 0 4 4');
        burnNoise.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        Object.assign(burnNoise.style, {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
        });

        const style = document.createElement('style');
        style.textContent = `
        @keyframes burnEffect {
        0% {
        visibility: visible;
        filter: contrast(100%) brightness(1500%) grayscale(100%) ;
        }
        100% {
            visibility: visible;
            filter: contrast(1000%) brightness(1500%) grayscale(100%);
        }
    }
        `;
        document.head.appendChild(style);

        // Filtre SVG
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'noiseFilter');

        const feTurbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
        feTurbulence.setAttribute('type', 'fractalNoise');
        feTurbulence.setAttribute('baseFrequency', '1');
        feTurbulence.setAttribute('numOctaves', '1');
        feTurbulence.setAttribute('stitchTiles', 'stitch');
        filter.appendChild(feTurbulence);

        burnNoise.appendChild(filter);

        // Rectangle avec le filtre appliqué
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('filter', 'url(#noiseFilter)');
        burnNoise.appendChild(rect);

        const parent = cardElement.parentNode;
        if (!parent) {
            throw new Error('Parent node not found');
        }

        parent.insertBefore(burnContainer, cardElement);
        burnContainer.appendChild(cardElement);
        burnContainer.appendChild(burnNoise);
    }
}