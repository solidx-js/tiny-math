import { Vector3 } from '../src';

describe('Vector3', () => {
  it('Zero() returns a vector with x, y, and z set to 0', () => {
    const zero = Vector3.Zero();
    expect(zero.x).toBe(0);
    expect(zero.y).toBe(0);
    expect(zero.z).toBe(0);
  });

  it('One() returns a vector with x, y, and z set to 1', () => {
    const one = Vector3.One();
    expect(one.x).toBe(1);
    expect(one.y).toBe(1);
    expect(one.z).toBe(1);
  });

  it('FromArray() creates a vector from an array', () => {
    const array = [2, 3, 4];
    const vector = Vector3.FromArray(array);
    expect(vector.x).toBe(2);
    expect(vector.y).toBe(3);
    expect(vector.z).toBe(4);
  });

  it('Hermite() interpolates between two vectors', () => {
    const value1 = new Vector3(1, 2, 3);
    const tangent1 = new Vector3(4, 5, 6);
    const value2 = new Vector3(7, 8, 9);
    const tangent2 = new Vector3(10, 11, 12);
    const amount = 0.5;
    const result = Vector3.Hermite(value1, tangent1, value2, tangent2, amount);
    expect(result.x).toBe(3.25)
    expect(result.y).toBe(4.25);
    expect(result.z).toBe(5.25);
  });

  it('Lerp() interpolates between two vectors', () => {
    const start = new Vector3(1, 2, 3);
    const end = new Vector3(7, 8, 9);
    const amount = 0.5;
    const result = Vector3.Lerp(start, end, amount);
    expect;
    expect(result.x).toBe(4);
    expect(result.y).toBe(5);
    expect(result.z).toBe(6);
  });
});
