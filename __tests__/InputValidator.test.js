import { InputValidator } from '../src/view/validator/InputValidator.js';
import { ERROR_MESSAGE } from '../src/constant/message.js';
import { parseLottoNumbers } from '../src/util/parser.js';

describe('구입금액 검증 테스트', () => {
  test('입력값이 1,000원 단위일 때 올바르게 저장되는가?', () => {
    const input = '5000';
    expect(InputValidator.validatePurchaseAmount(input)).toBe(input);
  });

  test('구입금액이 1,000원 단위가 아닐 때 예외가 발생한다.', () => {
    const input = '5500';
    expect(() => {
      InputValidator.validatePurchaseAmount(input);
    }).toThrow(ERROR_MESSAGE.NOT_MULTIPLE_UNIT);
  });

  test('입력값이 없을 시 예외가 발생한다.', () => {
    const input = '';
    expect(() => {
      InputValidator.validatePurchaseAmount(input);
    }).toThrow(ERROR_MESSAGE.EMPTY_INPUT);
  });

  test('숫자가 아닌 입력(문자, 기호) 시 예외가 발생한다.', () => {
    const inputs = ['abc', '!', '1a'];
    inputs.forEach((input) => {
      expect(() => {
        InputValidator.validatePurchaseAmount(input);
      }).toThrow(ERROR_MESSAGE.NOT_NUMBER);
    });
  });

  test('소수 입력 시 예외가 발생한다.', () => {
    const input = '1000.5';
    expect(() => {
      InputValidator.validatePurchaseAmount(input);
    }).toThrow(ERROR_MESSAGE.NOT_INTEGER);
  });

  test('음수 또는 0 입력 시 예외가 발생한다.', () => {
    const inputs = ['0', '-1000', '-5000'];
    inputs.forEach((input) => {
      expect(() => {
        InputValidator.validatePurchaseAmount(input);
      }).toThrow(ERROR_MESSAGE.NOT_POSITIVE);
    });
  });

  test('공백 입력 시 예외가 발생한다.', () => {
    const input = '   ';
    expect(() => {
      InputValidator.validatePurchaseAmount(input);
    }).toThrow(ERROR_MESSAGE.EMPTY_INPUT);
  });
});


describe('당첨 번호 검증 테스트', () => {
  test('입력값이 없으면 예외가 발생한다.', () => {
    const input = '';
    const numbers = parseLottoNumbers(input);
    expect(() => {
      InputValidator.validateWinningNumbers(numbers);
    }).toThrow(ERROR_MESSAGE.INVALID_COUNT);
  });

  test('6개가 아닌 번호 입력 시 예외가 발생한다.', () => {
    const input = '1,2,3';
    const numbers = parseLottoNumbers(input);
    expect(() => {
      InputValidator.validateWinningNumbers(numbers);
    }).toThrow(ERROR_MESSAGE.INVALID_COUNT);
  });

  test('1~45 범위를 벗어난 숫자 입력 시 예외가 발생한다.', () => {
    const input = '0,2,3,4,5,46';
    const numbers = parseLottoNumbers(input);
    expect(() => {
      InputValidator.validateWinningNumbers(numbers);
    }).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
  });

  test('중복된 숫자 입력 시 예외가 발생한다.', () => {
    const input = '1,2,2,4,5,6';
    const numbers = parseLottoNumbers(input);
    expect(() => {
      InputValidator.validateWinningNumbers(numbers);
    }).toThrow(ERROR_MESSAGE.DUPLICATE_NUMBER);
  });

  test('문자, 기호, 소수, 음수 입력 시 예외가 발생한다.', () => {
    const inputs = ['1,2,3,4,5,a', '1,2,3,4,5,!', '1,2,3,4,5,1.5', '1,2,3,4,5,-6'];
    inputs.forEach((input) => {
      const numbers = parseLottoNumbers(input);
      expect(() => {
        InputValidator.validateWinningNumbers(numbers);
      }).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
    });
  });

  test('공백 입력 시 예외가 발생한다.', () => {
    const input = '   ';
    const numbers = parseLottoNumbers(input);
    expect(() => {
      InputValidator.validateWinningNumbers(numbers);
    }).toThrow(ERROR_MESSAGE.INVALID_COUNT);
  });
});
