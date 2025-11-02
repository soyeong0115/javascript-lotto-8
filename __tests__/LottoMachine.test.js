import LottoMachine from '../src/model/LottoMachine.js';
import { LOTTO_CONFIG } from '../src/constant/lotto.js';
import Lotto from '../src/model/Lotto.js';

describe('LottoMachine - 로또 수량 및 발행 테스트', () => {
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
});