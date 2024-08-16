import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFooterElement, FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const contactFooterElement: ContactFooterElement = {
    username: 'Pierre',
    email: 'pierre@pierre.fr',
    githubUrl: 'https://github.com/pierre',
    linkedinUrl: 'https://www.linkedin.com/in/pierre/',
    instagramUrl: 'https://www.instagram.com/pierre/',
    npmUrl: 'https://www.npmjs.com/~pierre',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    component.contactFooterElement = contactFooterElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
