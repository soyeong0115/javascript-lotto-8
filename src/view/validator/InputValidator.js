import { ERROR_MESSAGE } from '../../constant/message.js';
import { validate } from '../../util/validate.js';

export const InputValidator = {
  validatePurchaseAmount(input) {
    if (validate.isEmpty(input)) {
      throw new Error(ERROR_MESSAGE.PURCHASE.EMPTY_INPUT);
    }    
    if (!validate.isNumber(input)) {
      throw new Error(ERROR_MESSAGE.PURCHASE.NOT_NUMBER);
    }
    if (!validate.isInteger(input)) {
      throw new Error(ERROR_MESSAGE.PURCHASE.NOT_INTEGER);
    }
    if (!validate.isPositiveNumber(input)) {
      throw new Error(ERROR_MESSAGE.PURCHASE.NOT_POSITIVE);
    }
    if (Number(input) % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.PURCHASE.NOT_MULTIPLE_UNIT);
    }

    return input;
  },

  validateWinningNumbers(numbers) {
     if (!validate.hasValidCount(numbers)) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.INVALID_COUNT);
    }
    if (!validate.areNumbersInRange(numbers)) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.OUT_OF_RANGE);
    }
    if (validate.hasDuplicate(numbers)) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS.DUPLICATE_NUMBER);
    }
   
    return numbers;
  },

  validateBonusNumber(input, winningNumbers) {
    if (validate.isEmpty(input)) {
      throw new Error(ERROR_MESSAGE.BONUS.EMPTY_INPUT);
    }   
    if (!validate.isNumber(input)) {
      throw new Error(ERROR_MESSAGE.BONUS.NOT_NUMBER);
    }
    if (!validate.isInteger(input)) {
      throw new Error(ERROR_MESSAGE.BONUS.NOT_INTEGER);
    }
    const number = Number(input);

    if (!validate.isInRange(number)) {
      throw new Error(ERROR_MESSAGE.BONUS.OUT_OF_RANGE);
    }
    if (winningNumbers.includes(number)) {
      throw new Error(ERROR_MESSAGE.BONUS.DUPLICATE_WITH_WINNING);
    }

    return number;
  }
};