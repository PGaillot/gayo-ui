import { TypingEffetDirective } from './typing-effet.directive';

describe('TypingEffetDirective', () => {
  class MockElementRef {
    nativeElement: any;
  }

  let mockElementRef: MockElementRef;
  let directive: TypingEffetDirective;

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
    directive = new TypingEffetDirective(mockElementRef as any);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
