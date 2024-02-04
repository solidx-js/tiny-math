export class Matrix {
  static Zero(): Matrix {
    return new Matrix();
  }

  static Identity(): Matrix {
    return new Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  private _m: Float32Array;

  constructor(data: ArrayLike<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    this._m = new Float32Array(data);
  }

  get isIdentity(): boolean {
    return (
      this._m[0] === 1 &&
      this._m[1] === 0 &&
      this._m[2] === 0 &&
      this._m[3] === 0 &&
      this._m[4] === 0 &&
      this._m[5] === 1 &&
      this._m[6] === 0 &&
      this._m[7] === 0 &&
      this._m[8] === 0 &&
      this._m[9] === 0 &&
      this._m[10] === 1 &&
      this._m[11] === 0 &&
      this._m[12] === 0 &&
      this._m[13] === 0 &&
      this._m[14] === 0 &&
      this._m[15] === 1
    );
  }

  asArray(): number[] {
    return Array.from(this._m);
  }

  copyFrom(source: Matrix) {
    this._m.set(source._m);
    return this;
  }

  set(data: Float32Array) {
    this._m.set(data);
    return this;
  }

  multiply(b: Matrix) {
    const a = this._m;
    const c = new Float32Array(16);

    c[0] = a[0] * b._m[0] + a[1] * b._m[4] + a[2] * b._m[8] + a[3] * b._m[12];
    c[1] = a[0] * b._m[1] + a[1] * b._m[5] + a[2] * b._m[9] + a[3] * b._m[13];
    c[2] = a[0] * b._m[2] + a[1] * b._m[6] + a[2] * b._m[10] + a[3] * b._m[14];
    c[3] = a[0] * b._m[3] + a[1] * b._m[7] + a[2] * b._m[11] + a[3] * b._m[15];

    c[4] = a[4] * b._m[0] + a[5] * b._m[4] + a[6] * b._m[8] + a[7] * b._m[12];
    c[5] = a[4] * b._m[1] + a[5] * b._m[5] + a[6] * b._m[9] + a[7] * b._m[13];
    c[6] = a[4] * b._m[2] + a[5] * b._m[6] + a[6] * b._m[10] + a[7] * b._m[14];
    c[7] = a[4] * b._m[3] + a[5] * b._m[7] + a[6] * b._m[11] + a[7] * b._m[15];

    c[8] = a[8] * b._m[0] + a[9] * b._m[4] + a[10] * b._m[8] + a[11] * b._m[12];
    c[9] = a[8] * b._m[1] + a[9] * b._m[5] + a[10] * b._m[9] + a[11] * b._m[13];
    c[10] = a[8] * b._m[2] + a[9] * b._m[6] + a[10] * b._m[10] + a[11] * b._m[14];
    c[11] = a[8] * b._m[3] + a[9] * b._m[7] + a[10] * b._m[11] + a[11] * b._m[15];

    c[12] = a[12] * b._m[0] + a[13] * b._m[4] + a[14] * b._m[8] + a[15] * b._m[12];
    c[13] = a[12] * b._m[1] + a[13] * b._m[5] + a[14] * b._m[9] + a[15] * b._m[13];
    c[14] = a[12] * b._m[2] + a[13] * b._m[6] + a[14] * b._m[10] + a[15] * b._m[14];
    c[15] = a[12] * b._m[3] + a[13] * b._m[7] + a[14] * b._m[11] + a[15] * b._m[15];

    return new Matrix(c);
  }

  invert() {
    if (this.isIdentity) {
      return this.clone();
    }

    // the inverse of a Matrix is the transpose of cofactor matrix divided by the determinant
    const m = this._m;

    const m00 = m[0],
      m01 = m[1],
      m02 = m[2],
      m03 = m[3];
    const m10 = m[4],
      m11 = m[5],
      m12 = m[6],
      m13 = m[7];
    const m20 = m[8],
      m21 = m[9],
      m22 = m[10],
      m23 = m[11];
    const m30 = m[12],
      m31 = m[13],
      m32 = m[14],
      m33 = m[15];

    const det_22_33 = m22 * m33 - m32 * m23;
    const det_21_33 = m21 * m33 - m31 * m23;
    const det_21_32 = m21 * m32 - m31 * m22;
    const det_20_33 = m20 * m33 - m30 * m23;
    const det_20_32 = m20 * m32 - m22 * m30;
    const det_20_31 = m20 * m31 - m30 * m21;

    const cofact_00 = +(m11 * det_22_33 - m12 * det_21_33 + m13 * det_21_32);
    const cofact_01 = -(m10 * det_22_33 - m12 * det_20_33 + m13 * det_20_32);
    const cofact_02 = +(m10 * det_21_33 - m11 * det_20_33 + m13 * det_20_31);
    const cofact_03 = -(m10 * det_21_32 - m11 * det_20_32 + m12 * det_20_31);

    const det = m00 * cofact_00 + m01 * cofact_01 + m02 * cofact_02 + m03 * cofact_03;

    if (det === 0) {
      // 矩阵秩不满，无法求逆
      throw new Error('Matrix is singular and cannot be inverted');
    }

    const detInv = 1 / det;
    const det_12_33 = m12 * m33 - m32 * m13;
    const det_11_33 = m11 * m33 - m31 * m13;
    const det_11_32 = m11 * m32 - m31 * m12;
    const det_10_33 = m10 * m33 - m30 * m13;
    const det_10_32 = m10 * m32 - m30 * m12;
    const det_10_31 = m10 * m31 - m30 * m11;
    const det_12_23 = m12 * m23 - m22 * m13;
    const det_11_23 = m11 * m23 - m21 * m13;
    const det_11_22 = m11 * m22 - m21 * m12;
    const det_10_23 = m10 * m23 - m20 * m13;
    const det_10_22 = m10 * m22 - m20 * m12;
    const det_10_21 = m10 * m21 - m20 * m11;

    const cofact_10 = -(m01 * det_22_33 - m02 * det_21_33 + m03 * det_21_32);
    const cofact_11 = +(m00 * det_22_33 - m02 * det_20_33 + m03 * det_20_32);
    const cofact_12 = -(m00 * det_21_33 - m01 * det_20_33 + m03 * det_20_31);
    const cofact_13 = +(m00 * det_21_32 - m01 * det_20_32 + m02 * det_20_31);

    const cofact_20 = +(m01 * det_12_33 - m02 * det_11_33 + m03 * det_11_32);
    const cofact_21 = -(m00 * det_12_33 - m02 * det_10_33 + m03 * det_10_32);
    const cofact_22 = +(m00 * det_11_33 - m01 * det_10_33 + m03 * det_10_31);
    const cofact_23 = -(m00 * det_11_32 - m01 * det_10_32 + m02 * det_10_31);

    const cofact_30 = -(m01 * det_12_23 - m02 * det_11_23 + m03 * det_11_22);
    const cofact_31 = +(m00 * det_12_23 - m02 * det_10_23 + m03 * det_10_22);
    const cofact_32 = -(m00 * det_11_23 - m01 * det_10_23 + m03 * det_10_21);
    const cofact_33 = +(m00 * det_11_22 - m01 * det_10_22 + m02 * det_10_21);

    return new Matrix([
      cofact_00 * detInv,
      cofact_01 * detInv,
      cofact_02 * detInv,
      cofact_03 * detInv,
      cofact_10 * detInv,
      cofact_11 * detInv,
      cofact_12 * detInv,
      cofact_13 * detInv,
      cofact_20 * detInv,
      cofact_21 * detInv,
      cofact_22 * detInv,
      cofact_23 * detInv,
      cofact_30 * detInv,
      cofact_31 * detInv,
      cofact_32 * detInv,
      cofact_33 * detInv,
    ]);
  }

  transpose() {
    const m = this._m;
    return new Matrix([m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]]);
  }

  determinant() {
    const m = this._m;
    const m00 = m[0],
      m01 = m[1],
      m02 = m[2],
      m03 = m[3];
    const m10 = m[4],
      m11 = m[5],
      m12 = m[6],
      m13 = m[7];
    const m20 = m[8],
      m21 = m[9],
      m22 = m[10],
      m23 = m[11];
    const m30 = m[12],
      m31 = m[13],
      m32 = m[14],
      m33 = m[15];

    const det_22_33 = m22 * m33 - m32 * m23;
    const det_21_33 = m21 * m33 - m31 * m23;
    const det_21_32 = m21 * m32 - m31 * m22;
    const det_20_33 = m20 * m33 - m30 * m23;
    const det_20_32 = m20 * m32 - m22 * m30;
    const det_20_31 = m20 * m31 - m30 * m21;

    const cofact_00 = +(m11 * det_22_33 - m12 * det_21_33 + m13 * det_21_32);
    const cofact_01 = -(m10 * det_22_33 - m12 * det_20_33 + m13 * det_20_32);
    const cofact_02 = +(m10 * det_21_33 - m11 * det_20_33 + m13 * det_20_31);
    const cofact_03 = -(m10 * det_21_32 - m11 * det_20_32 + m12 * det_20_31);

    return m00 * cofact_00 + m01 * cofact_01 + m02 * cofact_02 + m03 * cofact_03;
  }

  equals(other: Matrix) {
    return this._m.every((v, i) => v === other._m[i]);
  }

  clone() {
    return new Matrix(this._m);
  }
}
