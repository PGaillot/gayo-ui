import { TimerPipe } from './timer.pipe';

describe('TimerPipe', () => {
  
  let pipe: TimerPipe;

  beforeEach(() => {
    pipe = new TimerPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms 0 to 00:00', () => {
    expect(pipe.transform(0)).toEqual('00:00');
  });

  it('transforms 0 to 00:00:00', () => {
    expect(pipe.transform(0, 'long')).toEqual('00:00:00');
  });

  it('transforms 1000 to 00:00:01', () => {
    expect(pipe.transform(1000)).toEqual('00:01');
  });

  it('transforms 3661000 to 01:01:01', () => {
    expect(pipe.transform(3661000)).toEqual('01:01:01');
  });

  it('should not transform 3600000 to 02:00:00', () => {
    expect(pipe.transform(3600000)).not.toEqual('02:00:00');
  });

  it('should not transform 86399999 to 24:00:00', () => {
    expect(pipe.transform(86399999)).not.toEqual('24:00:00');
  });

  it('should not transform 123456789 ms to 10:17:00', () => {
    expect(pipe.transform(123456789)).not.toEqual('10:17:00');
  });

  it('should throw an error for non-numeric input', () => {
    expect(() => pipe.transform(NaN)).toThrowError('Invalid time value');
    expect(() => pipe.transform(undefined as any)).toThrowError('Invalid time value');
    expect(() => pipe.transform(null as any)).toThrowError('Invalid time value');
  });

  it('should handle negative values by returning 00:00', () => {
    expect(pipe.transform(-5000)).toEqual('00:00');
  });

  it('should handle excessively large values and correctly wrap time', () => {
    const largeValue = 90061000; // 25 hours, 1 minute, and 1 second
    expect(pipe.transform(largeValue)).toEqual('01:01:01'); // wraps around after 24 hours
  });

  it('should correctly transform just below one hour (3599999 ms) to 59:59', () => {
    expect(pipe.transform(3599999)).toEqual('59:59');
  });

  it('should correctly transform 86400000 ms (exactly 24 hours) to 00:00', () => {
    expect(pipe.transform(86400000)).toEqual('00:00');
  });

  it('should not transform 5400000 ms to 02:00:00', () => {
    expect(pipe.transform(5400000)).not.toEqual('02:00:00');
  });

  it('should correctly format edge cases like one second before midnight (86399999 ms)', () => {
    expect(pipe.transform(86399999)).toEqual('23:59:59');
  });

  it('should handle the smallest possible positive value (1 ms) and return 00:00', () => {
    expect(pipe.transform(1)).toEqual('00:00');
  });

  it('should not return a negative formatted time for negative input', () => {
    expect(pipe.transform(-3600000)).toEqual('00:00');
  });

  it('should not transform 1000 ms to 01:00', () => {
    expect(pipe.transform(1000, 'short')).not.toEqual('01:00');
  });
});
