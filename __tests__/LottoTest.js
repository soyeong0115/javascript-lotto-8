import Lotto from "../src/model/Lotto.js";
import { ERROR_MESSAGE } from '../src/constant/message.js';

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR_MESSAGE.INVALID_COUNT);
  });

  test("로또 번호의 개수가 6개보다 적으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5]);
    }).toThrow(ERROR_MESSAGE.INVALID_COUNT);
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR_MESSAGE.DUPLICATE_NUMBER);
  });

  test("로또 번호는 오름차순으로 정렬된다.", () => {
    const lotto = new Lotto([6, 1, 4, 3, 2, 5]);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("로또 번호가 1~45 범위를 벗어나면 예외가 발생한다.", () => {
    expect(() => new Lotto([0, 2, 3, 4, 5, 6])).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
    expect(() => new Lotto([1, 2, 3, 4, 5, 46])).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
    expect(() => new Lotto([-1, 2, 3, 4, 5, 46])).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
  });
});
