export class Vector2 {
  static Zero(): Vector2 {
    return new Vector2(0, 0);
  }

  static One(): Vector2 {
    return new Vector2(1, 1);
  }

  static FromArray(array: ArrayLike<number>, offset: number = 0): Vector2 {
    return new Vector2(array[offset], array[offset + 1]);
  }

  static FromArrayToRef(array: ArrayLike<number>, offset: number, ref: Vector2): Vector2 {
    ref.x = array[offset];
    ref.y = array[offset + 1];
    return ref;
  }

  static Hermite(value1: Vector2, tangent1: Vector2, value2: Vector2, tangent2: Vector2, amount: number): Vector2 {
    const squared = amount * amount;
    const cubed = amount * squared;
    const part1 = 2 * cubed - 3 * squared + 1;
    const part2 = -2 * cubed + 3 * squared;
    const part3 = cubed - 2 * squared + amount;
    const part4 = cubed - squared;

    const x = value1.x * part1 + value2.x * part2 + tangent1.x * part3 + tangent2.x * part4;
    const y = value1.y * part1 + value2.y * part2 + tangent1.y * part3 + tangent2.y * part4;

    return new (value1.constructor as any)(x, y);
  }

  static Lerp(start: Vector2, end: Vector2, amount: number): Vector2 {
    const x = start.x + (end.x - start.x) * amount;
    const y = start.y + (end.y - start.y) * amount;
    return new (start.constructor as any)(x, y);
  }

  static PointInTriangle(p: Vector2, p0: Vector2, p1: Vector2, p2: Vector2): boolean {
    const a = (1 / 2) * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
    const sign = a < 0 ? -1 : 1;
    const s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
    const t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;

    return s > 0 && t > 0 && s + t < 2 * a * sign;
  }

  constructor(
    public x: number = 0,
    public y: number = 0
  ) {}

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  multiply(other: Vector2): Vector2 {
    return new Vector2(this.x * other.x, this.y * other.y);
  }

  scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  equals(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toArray(): number[] {
    return [this.x, this.y];
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  copyFrom(other: Vector2): Vector2 {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2 {
    const len = this.length();
    if (len === 0 || len === 1) {
      return this.clone();
    }
    return this.scale(1 / len);
  }

  dot(other: Vector2): number {
    return this.x * other.x + this.y * other.y;
  }
}
