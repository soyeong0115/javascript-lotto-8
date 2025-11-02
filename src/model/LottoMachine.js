import Lotto from './Lotto.js';
import { getRandomLottoNumbers } from '../util/random.js';
import { LOTTO_CONFIG } from '../constant/lotto.js';

class LottoMachine {
    #lottos = [];
    #purchaseAmount;
    #lottoCount;

    constructor(purchaseAmount) {
        this.purchaseAmount = purchaseAmount;
        this.#lottoCount = Math.floor(
            purchaseAmount / LOTTO_CONFIG.LOTTO_PRICE
        );
        this.#generateLottos();
    }

    #generateLottos() {
        for (let i = 0; i < this.#lottoCount; i++) {
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
}

export default LottoMachine;