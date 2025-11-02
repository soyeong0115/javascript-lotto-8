import { ERROR_MESSAGE } from '../../constant/message.js';
import { validate } from '../../util/validate.js';

export const InputValidator = {
  validatePurchaseAmount(input) {
    if (validate.isEmpty(input)) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
    }    
    if (!validate.isNumber(input)) {
      throw new Error(ERROR_MESSAGE.NOT_NUMBER);
    }
    if (!validate.isInteger(input)) {
      throw new Error(ERROR_MESSAGE.NOT_INTEGER);
    }
    if (!validate.isPositiveNumber(input)) {
      throw new Error(ERROR_MESSAGE.NOT_POSITIVE);
    }
    if (Number(input) % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_MULTIPLE_UNIT);
    }

    return input;
  },

  validateWinningNumbers(numbers) {
     if (!validate.hasValidCount(numbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_COUNT);
    }
    if (!validate.areNumbersInRange(numbers)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }
    if (validate.hasDuplicate(numbers)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBER);
    }
   
    return numbers;
  },

  validateBonusNumber(input) {
    if (validate.isEmpty(input)) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
    }   
    if (!validate.isNumber(input)) {
      throw new Error(ERROR_MESSAGE.NOT_NUMBER);
    }
    if (!validate.isInteger(input)) {
      throw new Error(ERROR_MESSAGE.NOT_INTEGER);
    }
    const number = Number(input);

    if (!validate.isInRange(number)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }

    return number;
  }
};