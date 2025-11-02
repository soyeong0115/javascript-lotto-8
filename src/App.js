import { INPUT_MESSAGE } from "./constant/message.js";
import LottoMachine from "./model/LottoMachine.js";
import inputView from "./view/inputView.js";
import outputView from "./view/outputView.js";
import { InputValidator } from "./view/validator/InputValidator.js";
import { parseLottoNumbers } from "./util/parser.js";

class App {
  async run() {
    const purchaseAmount = await this.#inpuPurchaseAmount();
    InputValidator.validatePurchaseAmount(purchaseAmount);

    const lottoMachine = new LottoMachine(Number(purchaseAmount));
    this.#outputMessages(lottoMachine);

    const winningNumbers = await this.#inputWinningNumbers();
  }

  async #inpuPurchaseAmount() {
    const purchaseAmount = await inputView.readLineMessage(INPUT_MESSAGE.PURCHASE_AMOUNT);
    return purchaseAmount;
  }

  async #inputWinningNumbers() {
    const input = await inputView.readLineMessage(INPUT_MESSAGE.WINNING_NUMBERS);
    const winningNumbers = parseLottoNumbers(input);
    InputValidator.validateWinningNumbers(winningNumbers);
    return winningNumbers;
  }

  #outputMessages(lottoMachine) {
    const count = lottoMachine.getLottoCount();
    outputView.printLottoCount(count);
    outputView.printLottos(lottoMachine.getLottos());
  }
}

export default App;