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

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        if (!this.elementRef || !this.elementRef.nativeElement) {
            throw new Error('Element not found');
        }

        // Utilise le sélecteur fourni ou le sélecteur par défaut
        const cardElement = this.elementRef.nativeElement.querySelector(this.cardSelector);
        
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

        const parent = cardElement.parentNode;
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
            
            cardElement.style.transform = `
                perspective(1500px)
                rotateX(${xRotation}deg) 
                rotateY(${yRotation}deg)
                translateZ(0px)
                scale(1.05)
            `;
        });

        perspectiveContainer.addEventListener('mouseleave', () => {
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