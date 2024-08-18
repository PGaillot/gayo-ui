import { GlitchDirective } from './glitch.directive';
import { ElementRef } from '@angular/core';

describe('GlitchDirective', () => {
  let mockElementRef: jasmine.SpyObj<ElementRef>;
  let directive: GlitchDirective;

  beforeEach(() => {
    mockElementRef = jasmine.createSpyObj('ElementRef', [], {
      nativeElement: {
        style: {
          setProperty: jasmine.createSpy('setProperty')
        },
        classList: {
          add: jasmine.createSpy('add'),
          remove: jasmine.createSpy('remove'),
          contains: jasmine.createSpy('contains')
        }
      }
    });
  });

  it('should create an instance', () => {
    directive = new GlitchDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });

  it('should throw error if ElementRef is not provided', () => {
    expect(() => new GlitchDirective(null as any)).toThrowError('Element not found');
  });

  it('should throw error if duration is less than 1.5', () => {
    directive = new GlitchDirective(mockElementRef);
    directive.duration = 1;
    expect(() => directive.ngOnInit()).toThrowError('Duration must be greater than 1.5');
  });

  it('should set animation duration style property', () => {
    directive = new GlitchDirective(mockElementRef);
    directive.duration = 5;
    directive.ngOnInit();
    expect(mockElementRef.nativeElement.style.setProperty).toHaveBeenCalledWith('--animation-duration', '5s');
  });

  it('should call glitch immediately if delay is null', () => {
    directive = new GlitchDirective(mockElementRef);
    spyOn(directive, 'glitch');
    directive.delay = null;
    directive.ngOnInit();
    expect(directive.glitch).toHaveBeenCalled();
  });

  it('should throw error if delay is less than 1000', () => {
    directive = new GlitchDirective(mockElementRef);
    directive.delay = 500;
    expect(() => directive.ngOnInit()).toThrowError('Delay must be greater than 1000');
  });

  it('should set interval if delay is provided', (done) => {
    directive = new GlitchDirective(mockElementRef);
    directive.delay = 1500;
    spyOn(directive, 'glitch');
    directive.ngOnInit();
    setTimeout(() => {
      expect(directive.glitch).toHaveBeenCalled();
      done();
    }, 1600);
  });

  it('should clear interval on ngOnDestroy', () => {
    directive = new GlitchDirective(mockElementRef);
    directive.delay = 1500;
    directive.ngOnInit();
    spyOn(window, 'clearInterval');
    directive.ngOnDestroy();
    expect(clearInterval).toHaveBeenCalled();
  });

  it('should add glitch class if not present', () => {
    directive = new GlitchDirective(mockElementRef);
    mockElementRef.nativeElement.classList.contains.and.returnValue(false);
    directive.glitch();
    expect(mockElementRef.nativeElement.classList.add).toHaveBeenCalledWith('glitch');
  });

  it('should remove glitch class if present', () => {
    directive = new GlitchDirective(mockElementRef);
    mockElementRef.nativeElement.classList.contains.and.returnValue(true);
    directive.glitch();
    expect(mockElementRef.nativeElement.classList.remove).toHaveBeenCalledWith('glitch');
  });

  // Test pour vérifier que l'intervalle n'est pas défini si le délai est null
  it('should not set interval if delay is null', () => {
    directive = new GlitchDirective(mockElementRef);
    directive.delay = null;
    spyOn(window, 'setInterval');
    directive.ngOnInit();
    expect(setInterval).not.toHaveBeenCalled();
  });

  // Test pour vérifier le comportement avec une durée valide mais proche de la limite
  it('should accept duration just above 1.5', () => {
    directive = new GlitchDirective(mockElementRef);
    directive.duration = 1.51;
    expect(() => directive.ngOnInit()).not.toThrow();
    expect(mockElementRef.nativeElement.style.setProperty).toHaveBeenCalledWith('--animation-duration', '1.51s');
  });

  // Test pour vérifier le comportement avec un délai valide mais proche de la limite
  it('should accept delay just above 1000', () => {
    directive = new GlitchDirective(mockElementRef);
    directive.delay = 1001;
    spyOn(window, 'setInterval');
    directive.ngOnInit();
    expect(setInterval).toHaveBeenCalled();
  });
});