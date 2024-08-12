import { Component, Input } from '@angular/core';



export interface FooterElement {
  title:string, 
  pages: {title:string, url:string}[],
}

export interface ContactFooterElement {
  username: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  npmUrl?: string;
}


@Component({
  selector: 'vt-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})


export class FooterComponent {
  @Input() footerElements: FooterElement[] = [];
  @Input() contactFooterElement!: ContactFooterElement;



}
