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
            // filter: 'contrast(1000%) brightness(1500%) invert(100%) grayscale(100%)',
            background: `
                radial-gradient(circle at 50% 50%, rgba(0,0,0,1), rgba(0,0,0,0)),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
            `,
            position: 'relative',
            overflow: 'hidden',
            animation: 'burnEffect 2.5s ease-in forwards',
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
            filter: contrast(0%) brightness(500%) grayscale(100%);
        }
        100% {
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
        burnContainer.appendChild(burnNoise); // Ajoute le SVG au conteneur
    }
}