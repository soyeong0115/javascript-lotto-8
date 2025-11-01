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
};