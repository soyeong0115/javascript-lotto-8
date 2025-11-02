// 번호를 검증하고, 그 번호에 대해 조회할 수 있는 기능
// 로또 한 장만 담당
import { validate } from "../util/validate.js";
import { ERROR_MESSAGE } from "../constant/message.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.slice().sort((a, b) => a - b);
  }

  #validate(numbers) {
    // 개수 검증
    if (!validate.hasValidCount(numbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_COUNT);
    }

    // 중복 검증
    if (validate.hasDuplicate(numbers)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBER);
    }

    // 범위 검증
    if (!validate.areNumbersInRange(numbers)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  // TODO: 추가 기능 구현
}

export default Lotto;
