import { InputValidator } from '../src/view/validator/InputValidator.js';
import { ERROR_MESSAGE } from '../src/constant/message.js';

describe('InputValidator - 구입금액 검증 테스트', () => {
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
