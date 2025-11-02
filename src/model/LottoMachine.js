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

  calculateYield(result) {
    const totalPrize = this.#calculateTotalPrize(result);
    const yieldRate = this.#calculateRawYield(totalPrize);
    return this.#formatYield(yieldRate);
  }

  #initResult() {
    return {
      FIRST: 0, 
      SECOND: 0, 
      THIRD: 0, 
      FOURTH: 0,
      FIFTH: 0,   
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
    if (matchCount === 6) result.FIRST += 1;
    else if (matchCount === 5 && hasBonus) result.SECOND += 1;
    else if (matchCount === 5) result.THIRD += 1;
    else if (matchCount === 4) result.FOURTH += 1;
    else if (matchCount === 3) result.FIFTH += 1;
  }

  #calculateTotalPrize(result) {
    return result.FIRST * 2000000000 +
           result.SECOND * 30000000 +
           result.THIRD * 1500000 +
           result.FOURTH * 50000 +
           result.FIFTH * 5000;
  }

  #calculateRawYield(totalPrize) {
    return (totalPrize / this.#purchaseAmount) * 100;
  }

  #formatYield(yieldRate) {
    return yieldRate.toFixed(1);
  }

  buildStatistics(result) {
    return [
      { match: 3, prize: 5000, count: result.FIFTH },
      { match: 4, prize: 50000, count: result.FOURTH },
      { match: 5, prize: 1500000, count: result.THIRD },
      { match: 5, prize: 30000000, count: result.SECOND, bonus: true },
      { match: 6, prize: 2000000000, count: result.FIRST },
    ];
  }
}

export default LottoMachine;