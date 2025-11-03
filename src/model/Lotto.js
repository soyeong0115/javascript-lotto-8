import { validate } from "../util/validate.js";
import { ERROR_MESSAGE } from "../constant/message.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.slice().sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (!validate.hasValidCount(numbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_COUNT);
    }

    if (validate.hasDuplicate(numbers)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBER);
    }

    if (!validate.areNumbersInRange(numbers)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
