import { parseLottoNumbers } from '../src/util/parser.js';

describe('parseLottoNumbers', () => {
  test('입력 문자열을 쉼표 기준으로 분리하여 숫자 배열로 변환하는지 확인한다.', () => {
    const input = '1, 2,3, 4,5,6';
    const expected = [1, 2, 3, 4, 5, 6];
    expect(parseLottoNumbers(input)).toEqual(expected);
  });
});