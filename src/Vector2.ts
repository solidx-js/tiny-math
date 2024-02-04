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

  fromArray(array: ArrayLike<number>, index: number = 0) {
    Vector2.FromArrayToRef(array, index, this);
    return this;
  }

  asArray(): number[] {
    return [this.x, this.y];
  }

  copyFrom(source: Vector2) {
    this.x = source.x;
    this.y = source.y;
    return this;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  add(b: Vector2) {
    return new (this.constructor as any)(this.x + b.x, this.y + b.y);
  }

  addToRef(b: Vector2, ref: Vector2): Vector2 {
    ref.x = this.x + b.x;
    ref.y = this.y + b.y;
    return ref;
  }

  addInPlace(b: Vector2) {
    this.x += b.x;
    this.y += b.y;
    return this;
  }

  subtract(b: Vector2) {
    return new (this.constructor as any)(this.x - b.x, this.y - b.y);
  }

  subtractToRef(b: Vector2, ref: Vector2): Vector2 {
    ref.x = this.x - b.x;
    ref.y = this.y - b.y;
    return ref;
  }

  subtractInPlace(b: Vector2) {
    this.x -= b.x;
    this.y -= b.y;
    return this;
  }

  multiplyInPlace(b: Vector2) {
    this.x *= b.x;
    this.y *= b.y;
    return this;
  }

  multiply(b: Vector2) {
    return new (this.constructor as any)(this.x * b.x, this.y * b.y);
  }

  multiplyToRef(b: Vector2, ref: Vector2): Vector2 {
    ref.x = this.x * b.x;
    ref.y = this.y * b.y;
    return ref;
  }

  divide(b: Vector2) {
    return new (this.constructor as any)(this.x / b.x, this.y / b.y);
  }

  divideToRef(b: Vector2, ref: Vector2): Vector2 {
    ref.x = this.x / b.x;
    ref.y = this.y / b.y;
    return ref;
  }

  divideInPlace(b: Vector2) {
    return this.divideToRef(b, this);
  }

  scaleInPlace(scale: number) {
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  scale(scale: number) {
    const result = new (this.constructor as any)(0, 0);
    this.scaleToRef(scale, result);
    return result;
  }

  scaleToRef(scale: number, result: Vector2): Vector2 {
    result.x = this.x * scale;
    result.y = this.y * scale;
    return result;
  }

  scaleAndAddToRef(scale: number, ref: Vector2): Vector2 {
    ref.x += this.x * scale;
    ref.y += this.y * scale;
    return ref;
  }

  equals(b: Vector2): boolean {
    return b && this.x === b.x && this.y === b.y;
  }

  floor() {
    return new (this.constructor as any)(Math.floor(this.x), Math.floor(this.y));
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  normalize() {
    const len = this.length();
    if (len === 0 || len === 1) {
      return this;
    }

    return this.scaleInPlace(1 / len);
  }

  normalizeToNew() {
    const normalized = new (this.constructor as any)(0, 0);
    this.normalizeToRef(normalized);
    return normalized;
  }

  normalizeToRef(ref: Vector2): Vector2 {
    const len = this.length();
    if (len === 0 || len === 1) {
      return ref.copyFrom(this);
    }

    return this.scaleToRef(1 / len, ref);
  }

  clone() {
    return new (this.constructor as any)(this.x, this.y);
  }

  dot(b: Vector2): number {
    return this.x * b.x + this.y * b.y;
  }
}
