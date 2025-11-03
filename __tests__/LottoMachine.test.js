import LottoMachine from '../src/model/LottoMachine.js';
import { LOTTO_CONFIG } from '../src/constant/lotto.js';
import Lotto from '../src/model/Lotto.js';

describe('LottoMachine 테스트', () => {
  test('구입금액에 따라 로또 수량이 올바르게 계산된다.', () => {
    const purchaseAmount = 8000;
    const lottoMachine = new LottoMachine(purchaseAmount);

    expect(lottoMachine.getLottoCount()).toBe(
      Math.floor(purchaseAmount / LOTTO_CONFIG.LOTTO_PRICE)
    );

    expect(lottoMachine.getLottos().length).toBe(lottoMachine.getLottoCount());
  });

  test('발행된 각 로또가 Lotto 인스턴스인지 확인한다.', () => {
    const purchaseAmount = 3000;
    const lottoMachine = new LottoMachine(purchaseAmount);
    const lottos = lottoMachine.getLottos();

    lottos.forEach((lotto) => {
      expect(lotto).toBeInstanceOf(Lotto);
      expect(lotto.getNumbers().length).toBe(LOTTO_CONFIG.RANDOM_COUNT);
    });
  });

  test('각 로또 번호와 당첨 번호 일치 개수를 정확히 계산한다.', () => {
    const lottoMachine = new LottoMachine(1000);
    lottoMachine.getLottos()[0] = new Lotto([1, 2, 3, 4, 5, 6]);

    const result = lottoMachine.calculateResult([1, 2, 3, 7, 8, 9], 10);
    expect(result.FIFTH).toBe(1);
  });

  test('5개 번호 일치 + 보너스 번호 포함 시 2등으로 계산된다.', () => {
    const lottoMachine = new LottoMachine(1000);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lottoMachine.getLottos()[0] = new Lotto([1, 2, 3, 4, 5, 7]);

    const result = lottoMachine.calculateResult(winningNumbers, bonusNumber);
    expect(result.SECOND).toBe(1);
  });

  test('일치 개수에 따라 통계 객체가 올바르게 갱신된다', () => {
    const lottoMachine = new LottoMachine(5000);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lottoMachine.getLottos()[0] = new Lotto([1, 2, 3, 4, 5, 6]); 
    lottoMachine.getLottos()[1] = new Lotto([1, 2, 3, 4, 5, 7]); 
    lottoMachine.getLottos()[2] = new Lotto([1, 2, 3, 4, 5, 8]); 
    lottoMachine.getLottos()[3] = new Lotto([1, 2, 3, 4, 9, 10]);
    lottoMachine.getLottos()[4] = new Lotto([1, 2, 3, 7, 8, 9]);

    const result = lottoMachine.calculateResult(winningNumbers, bonusNumber);
    expect(result.FIRST).toBe(1);
    expect(result.SECOND).toBe(1);
    expect(result.THIRD).toBe(1);
    expect(result.FOURTH).toBe(1);
    expect(result.FIFTH).toBe(1);
  });

  test('수익률 계산이 정확하게 이루어지는지 확인한다.', () => {
    const purchaseAmount = 1000;
    const lottoMachine = new LottoMachine(purchaseAmount);

    lottoMachine.getLottos()[0] = new Lotto([1, 2, 3, 7, 8, 9]);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 10;

    const result = lottoMachine.calculateResult(winningNumbers, bonusNumber);
    const yieldRate = lottoMachine.calculateYield(result);

    expect(yieldRate).toBe('500.0');
  });

  test('소수점 둘째 자리에서 반올림하여 첫째 자리까지 표시되는지 확인한다.', () => {
    const purchaseAmount = 2000;
    const lottoMachine = new LottoMachine(purchaseAmount);

    lottoMachine.getLottos()[0] = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const result = lottoMachine.calculateResult(winningNumbers, bonusNumber);
    const yieldRate = lottoMachine.calculateYield(result);

    expect(yieldRate).toBe('100000000.0');
  });

  test('소수점 둘째 자리에서 반올림하여 첫째 자리까지 표시되는지 확인한다.', () => {
    const purchaseAmount = 3000;
    const lottoMachine = new LottoMachine(purchaseAmount);

    lottoMachine.getLottos()[0] = new Lotto([1, 2, 3, 10, 11, 12]);
    lottoMachine.getLottos()[1] = new Lotto([1, 2, 3, 4, 13, 14]);  
    lottoMachine.getLottos()[2] = new Lotto([7, 8, 9, 10, 11, 12]); 

    const result = lottoMachine.calculateResult([1, 2, 3, 4, 5, 6], 7);
    const yieldRate = lottoMachine.calculateYield(result);

    expect(yieldRate).toBe('1833.3');
  });

  test('여러 당첨금 합산 시에도 소수점 반올림이 올바르게 처리되는지 확인한다.', () => {
    const purchaseAmount = 3000;
    const lottoMachine = new LottoMachine(purchaseAmount);

    lottoMachine.getLottos()[0] = new Lotto([1, 2, 3, 10, 11, 12]); 
    lottoMachine.getLottos()[1] = new Lotto([1, 2, 3, 4, 13, 14]);  
    lottoMachine.getLottos()[2] = new Lotto([1, 2, 3, 4, 5, 12]);  

    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const result = lottoMachine.calculateResult(winningNumbers, bonusNumber);
    const yieldRate = lottoMachine.calculateYield(result);

    expect(yieldRate).toBe('51833.3');
  });
});


