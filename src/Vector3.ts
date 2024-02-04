export class Vector3 {
  static FromArray(array: ArrayLike<number>, offset: number = 0): Vector3 {
    return new Vector3(array[offset], array[offset + 1], array[offset + 2]);
  }

  static Zero(): Vector3 {
    return new Vector3(0.0, 0.0, 0.0);
  }

  static One(): Vector3 {
    return new Vector3(1.0, 1.0, 1.0);
  }

  static CatmullRom(v1: Vector3, v2: Vector3, v3: Vector3, v4: Vector3, amount: number): Vector3 {
    const squared = amount * amount;
    const cubed = amount * squared;

    const x =
      0.5 *
      (2.0 * v2.x +
        (-v1.x + v3.x) * amount +
        (2.0 * v1.x - 5.0 * v2.x + 4.0 * v3.x - v4.x) * squared +
        (-v1.x + 3.0 * v2.x - 3.0 * v3.x + v4.x) * cubed);

    const y =
      0.5 *
      (2.0 * v2.y +
        (-v1.y + v3.y) * amount +
        (2.0 * v1.y - 5.0 * v2.y + 4.0 * v3.y - v4.y) * squared +
        (-v1.y + 3.0 * v2.y - 3.0 * v3.y + v4.y) * cubed);

    const z =
      0.5 *
      (2.0 * v2.z +
        (-v1.z + v3.z) * amount +
        (2.0 * v1.z - 5.0 * v2.z + 4.0 * v3.z - v4.z) * squared +
        (-v1.z + 3.0 * v2.z - 3.0 * v3.z + v4.z) * cubed);

    return new Vector3(x, y, z);
  }

  static Hermite(value1: Vector3, tangent1: Vector3, value2: Vector3, tangent2: Vector3, amount: number): Vector3 {
    const squared = amount * amount;
    const cubed = amount * squared;
    const part1 = 2.0 * cubed - 3.0 * squared + 1.0;
    const part2 = -2.0 * cubed + 3.0 * squared;
    const part3 = cubed - 2.0 * squared + amount;
    const part4 = cubed - squared;

    const x = value1.x * part1 + value2.x * part2 + tangent1.x * part3 + tangent2.x * part4;
    const y = value1.y * part1 + value2.y * part2 + tangent1.y * part3 + tangent2.y * part4;
    const z = value1.z * part1 + value2.z * part2 + tangent1.z * part3 + tangent2.z * part4;
    return new Vector3(x, y, z);
  }

  static Lerp(start: Vector3, end: Vector3, amount: number): Vector3 {
    const ref = new Vector3(0, 0, 0);
    Vector3.LerpToRef(start, end, amount, ref);
    return ref;
  }

  static LerpToRef(start: Vector3, end: Vector3, amount: number, ref: Vector3): Vector3 {
    ref.x = start.x + (end.x - start.x) * amount;
    ref.y = start.y + (end.y - start.y) * amount;
    ref.z = start.z + (end.z - start.z) * amount;
    return ref;
  }

  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {}

  add(b: Vector3): Vector3 {
    return new Vector3(this.x + b.x, this.y + b.y, this.z + b.z);
  }

  subtract(b: Vector3): Vector3 {
    return new Vector3(this.x - b.x, this.y - b.y, this.z - b.z);
  }

  multiply(b: Vector3): Vector3 {
    return new Vector3(this.x * b.x, this.y * b.y, this.z * b.z);
  }

  scale(s: number): Vector3 {
    return new Vector3(this.x * s, this.y * s, this.z * s);
  }

  equals(b: Vector3): boolean {
    return this.x === b.x && this.y === b.y && this.z === b.z;
  }

  toArray(): number[] {
    return [this.x, this.y, this.z];
  }

  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  set(x: number, y: number, z: number): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  copyFrom(source: Vector3): Vector3 {
    this.x = source.x;
    this.y = source.y;
    this.z = source.z;
    return this;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize(): Vector3 {
    const len = this.length();
    if (len === 0 || len === 1) {
      return this.clone();
    }

    return this.scale(1 / len);
  }

  dot(b: Vector3): number {
    return this.x * b.x + this.y * b.y + this.z * b.z;
  }

  cross(b: Vector3): Vector3 {
    const x = this.y * b.z - this.z * b.y;
    const y = this.z * b.x - this.x * b.z;
    const z = this.x * b.y - this.y * b.x;
    return new Vector3(x, y, z);
  }
}
