import { Vector2 } from '../src';

describe('Vector2', () => {
  it('Zero() returns a vector with x and y set to 0', () => {
    const zero = Vector2.Zero();
    expect(zero.x).toBe(0);
    expect(zero.y).toBe(0);
  });

  it('One() returns a vector with x and y set to 1', () => {
    const one = Vector2.One();
    expect(one.x).toBe(1);
    expect(one.y).toBe(1);
  });

  it('FromArray() creates a vector from an array', () => {
    const array = [2, 3];
    const vector = Vector2.FromArray(array);
    expect(vector.x).toBe(2);
    expect(vector.y).toBe(3);
  });

  it('FromArrayToRef() creates a vector from an array and stores it in another vector', () => {
    const array = [2, 3];
    const vector = new Vector2();
    Vector2.FromArrayToRef(array, 0, vector);
    expect(vector.x).toBe(2);
    expect(vector.y).toBe(3);
  });

  it('Hermite() interpolates between two vectors', () => {
    const value1 = new Vector2(1, 2);
    const tangent1 = new Vector2(3, 4);
    const value2 = new Vector2(5, 6);
    const tangent2 = new Vector2(7, 8);
    const amount = 0.5;
    const result = Vector2.Hermite(value1, tangent1, value2, tangent2, amount);
    expect(result.x).toBe(2.5);
    expect(result.y).toBe(3.5);
  });

  it('Lerp() interpolates between two vectors', () => {
    const start = new Vector2(1, 2);
    const end = new Vector2(5, 6);
    const amount = 0.5;
    const result = Vector2.Lerp(start, end, amount);
    expect(result.x).toBe(3);
    expect(result.y).toBe(4);
  });

  it('PointInTriangle() returns true if a point is inside a triangle', () => {
    const p = new Vector2(1, 1);
    const p0 = new Vector2(0, 0);
    const p1 = new Vector2(4, 0);
    const p2 = new Vector2(0, 4);
    const result = Vector2.PointInTriangle(p, p0, p1, p2);
    expect(result).toBe(true);
  });

  it('PointInTriangle() returns false if a point is outside a triangle', () => {
    const p = new Vector2(2, 2);
    const p0 = new Vector2(0, 0);
    const p1 = new Vector2(4, 0);
    const p2 = new Vector2(0, 1);
    const result = Vector2.PointInTriangle(p, p0, p1, p2);
    expect(result).toBe(false);
  });

  it('constructor() creates a vector with x and y set to 0', () => {
    const vector = new Vector2();
    expect(vector.x).toBe(0);
    expect(vector.y).toBe(0);
  });

  it('copyFrom() sets the vector from another vector', () => {
    const source = new Vector2(2, 3);
    const vector = new Vector2().copyFrom(source);
    expect(vector.x).toBe(2);
    expect(vector.y).toBe(3);
  });

  it('set() sets the vector from x and y', () => {
    const vector = new Vector2().set(2, 3);
    expect(vector.x).toBe(2);
    expect(vector.y).toBe(3);
  });

  it('add() adds two vectors', () => {
    const a = new Vector2(1, 2);
    const b = new Vector2(3, 4);
    const result = a.add(b);
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
  });
});
