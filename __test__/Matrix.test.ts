import { Matrix } from '../src/Matrix';

describe('Matrix', () => {
  describe('Zero', () => {
    it('should return a matrix with all elements set to 0', () => {
      const zeroMatrix = Matrix.Zero();
      expect(zeroMatrix.asArray()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });

  describe('Identity', () => {
    it('should return the identity matrix', () => {
      const identityMatrix = Matrix.Identity();
      expect(identityMatrix.asArray()).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    });
  });

  describe('copyFrom', () => {
    it('should copy the elements from the source matrix', () => {
      const sourceMatrix = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
      const targetMatrix = new Matrix();
      targetMatrix.copyFrom(sourceMatrix);
      expect(targetMatrix.asArray()).toEqual(sourceMatrix.asArray());
    });
  });

  it('transpose', () => {
    const matrix = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const transpose = matrix.transpose();
    expect(transpose.asArray()).toEqual([1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16]);
  });
});
