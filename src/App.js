import { INPUT_MESSAGE } from "./constant/message.js";
import LottoMachine from "./model/LottoMachine.js";
import inputView from "./view/inputView.js";
import outputView from "./view/outputView.js";
import { InputValidator } from "./view/validator/InputValidator.js";

class App {
  async run() {
    const purchaseAmount = await this.#inputMessages();
    InputValidator.validatePurchaseAmount(purchaseAmount);

    const lottoMachine = new LottoMachine(Number(purchaseAmount));
    this.#outputMessages(lottoMachine);
  }

  async #inputMessages() {
    const purchaseAmount = await inputView.readLineMessage(INPUT_MESSAGE.PURCHASE_AMOUNT);
    return purchaseAmount;
  }

  #outputMessages(lottoMachine) {
    const count = lottoMachine.getLottoCount();
    outputView.printLottoCount(count);
    outputView.printLottos(lottoMachine.getLottos());
  }
}

export default App;