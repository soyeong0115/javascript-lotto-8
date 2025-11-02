import Lotto from './Lotto.js';
import { getRandomLottoNumbers } from '../util/random.js';
import { LOTTO_CONFIG } from '../constant/lotto.js';

class LottoMachine {
  #lottos = [];
  #purchaseAmount;
  #lottoCount;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
    this.#lottoCount = Math.floor(purchaseAmount / LOTTO_CONFIG.LOTTO_PRICE);
    this.#generateLottos();
  }

  #generateLottos() {
    for (let i = 0; i < this.#lottoCount; i += 1) {
      const numbers = getRandomLottoNumbers();
      this.#lottos.push(new Lotto(numbers));
    }
  }

  getLottoCount() {
    return this.#lottoCount;
  }

  getLottos() {
    return this.#lottos;
  }

  calculateResult(winningNumbers, bonusNumber) {
    const result = this.#initResult();
    this.#lottos.forEach(lotto => {
      const matchCount = this.#countMatches(lotto, winningNumbers);
      const hasBonus = this.#hasBonus(lotto, bonusNumber);
      this.#updateResult(result, matchCount, hasBonus);
    });
    return result;
  }

  #initResult() {
    return {
      FIRST: 0,   // 6개 일치
      SECOND: 0,  // 5개 + 보너스 일치
      THIRD: 0,   // 5개 일치
      FOURTH: 0,  // 4개 일치
      FIFTH: 0,   // 3개 일치
    };
  }

  #countMatches(lotto, winningNumbers) {
    const numbers = lotto.getNumbers();
    const matchedNumbers = numbers.filter(num => winningNumbers.includes(num));
    return matchedNumbers.length;
  }

  #hasBonus(lotto, bonusNumber) {
    return lotto.getNumbers().includes(bonusNumber);
  }

  #updateResult(result, matchCount, hasBonus) {
    if (matchCount === 6) {
      result.FIRST += 1;
    } else if (matchCount === 5 && hasBonus) {
      result.SECOND += 1;
    } else if (matchCount === 5) {
      result.THIRD += 1;
    } else if (matchCount === 4) {
      result.FOURTH += 1;
    } else if (matchCount === 3) {
      result.FIFTH += 1;
    }
  }
}

export default LottoMachine;