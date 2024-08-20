import { SymbolRevealDirective } from './symbol-reveal.directive';

describe('SymbolRevealDirective', () => {
  class MockElementRef {
    nativeElement: any;
  }

  let mockElementRef: MockElementRef;
  let directive: SymbolRevealDirective;

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

    directive = new SymbolRevealDirective(mockElementRef as any);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
