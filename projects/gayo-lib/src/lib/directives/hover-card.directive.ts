import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[lsdHoverCard]',
    standalone: true,
})
export class HoverCardDirective {
    @Input() cardSelector: string = '[id$="-card"]'; // Par défaut, cible tout élément qui finit par "-card"

    xPerspective: number = 0;
    yPerspective: number = 0;
    scaleValue: number = 1;
    mouseX: number = 0;
    mouseY: number = 0;
    xPercent: number = 0;
    yPercent: number = 0;

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        if (!this.elementRef || !this.elementRef.nativeElement) {
            throw new Error('Element not found');
        }

        // Utilise le sélecteur fourni ou le sélecteur par défaut
        const cardElement: HTMLElement = this.elementRef.nativeElement.querySelector(this.cardSelector);

        if (!cardElement) {
            throw new Error(`Card element not found with selector: ${this.cardSelector}`);
        }

        const perspectiveContainer = document.createElement('div');
        Object.assign(perspectiveContainer.style, {
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            width: 'min-content',
            height: '100%',
            position: 'relative',
            cursor: 'pointer'
        });

        Object.assign(cardElement.style, {
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease',
            willChange: 'transform',
            transform: 'translateZ(-50px)',
            transformOrigin: 'center'
        });

        const noiseDiv: HTMLElement = cardElement.getElementsByClassName('card-noise-filter-element')[0] as HTMLElement;
        if (!noiseDiv) throw new Error('Noise element not found');


        const clonedNoiseDiv = noiseDiv.cloneNode(true) as HTMLElement;

        Object.assign(clonedNoiseDiv.style, {
            mixBlendMode: 'exclusion',
            opacity: '0',
            filter: 'saturate(2000%) invert(-100%)',
            background: 'radial-gradient(circle at 50% 50%, #FFC903,rgba(255, 200, 3, 0))',
            zIndex: '101',
        })


        cardElement.insertBefore(clonedNoiseDiv, cardElement.firstChild);

        const parent: HTMLElement | null = cardElement.parentNode as HTMLElement;
        if (!parent) throw new Error('Parent element not found');



        parent.insertBefore(perspectiveContainer, cardElement);
        perspectiveContainer.appendChild(cardElement);

        perspectiveContainer.addEventListener('mousemove', (event: MouseEvent) => {
            const rect: DOMRect = perspectiveContainer.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;

            this.xPercent = this.mouseX / rect.width;
            this.yPercent = this.mouseY / rect.height;

            const xRotation: number = (this.yPercent - 0.5) * 40;
            const yRotation: number = -(this.xPercent - 0.5) * 40;
            

            Object.assign(clonedNoiseDiv.style, {
                background: `radial-gradient(circle at ${this.xPercent * 100}% ${this.yPercent * 100}%, #FFC903,#ffc80300)`,
                opacity: '0.7'
            })

            cardElement.style.transform = `
                perspective(1500px)
                rotateX(${xRotation}deg) 
                rotateY(${yRotation}deg)
                translateZ(20px)
            `;
        });

        perspectiveContainer.addEventListener('mouseleave', () => {

            clonedNoiseDiv.style.background = `
            radial-gradient(circle at 50% 50%, #FFC903,#ffc80300)
        `;

            clonedNoiseDiv.style.opacity = `0`;

            cardElement.style.transform = `
                perspective(1500px)
                rotateX(0deg) 
                rotateY(0deg)
                translateZ(-50px)
                scale(1)
            `;
        });
    }
}