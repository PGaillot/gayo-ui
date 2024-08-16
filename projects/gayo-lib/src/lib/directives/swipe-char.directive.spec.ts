import { SwipeCharDirective } from './swipe-char.directive';

describe('SwipeCharDirective', () => {
  // Mock d'un ElementRef pour les tests
  class MockElementRef {
    nativeElement: any;
  }

  let mockElementRef: MockElementRef;
  let directive: SwipeCharDirective;

  beforeEach(() => {
    mockElementRef = new MockElementRef();
    mockElementRef.nativeElement = {    
      innerText: null,
      classList: {
        add: jasmine.createSpy('add'),
        remove: jasmine.createSpy('remove'),
        contains: jasmine.createSpy('contains').and.returnValue(false),
      }
    };

    directive = new SwipeCharDirective(mockElementRef as any);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set originalChar on initialization and start animation', () => {
    directive.char = 5;
    spyOn(directive, 'startAnimation').and.callThrough();

    directive.ngOnInit();

    expect(directive.startAnimation).toHaveBeenCalled();
  });

});
