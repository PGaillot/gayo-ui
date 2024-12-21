import { NgStyle } from "@angular/common";
import { Component, ElementRef, viewChild, ViewChild } from "@angular/core";


@Component({
    standalone: true,
    selector: 'lsd-small-card',
    imports: [NgStyle],
    template: `
    <div id="container" #container >
        <div #reflect id="reflect"  [ngStyle]="{'background':' radial-gradient(at '+ xPercent * 100 +'% ' + yPercent  * 100+'%, rgba(255,201,3,0.9008620689655172) 0%, rgba(255,201,3,0.9181034482758621) 22%, rgba(255,201,3,0.75) 42%, rgba(255,201,3,0.7241379310344828) 57%, rgba(255,201,3,0) 100%)'}"></div>
        <ng-content [ngStyle]="{'transform': 'rotateX('+ this.xPerspective +'deg) rotateY('+ this.yPerspective +'deg) scale('+ this.scaleValue +')'}"></ng-content>
    </div>
    `,
    styleUrl: './small-card.component.scss'
})

export class SmallCardComponent {

    @ViewChild('container', { static: true }) containerRef!: ElementRef;
    @ViewChild('reflect', { static: true }) reflectRef!: ElementRef;
    xPerspective: number = 0;
    yPerspective: number = 0;
    scaleValue: number = 0.8;
    mouseX: number = 0;
    mouseY: number = 0;
     xPercent: number = 0;
     yPercent: number = 0;



    constructor() { }

    ngOnInit(): void {
        const container: HTMLDivElement = this.containerRef.nativeElement;

        container.addEventListener('mousemove', (event: MouseEvent) => {
            const rect: DOMRect = container.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;

             this.xPercent = this.mouseX / rect.width;
             this.yPercent = this.mouseY / rect.height;

            const xRotation: number = (this.xPercent - 0.5) * 20;
            const yRotation: number = (this.yPercent - 0.5) * 20;
            this.scaleValue = 0.9;

            this.xPerspective = yRotation;
            this.yPerspective = xRotation;

        });

        container.addEventListener('mouseleave', () => {
            this.xPerspective = 0;
            this.yPerspective = 0;
            this.scaleValue = 0.8;
        })
    }
}