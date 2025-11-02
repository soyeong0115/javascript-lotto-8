import { INPUT_MESSAGE } from "./constant/message.js";
import LottoMachine from "./model/LottoMachine.js";
import inputView from "./view/inputView.js";
import outputView from "./view/outputView.js";
import { InputValidator } from "./view/validator/InputValidator.js";
import { parseLottoNumbers } from "./util/parser.js";

class App {
  async run() {
    const purchaseAmount = await this.#inputPurchaseAmount();
    const lottoMachine = new LottoMachine(Number(purchaseAmount));
    this.#outputMessages(lottoMachine);

    const winningNumbers = await this.#inputWinningNumbers();

    const bonusNumber = await this.#inputBonusNumber();

    const result = lottoMachine.calculateResult(winningNumbers, bonusNumber);
    const yieldRate = lottoMachine.calculateYield(result);
    outputView.printResult(result, yieldRate);
  }

  async #inputPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmount = await inputView.readLineMessage(INPUT_MESSAGE.PURCHASE_AMOUNT);
        InputValidator.validatePurchaseAmount(purchaseAmount);
        return purchaseAmount;
      } catch (error) {
        outputView.printError(error.message);
      }
    }
  }

  async #inputWinningNumbers() {
    while (true) {
      try {
        const input = await inputView.readLineMessage(INPUT_MESSAGE.WINNING_NUMBERS);
        const winningNumbers = parseLottoNumbers(input);
        InputValidator.validateWinningNumbers(winningNumbers);
        return winningNumbers;
      } catch (error) {
        outputView.printError(error.message);
      }
    }
  }

  async #inputBonusNumber() {
    while (true) {
      try {
        const input = await inputView.readLineMessage(INPUT_MESSAGE.BONUS_NUMBER);
        const bonusNumber = InputValidator.validateBonusNumber(input);
        return bonusNumber;
      } catch (error) {
        outputView.printError(error.message);
      }
    }
  }

  #outputMessages(lottoMachine) {
    const count = lottoMachine.getLottoCount();
    outputView.printLottoCount(count);
    outputView.printLottos(lottoMachine.getLottos());
  }
}

export default App;