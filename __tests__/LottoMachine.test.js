import LottoMachine from '../src/model/LottoMachine.js';
import { LOTTO_CONFIG } from '../src/constant/lotto.js';
import Lotto from '../src/model/Lotto.js';

describe('LottoMachine 테스트', () => {
  test('구입금액에 따라 로또 수량이 올바르게 계산된다.', () => {
    const purchaseAmount = 8000;
    const lottoMachine = new LottoMachine(purchaseAmount);

    // 계산된 수량이 올바른지
    expect(lottoMachine.getLottoCount()).toBe(
      Math.floor(purchaseAmount / LOTTO_CONFIG.LOTTO_PRICE)
    );

    // 실제 발행된 로또 배열 길이가 수량과 같은지
    expect(lottoMachine.getLottos().length).toBe(lottoMachine.getLottoCount());
  });

  test('발행된 각 로또는 Lotto 인스턴스인지 확인한다.', () => {
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
    expect(result.FIFTH).toBe(1); // 3개 일치
  });

  test('5개 번호 일치 + 보너스 번호 포함 시 2등으로 계산된다.', () => {
    const lottoMachine = new LottoMachine(1000);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // 5개 번호 일치 + 보너스 번호 포함
    lottoMachine.getLottos()[0] = new Lotto([1, 2, 3, 4, 5, 7]);

    const result = lottoMachine.calculateResult(winningNumbers, bonusNumber);
    expect(result.SECOND).toBe(1);
  });

  test('일치 개수에 따라 통계 객체가 올바르게 갱신된다', () => {
    const lottoMachine = new LottoMachine(5000);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lottoMachine.getLottos()[0] = new Lotto([1, 2, 3, 4, 5, 6]); // 1등
    lottoMachine.getLottos()[1] = new Lotto([1, 2, 3, 4, 5, 7]); // 2등
    lottoMachine.getLottos()[2] = new Lotto([1, 2, 3, 4, 5, 8]); // 3등
    lottoMachine.getLottos()[3] = new Lotto([1, 2, 3, 4, 9, 10]); // 4등
    lottoMachine.getLottos()[4] = new Lotto([1, 2, 3, 7, 8, 9]); // 5등

    const result = lottoMachine.calculateResult(winningNumbers, bonusNumber);
    expect(result.FIRST).toBe(1);
    expect(result.SECOND).toBe(1);
    expect(result.THIRD).toBe(1);
    expect(result.FOURTH).toBe(1);
    expect(result.FIFTH).toBe(1);
  });
});